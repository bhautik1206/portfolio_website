import * as React from "react";
import { Container } from "./container";
import { Reveal } from "@/components/motion/reveal";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />
      <Container className="pb-16 pt-16 sm:pb-20 sm:pt-24">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {subtitle && <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>}
        </Reveal>
        {children && (
          <Reveal delay={0.08} className="mt-10">
            {children}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
