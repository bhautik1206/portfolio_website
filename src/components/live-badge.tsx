"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Geo = { city: string | null; temp: number | null; condition: string | null };

const CACHE_KEY = "visitor-geo-v1";

function describeWeather(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 2) return "Partly cloudy";
  if (code === 3) return "Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  return "Thunderstorm";
}

async function lookupGeo(signal: AbortSignal): Promise<Geo> {
  const geoRes = await fetch("https://ipwho.is/", { signal });
  const geo = (await geoRes.json()) as { success?: boolean; city?: string; latitude?: number; longitude?: number };
  if (!geo.success || geo.latitude == null || geo.longitude == null) return { city: null, temp: null, condition: null };
  try {
    const wRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current=temperature_2m,weather_code`,
      { signal },
    );
    const w = (await wRes.json()) as { current?: { temperature_2m?: number; weather_code?: number } };
    return {
      city: geo.city ?? null,
      temp: w.current?.temperature_2m != null ? Math.round(w.current.temperature_2m) : null,
      condition: w.current?.weather_code != null ? describeWeather(w.current.weather_code) : null,
    };
  } catch {
    return { city: geo.city ?? null, temp: null, condition: null };
  }
}

function readCache(): Geo | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Geo) : null;
  } catch {
    return null;
  }
}

function writeCache(geo: Geo) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(geo));
  } catch {}
}

function subscribeClock(callback: () => void) {
  const id = setInterval(callback, 15_000);
  return () => clearInterval(id);
}

const getMinute = () => Math.floor(Date.now() / 60_000);

export function LiveBadge({ className }: { className?: string }) {
  const minute = React.useSyncExternalStore(subscribeClock, getMinute, () => null);
  const [geo, setGeo] = React.useState<Geo | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    Promise.resolve(readCache())
      .then((cached) => cached ?? lookupGeo(controller.signal).then((g) => (writeCache(g), g)))
      .then(setGeo)
      .catch(() => setGeo({ city: null, temp: null, condition: null }));
    return () => controller.abort();
  }, []);

  const now = minute === null ? null : new Date(minute * 60_000);
  const time = now?.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const zone = now ? Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").pop()?.replace(/_/g, " ") : null;
  const parts = [geo?.city ?? zone, time, geo?.temp != null ? `${geo.temp}°C${geo.condition ? ` ${geo.condition}` : ""}` : null].filter(
    Boolean,
  );

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground backdrop-blur",
        className,
      )}
      aria-live="polite"
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-success" />
      </span>
      <span suppressHydrationWarning>{parts.length ? parts.join(" · ") : "Your local time"}</span>
    </span>
  );
}
