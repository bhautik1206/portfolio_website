"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex size-8 items-center justify-center rounded-md border border-border bg-secondary/90 text-foreground shadow-2xs transition-colors hover:bg-secondary"
    >
      <Moon className="hidden size-4 text-zinc-200 dark:block" />
      <Sun className="block size-4 text-zinc-800 dark:hidden" />
    </button>
  );
}
