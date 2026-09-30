"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { AppWindow, ShieldCheck, Workflow } from "lucide-react";
import { systemLayers } from "@/data/services";
import { useMotionPreference } from "@/components/providers";
import { cn } from "@/lib/utils";

const ICONS = { layout: AppWindow, workflow: Workflow, shield: ShieldCheck } as const;

// Stacked pose (as the section enters) fans out into a readable spread while the visitor scrolls through.
const STACKED = [
  { rotate: -6, y: -70 },
  { rotate: 2, y: 0 },
  { rotate: 6, y: 70 },
];
const SPREAD = [
  { rotate: -3, y: -150 },
  { rotate: 1, y: 0 },
  { rotate: 3, y: 150 },
];

function Plane({
  index,
  progress,
  animate,
}: {
  index: number;
  progress: MotionValue<number>;
  animate: boolean;
}) {
  const layer = systemLayers[index];
  const Icon = ICONS[layer.icon];
  const rotate = useTransform(progress, [0.25, 0.55], [STACKED[index].rotate, SPREAD[index].rotate]);
  const y = useTransform(progress, [0.25, 0.55], [STACKED[index].y, SPREAD[index].y]);
  const middle = index === 1;

  return (
    <motion.div
      style={animate ? { rotate, y } : { rotate: SPREAD[index].rotate, y: SPREAD[index].y }}
      className={cn(
        "absolute inset-x-6 top-1/2 grid -translate-y-1/2 grid-cols-[32px_1fr] gap-x-4 gap-y-2.5 rounded-2xl border border-border px-6 py-5 shadow-[0_20px_40px_rgba(16,30,53,0.07)] sm:inset-x-10 sm:px-8 sm:py-7",
        middle ? "z-20 bg-[#eef4ff] dark:bg-[#141d2c]" : "bg-card",
        index === 0 && "z-30",
        index === 2 && "z-10",
      )}
    >
      <Icon className="row-span-2 size-[26px] text-[#3b82f6] dark:text-[#78a7ff]" strokeWidth={1.6} />
      <span className="text-[21px] leading-tight">{layer.title}</span>
      <small className="text-[11px] tracking-wide text-muted-foreground">{layer.detail}</small>
    </motion.div>
  );
}

export function SystemAssembly() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { motionOn } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <div>
      <div ref={ref} className="relative h-[440px] sm:h-[480px]" aria-hidden>
        {[2, 1, 0].map((i) => (
          <Plane key={i} index={i} progress={progress} animate={motionOn} />
        ))}
      </div>
      <span className="mt-2 block text-center text-[11px] text-muted-foreground">The layers behind a useful AI product</span>
    </div>
  );
}
