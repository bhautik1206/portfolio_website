"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useMotionPreference } from "@/components/providers";
import { cn } from "@/lib/utils";
import type { SceneId } from "./scenes";
import { useWeather } from "./weather-context";

type Palette = {
  top: string;
  bottom: string;
  cloud: [number, number, number, number];
  body?: { kind: "sun" | "moon"; core: string; glow: string; x: number; y: number; r: number };
  precip?: string;
  cloudCount: number;
};

const PALETTES: Record<"dark" | "light", Record<SceneId, Palette>> = {
  dark: {
    sunny: { top: "#161d2b", bottom: "#2b3d5a", cloud: [190, 200, 218, 0.4], cloudCount: 6, body: { kind: "sun", core: "#fbf3c8", glow: "rgba(250,236,160,0.38)", x: 0.78, y: 0.1, r: 42 } },
    sunset: { top: "#1c0f0c", bottom: "#6e3018", cloud: [36, 18, 14, 0.62], cloudCount: 6, body: { kind: "sun", core: "#f6a247", glow: "rgba(246,136,58,0.42)", x: 0.78, y: 0.1, r: 42 } },
    night: { top: "#090d18", bottom: "#161d2f", cloud: [150, 160, 182, 0.13], cloudCount: 4, body: { kind: "moon", core: "#c9cdd5", glow: "rgba(201,205,213,0.2)", x: 0.75, y: 0.11, r: 40 } },
    rain: { top: "#0b1019", bottom: "#172030", cloud: [118, 128, 148, 0.22], cloudCount: 7, precip: "rgba(170,190,220,0.32)" },
    thunder: { top: "#070a11", bottom: "#121725", cloud: [104, 114, 136, 0.26], cloudCount: 8, precip: "rgba(160,180,210,0.28)" },
    overcast: { top: "#151a23", bottom: "#262d38", cloud: [168, 176, 190, 0.26], cloudCount: 10 },
    snow: { top: "#111824", bottom: "#222d3f", cloud: [190, 200, 216, 0.2], cloudCount: 6, precip: "rgba(236,242,250,0.85)" },
  },
  light: {
    sunny: { top: "#86bcec", bottom: "#d7ebfb", cloud: [255, 255, 255, 0.92], cloudCount: 6, body: { kind: "sun", core: "#ffffff", glow: "rgba(255,255,255,0.75)", x: 0.78, y: 0.1, r: 44 } },
    sunset: { top: "#ee9d63", bottom: "#fcd8aa", cloud: [255, 232, 214, 0.72], cloudCount: 6, body: { kind: "sun", core: "#fff1c6", glow: "rgba(255,186,112,0.65)", x: 0.78, y: 0.1, r: 44 } },
    night: { top: "#1b2744", bottom: "#394a70", cloud: [222, 228, 242, 0.18], cloudCount: 4, body: { kind: "moon", core: "#eef0f4", glow: "rgba(238,240,244,0.3)", x: 0.75, y: 0.11, r: 40 } },
    rain: { top: "#8492a6", bottom: "#c4cdd9", cloud: [242, 245, 249, 0.62], cloudCount: 7, precip: "rgba(70,90,120,0.32)" },
    thunder: { top: "#5a6475", bottom: "#98a2b1", cloud: [222, 227, 234, 0.52], cloudCount: 8, precip: "rgba(60,75,100,0.3)" },
    overcast: { top: "#a9b5c5", bottom: "#dfe5ec", cloud: [255, 255, 255, 0.78], cloudCount: 10 },
    snow: { top: "#c1cedd", bottom: "#eef3f8", cloud: [255, 255, 255, 0.82], cloudCount: 6, precip: "rgba(110,130,165,0.75)" },
  },
};

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const SPRITE_W = 900;
const SPRITE_H = 420;

// Cumulus-like sprite: many soft puffs kept well inside the canvas so no edge is ever clipped.
function makeCloudSprite([r, g, b]: Palette["cloud"], seed: number) {
  const c = document.createElement("canvas");
  c.width = SPRITE_W;
  c.height = SPRITE_H;
  const ctx = c.getContext("2d")!;
  const rand = seeded(seed);
  ctx.filter = "blur(10px)";
  const puffs = 34;
  for (let i = 0; i < puffs; i++) {
    const t = i / puffs;
    const px = 230 + t * 440 + (rand() - 0.5) * 60;
    const lift = Math.sin(t * Math.PI) * 70;
    const py = 250 - lift * rand() + (rand() - 0.5) * 30;
    const pr = 40 + rand() * 55 + Math.sin(t * Math.PI) * 35;
    const grad = ctx.createRadialGradient(px, py, 0, px, py, pr);
    grad.addColorStop(0, `rgba(${r},${g},${b},0.5)`);
    grad.addColorStop(0.6, `rgba(${r},${g},${b},0.2)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fill();
  }
  return c;
}

type Cloud = { x: number; y: number; scale: number; speed: number; sprite: number };
type Particle = { x: number; y: number; v: number; size: number; phase: number };

export function SkyCanvas({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { scene } = useWeather();
  const { resolvedTheme } = useTheme();
  const { motionOn } = useMotionPreference();
  const [visible, setVisible] = React.useState(true);
  const mode = resolvedTheme === "light" ? "light" : "dark";

  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const palette = PALETTES[mode][scene];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = motionOn && !reduced && visible;
    const rand = seeded(7);

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const sprites = [0, 1, 2].map((i) => makeCloudSprite(palette.cloud, 11 + i * 17));
    let clouds: Cloud[] = [];
    let particles: Particle[] = [];
    let stars: Particle[] = [];
    let flash = 0;
    let nextFlash = 2 + Math.random() * 4;
    let bolt: [number, number][] | null = null;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      clouds = Array.from({ length: palette.cloudCount }, (_, i) => ({
        x: (i / palette.cloudCount) * (width + 400) - 200 + rand() * 120,
        y: height * (0.25 + rand() * 0.65),
        scale: 0.6 + rand() * 0.9,
        speed: 4 + rand() * 7,
        sprite: i % sprites.length,
      }));
      const area = (width * height) / 10000;
      if (scene === "night") {
        stars = Array.from({ length: Math.round(area * 1.4) }, () => ({ x: rand() * width, y: rand() * height * 0.85, v: 0, size: 0.4 + rand() * 1.1, phase: rand() * Math.PI * 2 }));
      } else {
        stars = [];
      }
      if (scene === "rain" || scene === "thunder") {
        particles = Array.from({ length: Math.round(area * (scene === "thunder" ? 2.4 : 1.8)) }, () => ({ x: rand() * width, y: rand() * height, v: 520 + rand() * 380, size: 10 + rand() * 14, phase: 0 }));
      } else if (scene === "snow") {
        particles = Array.from({ length: Math.round(area * 1.1) }, () => ({ x: rand() * width, y: rand() * height, v: 18 + rand() * 30, size: 1 + rand() * 2.4, phase: rand() * Math.PI * 2 }));
      } else {
        particles = [];
      }
    };

    const drawBody = (t: number) => {
      const b = palette.body;
      if (!b) return;
      const x = width * b.x;
      const y = height * b.y + Math.sin(t * 0.2) * 2;
      const glow = ctx.createRadialGradient(x, y, b.r * 0.6, x, y, b.r * 4);
      glow.addColorStop(0, b.glow);
      glow.addColorStop(1, b.glow.replace(/[\d.]+\)$/, "0)"));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, b.r * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = b.glow;
      ctx.shadowBlur = b.kind === "sun" ? 40 : 24;
      ctx.fillStyle = b.core;
      ctx.beginPath();
      ctx.arc(x, y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const draw = (t: number, dt: number) => {
      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, palette.top);
      sky.addColorStop(1, palette.bottom);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      for (const s of stars) {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.8 + s.phase));
        ctx.fillStyle = `rgba(255,255,255,${a * 0.8})`;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }

      drawBody(t);

      const [, , , alpha] = palette.cloud;
      for (const c of clouds) {
        c.x += c.speed * dt;
        const w = SPRITE_W * c.scale;
        if (c.x > width + 60) c.x = -w - 60;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprites[c.sprite], c.x, c.y - (SPRITE_H / 2) * c.scale, w, SPRITE_H * c.scale);
      }
      ctx.globalAlpha = 1;

      if (particles.length && palette.precip) {
        if (scene === "snow") {
          ctx.fillStyle = palette.precip;
          for (const p of particles) {
            p.y += p.v * dt;
            p.x += Math.sin(t + p.phase) * 12 * dt;
            if (p.y > height) {
              p.y = -4;
              p.x = Math.random() * width;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          ctx.strokeStyle = palette.precip;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (const p of particles) {
            p.y += p.v * dt;
            p.x += p.v * 0.12 * dt;
            if (p.y > height) {
              p.y = -p.size;
              p.x = Math.random() * width;
            }
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.size * 0.12, p.y + p.size);
          }
          ctx.stroke();
        }
      }

      if (scene === "thunder") {
        nextFlash -= dt;
        if (nextFlash <= 0) {
          flash = 1;
          nextFlash = 3 + Math.random() * 5;
          let x = width * (0.45 + Math.random() * 0.45);
          let y = 0;
          bolt = [[x, y]];
          while (y < height * 0.55) {
            x += (Math.random() - 0.5) * 60;
            y += 20 + Math.random() * 40;
            bolt.push([x, y]);
          }
        }
        if (flash > 0) {
          ctx.fillStyle = `rgba(200,215,255,${flash * 0.22})`;
          ctx.fillRect(0, 0, width, height);
          if (bolt && flash > 0.55) {
            ctx.strokeStyle = `rgba(235,242,255,${flash})`;
            ctx.lineWidth = 2;
            ctx.shadowColor = "rgba(180,200,255,0.9)";
            ctx.shadowBlur = 18;
            ctx.beginPath();
            bolt.forEach(([bx, by], i) => (i ? ctx.lineTo(bx, by) : ctx.moveTo(bx, by)));
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
          flash = Math.max(0, flash - dt * 2.2);
        }
      }
    };

    setup();
    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(now / 1000, dt);
      frame = requestAnimationFrame(loop);
    };

    if (animate) {
      frame = requestAnimationFrame(loop);
    } else {
      draw(0, 0);
    }

    const ro = new ResizeObserver(() => {
      setup();
      if (!animate) draw(0, 0);
    });
    ro.observe(canvas);
    const onVisibility = () => {
      if (!animate) return;
      if (document.hidden) cancelAnimationFrame(frame);
      else {
        last = performance.now();
        frame = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [scene, mode, motionOn, visible]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full animate-in fade-in duration-700", className)}
    />
  );
}
