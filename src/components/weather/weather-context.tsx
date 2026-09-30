"use client";

import * as React from "react";
import { pickScene, type SceneId, type WeatherReading } from "./scenes";

type WeatherContextValue = {
  reading: WeatherReading | null;
  loading: boolean;
  scene: SceneId;
  autoScene: SceneId;
  simulated: boolean;
  setScene: (id: SceneId | null) => void;
};

const WeatherContext = React.createContext<WeatherContextValue | null>(null);

export function useWeather() {
  const ctx = React.useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used inside <WeatherProvider>");
  return ctx;
}

const CACHE_KEY = "visitor-weather-v2";
const EMPTY: WeatherReading = { city: null, countryCode: null, temp: null, code: null, isDay: null, sunrise: null, sunset: null };

type Geo = { city: string | null; countryCode: string | null; lat: number; lon: number };

async function locate(signal: AbortSignal): Promise<Geo | null> {
  try {
    const g = (await (await fetch("https://ipwho.is/", { signal })).json()) as {
      success?: boolean;
      city?: string;
      country_code?: string;
      latitude?: number;
      longitude?: number;
    };
    if (g.success && g.latitude != null && g.longitude != null)
      return { city: g.city ?? null, countryCode: g.country_code ?? null, lat: g.latitude, lon: g.longitude };
  } catch {
    if (signal.aborted) return null;
  }
  try {
    const g = (await (await fetch("https://ipapi.co/json/", { signal })).json()) as {
      city?: string;
      country_code?: string;
      latitude?: number;
      longitude?: number;
    };
    if (g.latitude != null && g.longitude != null)
      return { city: g.city ?? null, countryCode: g.country_code ?? null, lat: g.latitude, lon: g.longitude };
  } catch {}
  return null;
}

async function lookup(signal: AbortSignal): Promise<WeatherReading> {
  const geo = await locate(signal);
  if (!geo) return EMPTY;
  const base = { ...EMPTY, city: geo.city, countryCode: geo.countryCode };
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${geo.lat}&longitude=${geo.lon}` +
      "&current=temperature_2m,is_day,weather_code&daily=sunrise,sunset&forecast_days=1&timezone=auto";
    const w = (await (await fetch(url, { signal })).json()) as {
      utc_offset_seconds?: number;
      current?: { temperature_2m?: number; is_day?: number; weather_code?: number };
      daily?: { sunrise?: string[]; sunset?: string[] };
    };
    // Open-Meteo returns local times without an offset; attach it so Date parses them correctly.
    const offset = w.utc_offset_seconds ?? 0;
    const sign = offset >= 0 ? "+" : "-";
    const abs = Math.abs(offset);
    const tz = `${sign}${String(Math.floor(abs / 3600)).padStart(2, "0")}:${String(Math.floor((abs % 3600) / 60)).padStart(2, "0")}`;
    const withTz = (t?: string) => (t ? `${t}:00${tz}` : null);
    return {
      ...base,
      temp: w.current?.temperature_2m != null ? Math.round(w.current.temperature_2m) : null,
      code: w.current?.weather_code ?? null,
      isDay: w.current?.is_day != null ? w.current.is_day === 1 : null,
      sunrise: withTz(w.daily?.sunrise?.[0]),
      sunset: withTz(w.daily?.sunset?.[0]),
    };
  } catch {
    return base;
  }
}

function readCache(): WeatherReading | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as WeatherReading) : null;
  } catch {
    return null;
  }
}

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [reading, setReading] = React.useState<WeatherReading | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [override, setOverride] = React.useState<SceneId | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    Promise.resolve(readCache())
      .then(
        (cached) =>
          cached ??
          lookup(controller.signal).then((r) => {
            if (r.city)
              try {
                sessionStorage.setItem(CACHE_KEY, JSON.stringify(r));
              } catch {}
            return r;
          }),
      )
      .then(setReading)
      .catch(() => setReading(EMPTY))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const autoScene = React.useMemo(() => pickScene(reading), [reading]);
  const value = React.useMemo<WeatherContextValue>(
    () => ({
      reading,
      loading,
      autoScene,
      scene: override ?? autoScene,
      simulated: override != null && override !== autoScene,
      setScene: setOverride,
    }),
    [reading, loading, autoScene, override],
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}
