import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "@/components/motion/reveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  bordered?: boolean;
};

export function Section({ id, eyebrow, title, description, children, className, align = "left", bordered = true }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-24", bordered && "border-t border-border", className)}>
      <Container>
        {(eyebrow || title || description) && (
          <Reveal className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center")}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>}
            {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
