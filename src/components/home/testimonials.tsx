import { Quote } from "lucide-react";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

export function Testimonials() {
  if (!site.showTestimonials || testimonials.length === 0) return null;
  return (
    <Section id="testimonials" eyebrow="Testimonials" title="In good company.">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.05} className="flex flex-col rounded-2xl border border-border bg-card p-7">
            <Quote className="size-6 text-primary" />
            <blockquote className="mt-4 flex-1 text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
            <div className="mt-6 border-t border-border pt-4">
              <p className="font-bold">{t.name}</p>
              <p className="text-sm text-muted-foreground">
                {t.role}, {t.company}
              </p>
              {t.link && (
                <a href={t.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-primary hover:underline">
                  Read full feedback →
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
