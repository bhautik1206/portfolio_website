import * as React from "react";
import { Container } from "./container";
import { Reveal } from "@/components/motion/reveal";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, accent, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative">
      <Container className="pb-16 pt-32 sm:pb-20 sm:pt-36">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-title mt-5 max-w-5xl">
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-primary">{accent}</span>
              </>
            )}
          </h1>
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
