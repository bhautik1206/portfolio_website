"use client";

import { Pause, Play } from "lucide-react";
import { useMotionPreference } from "@/components/providers";
import { cn } from "@/lib/utils";

export function MotionToggle({ className, variant = "pill" }: { className?: string; variant?: "pill" | "plain" }) {
  const { motionOn, toggleMotion } = useMotionPreference();
  return (
    <button
      type="button"
      onClick={toggleMotion}
      aria-pressed={!motionOn}
      className={cn(
        variant === "pill"
          ? "inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground backdrop-blur transition hover:text-foreground"
          : "inline-flex items-center gap-2 text-[13px] text-muted-foreground transition hover:text-foreground",
        className,
      )}
    >
      {motionOn ? <Pause className="size-3" /> : <Play className="size-3" />}
      {motionOn ? "Pause motion" : "Play motion"}
    </button>
  );
}
