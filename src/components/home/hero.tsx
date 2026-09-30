import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { getMetrics } from "@/data/metrics";
import { Button } from "@/components/ui/button";
import { ContactButton } from "@/components/contact/contact-button";
import { Reveal } from "@/components/motion/reveal";
import { WeatherProvider } from "@/components/weather/weather-context";
import { SkyCanvas } from "@/components/weather/sky-canvas";
import { WeatherPill } from "@/components/weather/weather-pill";
import { MotionToggle } from "@/components/layout/motion-toggle";
import { Typewriter } from "./typewriter";

const coreSystems = ["RAG Pipelines", "AI Agents (MCP)", ".NET & Node APIs", "React · Angular · Next.js"];

export function Hero() {
  const current = experience.find((j) => j.current) ?? experience[0];
  const metrics = getMetrics();
  return (
    <WeatherProvider>
      <header id="about" className="relative overflow-hidden">
        <div className="absolute inset-0 min-h-80 overflow-hidden opacity-90 transition-opacity duration-700 dark:opacity-85">
          <SkyCanvas />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/55 via-background/10 to-transparent dark:from-background/60"
        />

        <div className="relative px-5 pb-14 pt-28 sm:px-8 lg:pb-16 lg:pt-32">
          <Reveal className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/80 px-3 py-1.5 font-mono text-xs font-semibold uppercase text-foreground/90 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-primary" />
              {site.eyebrow}
            </span>
            <WeatherPill />
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-16 max-w-4xl text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:mt-[4.2rem] lg:text-[4.2rem]">
              {site.greeting}
              <span className="block min-h-[1.06em]">
                <Typewriter words={site.rotatingRoles} />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 max-w-2xl space-y-2">
            <p className="text-base font-medium text-foreground/90 sm:text-lg">
              {site.tagline} Currently working at <span className="font-semibold text-foreground">{current.company}</span> as a{" "}
              {current.role}.
            </p>
            <p className="text-base font-normal leading-relaxed text-muted-foreground sm:text-lg">{site.bio}</p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-4">
            <ContactButton variant="invert" size="lg" className="h-12 rounded-md px-6 text-sm font-medium">
              Start a Project
              <ArrowRight />
            </ContactButton>
            <Button variant="glass" size="lg" asChild className="h-12 rounded-md px-6 text-sm font-medium">
              <Link href="/#client-projects">
                See Shipped Work
                <ArrowUpRight className="text-muted-foreground" />
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Core systems:</span>
            {coreSystems.map((c) => (
              <span
                key={c}
                className="rounded-md border border-border bg-secondary/80 px-2.5 py-1 font-mono text-xs text-foreground backdrop-blur-md"
              >
                {c}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.25} className="mt-12 grid grid-cols-2 gap-y-8 border-t border-border/80 pt-8 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <div key={m.label} className={i > 0 ? "lg:border-l lg:border-border/80 lg:pl-8" : ""}>
                <p className="font-mono text-2xl font-black tracking-tight sm:text-3xl">{m.value}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </header>
      <div className="flex items-center justify-between border-t border-frame-border px-5 py-7 sm:px-8 lg:px-[72px]">
        <p className="text-[13px] text-muted-foreground">A closer look at the work</p>
        <MotionToggle variant="plain" />
      </div>
    </WeatherProvider>
  );
}
