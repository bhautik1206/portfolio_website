import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import type { Project } from "@/data/projects";
import { Pill } from "@/components/ui/pill";

export function CaseStudyCard({ project }: { project: Project }) {
  return (
    <article className="group grid h-full overflow-hidden rounded-2xl border border-border bg-card transition duration-200 hover:border-primary/40 hover:shadow-lg sm:grid-cols-[0.9fr_1.1fr] md:grid-cols-1 xl:grid-cols-[0.9fr_1.1fr]">
      <Link href={`/case-studies/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-muted sm:aspect-auto md:aspect-[16/9] xl:aspect-auto">
        <Image
          src={project.image}
          alt={`${project.name} website screenshot`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="accent">{project.category}</Pill>
          {project.location && <span className="eyebrow">{project.location}</span>}
          {!project.live && <Pill tone="outline">Offline</Pill>}
        </div>
        <h3 className="mt-3 text-xl font-bold tracking-tight">
          <Link href={`/case-studies/${project.slug}`} className="hover:text-primary">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <p className="mt-4 text-sm font-bold">↳ {project.keyFeature}</p>
        {project.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((t) => (
              <Pill key={t} className="text-[11px]">
                {t}
              </Pill>
            ))}
          </div>
        )}
        <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm font-semibold">
          <Link href={`/case-studies/${project.slug}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
            <BookOpen className="size-4" />
            Read case study
          </Link>
          {project.live && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
              {project.url.includes("github.com") ? "View code" : "Live site"}
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
