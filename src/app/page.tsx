import { Hero } from "@/components/home/hero";
import { ClientProjects } from "@/components/home/client-projects";
import { ServicesGrid } from "@/components/home/services-grid";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { StackColumns } from "@/components/home/stack-columns";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";
import { JsonLd, PERSON_ID, WEBSITE_ID, professionalServiceSchema } from "@/lib/seo";
import { site } from "@/data/site";

// Re-render daily so the auto-computed years of experience and © year stay current.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "ProfilePage",
            "@id": `${site.url}/#profile`,
            url: site.url,
            name: site.title,
            description: site.description,
            isPartOf: { "@id": WEBSITE_ID },
            mainEntity: { "@id": PERSON_ID },
            about: { "@id": PERSON_ID },
          },
          professionalServiceSchema,
        ]}
      />
      <Hero />
      <ClientProjects />
      <ServicesGrid />
      <ExperienceTimeline />
      <StackColumns />
      <Testimonials />
      <CTASection />
    </>
  );
}
