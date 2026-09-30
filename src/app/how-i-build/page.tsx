import type { Metadata } from "next";
import { howIBuild } from "@/data/offers";
import { site } from "@/data/site";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { ProcessSteps } from "@/components/offer/process-steps";
import { FinalCTA } from "@/components/offer/final-cta";
import { HeroActions } from "@/components/offer/hero-actions";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "How I Build",
  description: `How ${site.name} takes AI and web products from idea to production: methodology, sprint cadence and working principles.`,
  alternates: { canonical: "/how-i-build" },
};

export default function HowIBuildPage() {
  return (
    <>
      <PageHero eyebrow="Process" title={howIBuild.title} subtitle={howIBuild.subtitle}>
        <HeroActions primary="Let's talk" />
      </PageHero>

      <Section eyebrow="Methodology & sprint cadence" title="Six steps from idea to production.">
        <ProcessSteps steps={howIBuild.steps} columns={3} />
      </Section>

      <Section eyebrow="Working principles" title="How I think about engineering.">
        <div className="grid gap-5 sm:grid-cols-2">
          {howIBuild.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="flex gap-5 rounded-2xl border border-border bg-card p-7">
              <span className="font-mono text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA
        eyebrow="Ready to build"
        title="Have a feature, product or idea ready to go?"
        description={`Send me the details and you'll get a scoped proposal ${site.responseTime}.`}
      />
    </>
  );
}
