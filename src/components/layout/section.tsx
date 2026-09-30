import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "@/components/motion/reveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  titleMuted?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  bordered?: boolean;
  size?: "chapter" | "page";
};

export function Section({
  id,
  eyebrow,
  title,
  titleMuted,
  description,
  children,
  className,
  align = "left",
  bordered = true,
  size = "page",
}: SectionProps) {
  const chapter = size === "chapter";
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24",
        chapter ? "py-24 sm:py-28 lg:py-[8.1rem]" : "py-16 sm:py-20",
        bordered && (chapter ? "border-t border-frame-border" : ""),
        className,
      )}
    >
      <Container>
        {(eyebrow || title || description) && (
          <Reveal className={cn(chapter ? "mb-12 max-w-[850px] lg:mb-[52px]" : "mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
            {eyebrow && (
              <p className={chapter ? "eyebrow mb-5" : "mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"}>{eyebrow}</p>
            )}
            {title && (
              <h2 className={chapter ? "chapter-title" : "text-2xl font-semibold tracking-tight sm:text-[2rem] sm:leading-tight"}>
                {title}
                {titleMuted && (
                  <>
                    <br />
                    <span className="muted">{titleMuted}</span>
                  </>
                )}
              </h2>
            )}
            {description && (
              <p className={chapter ? "mt-6 max-w-[560px] text-base leading-relaxed text-muted-foreground sm:text-lg" : "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"}>
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
