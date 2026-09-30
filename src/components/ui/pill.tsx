import * as React from "react";
import { cn } from "@/lib/utils";

type PillProps = React.ComponentProps<"span"> & { tone?: "default" | "accent" | "outline" };

export function Pill({ className, tone = "default", ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium leading-none",
        tone === "default" && "bg-secondary text-secondary-foreground",
        tone === "accent" && "bg-accent text-accent-foreground",
        tone === "outline" && "border border-border text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
