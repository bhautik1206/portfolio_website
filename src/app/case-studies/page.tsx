import { breadcrumbSchema, JsonLd, pageMetadata, PERSON_ID } from "@/lib/seo";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { CaseStudyBrowser } from "@/components/projects/case-study-browser";

export const metadata = pageMetadata({
  title: "Case Studies",
  description:
    "26 case studies by Bhautik Kapadiya: client websites, e-commerce stores and web apps for healthcare, jewellery, interiors, D2C and Web3 brands, with the features and stack behind each.",
  path: "/case-studies",
  keywords: ["web development case studies", "portfolio projects", "client websites India"],
});

export default function CaseStudiesPage() {
  const clients = projects.filter((p) => !p.personal).length;
  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "CollectionPage",
            name: "Case Studies",
            url: `${site.url}/case-studies`,
            author: { "@id": PERSON_ID },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: projects.length,
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${site.url}/case-studies/${p.slug}`,
                name: p.name,
              })),
            },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Case studies"
        title="Real projects, real businesses, shipped to production."
        subtitle={`${clients} client builds and ${projects.length - clients} personal projects: what each business needed, what I built and the stack behind it.`}
      />
      <section className="border-t border-border py-16 sm:py-20">
        <Container>
          <CaseStudyBrowser projects={projects} />
        </Container>
      </section>
    </>
  );
}
