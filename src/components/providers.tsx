"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";

type MotionContextValue = { motionOn: boolean; toggleMotion: () => void };

const MotionContext = React.createContext<MotionContextValue>({ motionOn: true, toggleMotion: () => {} });

export function useMotionPreference() {
  return React.useContext(MotionContext);
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem("motion") !== "off";
  } catch {
    return true;
  }
}

function setStoredMotion(on: boolean) {
  try {
    localStorage.setItem("motion", on ? "on" : "off");
  } catch {}
  listeners.forEach((l) => l());
}

export function Providers({ children }: { children: React.ReactNode }) {
  const motionOn = React.useSyncExternalStore(subscribe, getSnapshot, () => true);

  React.useEffect(() => {
    document.documentElement.dataset.motion = motionOn ? "on" : "off";
  }, [motionOn]);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionOn || reduced) return;
    const lenis = new Lenis({ duration: 1.1, autoRaf: true, anchors: { offset: -80 } });
    return () => lenis.destroy();
  }, [motionOn]);

  const value = React.useMemo(() => ({ motionOn, toggleMotion: () => setStoredMotion(!motionOn) }), [motionOn]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionContext.Provider value={value}>
        <MotionConfig reducedMotion={motionOn ? "user" : "always"}>{children}</MotionConfig>
      </MotionContext.Provider>
    </ThemeProvider>
  );
}
