"use client";

import { DropdownMenu } from "radix-ui";
import { ChevronDown, Cloud, CloudLightning, CloudRain, MapPin, Moon, Snowflake, Sun, Sunset, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SCENES, sceneLabel, type SceneId } from "./scenes";
import { useWeather } from "./weather-context";

const ICONS: Record<SceneId, { icon: LucideIcon; tone: string }> = {
  sunny: { icon: Sun, tone: "text-amber-400" },
  sunset: { icon: Sunset, tone: "text-orange-400" },
  night: { icon: Moon, tone: "text-sky-300" },
  rain: { icon: CloudRain, tone: "text-sky-400" },
  thunder: { icon: CloudLightning, tone: "text-sky-400" },
  overcast: { icon: Cloud, tone: "text-zinc-400" },
  snow: { icon: Snowflake, tone: "text-sky-300" },
};

export function WeatherPill({ className }: { className?: string }) {
  const { reading, loading, scene, autoScene, simulated, setScene } = useWeather();
  const { icon: Icon, tone } = ICONS[scene];
  const place = reading?.city ? `${reading.city}${reading.countryCode ? `, ${reading.countryCode}` : ""}` : loading ? "Locating…" : "Your sky";

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          title="Live Weather & Atmospheric Simulation"
          className={cn(
            "group inline-flex cursor-pointer items-center gap-2 rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-ring/40 border-border bg-secondary/80 px-3 py-1.5 font-mono text-xs font-medium text-foreground shadow-2xs backdrop-blur-md transition-all hover:bg-secondary active:scale-[0.98]",
            className,
          )}
        >
          <MapPin className="size-3.5 text-muted-foreground" />
          <span suppressHydrationWarning>
            {place}
            {reading?.temp != null && ` · ${reading.temp}°C`}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon className={cn("size-3.5", tone)} />
            {sceneLabel(scene)}
          </span>
          {simulated && <span className="rounded bg-primary/15 px-1.5 py-px text-[9px] uppercase text-primary">Sim</span>}
          <ChevronDown className="size-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-[256px] rounded-lg border border-border bg-popover/95 p-2 shadow-xl backdrop-blur-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        >
          <DropdownMenu.Label className="px-2 pb-2 pt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Atmospheric Engine
          </DropdownMenu.Label>
          {SCENES.map((s) => {
            const { icon: ItemIcon, tone: itemTone } = ICONS[s.id];
            const active = s.id === scene;
            return (
              <DropdownMenu.Item
                key={s.id}
                onSelect={() => setScene(s.id === autoScene ? null : s.id)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 font-mono text-xs outline-none transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-foreground data-[highlighted]:bg-secondary",
                )}
              >
                <ItemIcon className={cn("size-3.5", active ? "text-primary-foreground" : itemTone)} />
                <span className="flex-1">{s.label}</span>
                {active && <span className="text-[9px] font-semibold uppercase tracking-wider">Active</span>}
                {!active && s.id === autoScene && <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Live</span>}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
