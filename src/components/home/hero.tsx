import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ContactButton } from "@/components/contact/contact-button";
import { LiveBadge } from "@/components/live-badge";
import { Reveal } from "@/components/motion/reveal";
import { Typewriter } from "./typewriter";

export function Hero() {
  const current = experience.find((j) => j.current) ?? experience[0];
  return (
    <section id="about" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />
      <Container className="pb-20 pt-16 sm:pb-28 sm:pt-24">
        <Reveal className="flex flex-wrap items-center gap-3">
          <span className="eyebrow rounded-full border border-border bg-card/80 px-3 py-1.5">{site.eyebrow}</span>
          <LiveBadge />
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {site.greeting}
            <span className="block min-h-[1.1em] text-primary">
              <Typewriter words={site.rotatingRoles} />
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 max-w-2xl space-y-3">
          <p className="text-xl font-semibold sm:text-2xl">{site.tagline}</p>
          <p className="text-base text-muted-foreground sm:text-lg">
            Currently working at <span className="font-semibold text-foreground">{current.company}</span> as a {current.role}.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{site.bio}</p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
          <ContactButton size="lg">
            Start a Project
            <ArrowRight />
          </ContactButton>
          <Button size="lg" variant="outline" asChild>
            <Link href="/#client-projects">
              See Shipped Work
              <ArrowUpRight />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
