import { breadcrumbSchema, faqSchema, JsonLd, pageMetadata, professionalServiceSchema } from "@/lib/seo";
import { heroBadges, hireMe } from "@/data/offers";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { CardGrid } from "@/components/offer/card-grid";
import { Estimator } from "@/components/offer/estimator";
import { PackageGrid } from "@/components/offer/package-grid";
import { ProcessSteps } from "@/components/offer/process-steps";
import { FAQ } from "@/components/offer/faq";
import { FinalCTA } from "@/components/offer/final-cta";
import { HeroActions } from "@/components/offer/hero-actions";
import { StackColumns } from "@/components/home/stack-columns";
import { Testimonials } from "@/components/home/testimonials";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Hire Me",
  description:
    "Hire Bhautik Kapadiya for AI agents, RAG pipelines, full-stack web apps and backend APIs. Fixed-scope packages, 100% code ownership and a proposal within 24 hours.",
  path: "/hire-me",
  keywords: ["hire freelance developer", "hire RAG developer", "AI agent development services", "fixed price web development"],
});

export default function HireMePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  return (
    <>
      <JsonLd
        data={[
          faqSchema(hireMe.faq),
          professionalServiceSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Hire Me", path: "/hire-me" },
          ]),
        ]}
      />
      <PageHero eyebrow={hireMe.eyebrow} title={hireMe.title} subtitle={hireMe.subtitle}>
        <HeroActions primary="Book a scoping chat" badges={heroBadges} />
      </PageHero>

      <Section eyebrow="Who this is for" title="Built for teams that need to ship.">
        <CardGrid cards={hireMe.fit} />
      </Section>

      <Section eyebrow="Why work with me" title="One engineer, end-to-end ownership.">
        <CardGrid cards={hireMe.whyMe} />
      </Section>

      <Section eyebrow="Proof" title="Results from real production work." description="Outcomes from my engineering roles and freelance projects.">
        <CardGrid cards={hireMe.proof} variant="metric" />
      </Section>

      <Section
        id="estimator"
        eyebrow="Project estimator"
        title="Find the right engagement in two clicks."
        description="Pick what you're building and when you need it, and you'll get a recommended package plus a prefilled message for email or WhatsApp."
      >
        <Estimator />
      </Section>

      <Section id="packages" eyebrow="Engagements" title="Fixed-scope packages." description="Every project gets a written, fixed quote after a short scoping chat.">
        <PackageGrid packages={hireMe.packages} />
      </Section>

      <Section eyebrow="Assurances" title="What you can count on.">
        <CardGrid cards={hireMe.assurances} />
      </Section>

      <Section eyebrow="Process" title="Scope → Plan → Build → Ship.">
        <ProcessSteps steps={hireMe.process} />
      </Section>

      <StackColumns id="hire-stack" size="page" />

      <Section eyebrow="Case studies" title="Recent work.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Testimonials />

      <Section id="faq" eyebrow="FAQ" title="Common questions.">
        <FAQ items={hireMe.faq} />
      </Section>

      <FinalCTA />
    </>
  );
}
