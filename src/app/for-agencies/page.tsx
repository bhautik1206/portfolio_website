import { breadcrumbSchema, JsonLd, pageMetadata, PERSON_ID } from "@/lib/seo";
import { site } from "@/data/site";
import { ArrowRight } from "lucide-react";
import { agencies } from "@/data/offers";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { CardGrid } from "@/components/offer/card-grid";
import { PackageGrid } from "@/components/offer/package-grid";
import { FinalCTA } from "@/components/offer/final-cta";
import { HeroActions } from "@/components/offer/hero-actions";
import { Reveal } from "@/components/motion/reveal";
import { ContactButton } from "@/components/contact/contact-button";

export const metadata = pageMetadata({
  title: "For Agencies",
  description: "White-label development for agencies by Bhautik Kapadiya: Figma-to-production builds, AI features, SaaS backends and overflow support under NDA.",
  path: "/for-agencies",
  keywords: ["white label web development", "agency development partner", "overflow developer for agencies"],
});

export default function ForAgenciesPage() {
  const intent = {
    subject: "Agency white-label enquiry",
    message: "Hello Bhautik, we're an agency looking for development support on client projects.",
  };
  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "Service",
            name: "For Agencies: white-label development",
            description: agencies.subtitle,
            url: `${site.url}/for-agencies`,
            provider: { "@id": PERSON_ID },
            audience: { "@type": "Audience", audienceType: "Digital agencies" },
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "For Agencies",
              itemListElement: agencies.services.map((o) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: o.title, description: o.description },
              })),
            },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "For Agencies", path: "/for-agencies" },
          ]),
        ]}
      />
      <PageHero eyebrow={agencies.eyebrow} title={agencies.title} subtitle={agencies.subtitle}>
        <HeroActions primary="Discuss a project" intent={intent} badges={["Mutual NDA", "White-label delivery", "Reply within 24 hours"]} />
      </PageHero>

      <Section eyebrow="What I deliver" title="Extra engineering capacity, on demand.">
        <CardGrid cards={agencies.services} />
      </Section>

      <Section eyebrow="Agency guarantees" title="Your clients stay yours.">
        <CardGrid cards={agencies.guarantees} />
      </Section>

      <Section eyebrow="Engagements" title="Flexible packages for agencies." description="Every engagement gets a fixed quote once I've seen the spec.">
        <PackageGrid packages={agencies.packages} context="agency" />
      </Section>

      <Section eyebrow="Next step" title={agencies.spec.title}>
        <Reveal className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{agencies.spec.description}</p>
          <ContactButton size="lg" intent={{ subject: "Agency project spec", message: "Hello Bhautik, here's the spec for a client project we'd like help with:" }}>
            Send the spec
            <ArrowRight />
          </ContactButton>
        </Reveal>
      </Section>

      <FinalCTA title="Have a client backlog piling up?" />
    </>
  );
}
