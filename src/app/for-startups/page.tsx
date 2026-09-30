import { breadcrumbSchema, JsonLd, pageMetadata, PERSON_ID } from "@/lib/seo";
import { site } from "@/data/site";
import { ArrowRight } from "lucide-react";
import { heroBadges, startups } from "@/data/offers";
import { packageIntent } from "@/lib/contact";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { CardGrid } from "@/components/offer/card-grid";
import { FinalCTA } from "@/components/offer/final-cta";
import { HeroActions } from "@/components/offer/hero-actions";
import { Reveal } from "@/components/motion/reveal";
import { ContactButton } from "@/components/contact/contact-button";

export const metadata = pageMetadata({
  title: "For Startups",
  description: "Bhautik Kapadiya helps startup founders ship MVPs, AI features, backlog sprints and payment integrations to production, with fixed milestones and full code handover.",
  path: "/for-startups",
  keywords: ["MVP development for startups", "startup AI features", "freelance developer for startups"],
});

export default function ForStartupsPage() {
  const intent = { subject: "Startup project enquiry", message: "Hello Bhautik, I'm a founder with a product idea and I'd like to discuss building it." };
  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "Service",
            name: "For Startups: product engineering",
            description: startups.subtitle,
            url: `${site.url}/for-startups`,
            provider: { "@id": PERSON_ID },
            audience: { "@type": "Audience", audienceType: "Startup founders" },
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "For Startups",
              itemListElement: startups.offerings.map((o) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: o.title, description: o.description },
              })),
            },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "For Startups", path: "/for-startups" },
          ]),
        ]}
      />
      <PageHero eyebrow={startups.eyebrow} title={startups.title} subtitle={startups.subtitle}>
        <HeroActions primary="Talk about your idea" intent={intent} badges={heroBadges} />
      </PageHero>

      <Section eyebrow="How I can help" title="From first commit to first customers.">
        <CardGrid cards={startups.offerings} />
      </Section>

      <Section eyebrow="Founder assurances" title="Built to take work off your plate.">
        <CardGrid cards={startups.assurances} />
      </Section>

      <Section eyebrow="Start small" title={startups.audit.title}>
        <Reveal className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{startups.audit.description}</p>
          <ContactButton size="lg" intent={packageIntent("Audit & Roadmap", "startup")}>
            Request an audit
            <ArrowRight />
          </ContactButton>
        </Reveal>
      </Section>

      <FinalCTA title="Let's turn the idea into a product." />
    </>
  );
}
