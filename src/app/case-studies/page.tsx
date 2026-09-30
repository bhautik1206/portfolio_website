import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { CaseStudyBrowser } from "@/components/projects/case-study-browser";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Client websites, stores and personal builds by Bhautik Kapadiya, covering what was built, key features and the stack behind each one.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  const clients = projects.filter((p) => !p.personal).length;
  return (
    <>
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
