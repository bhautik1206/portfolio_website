import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clientProjects, personalProjects } from "@/data/projects";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function ClientProjects() {
  const ordered = [...clientProjects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  return (
    <Section
      id="client-projects"
      eyebrow="Selected work"
      title="Built to work, shipped for real clients."
      description={`${clientProjects.length} client websites and stores for clinics, jewellers, interior studios, D2C brands and a Web3 platform, delivered since 2022.`}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.05}>
            <ProjectCard project={p} priority={i < 3} />
          </Reveal>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Personal builds</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight">Side projects & experiments</h3>
        </div>
        <Button variant="outline" asChild>
          <Link href="/case-studies">
            All case studies
            <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {personalProjects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
