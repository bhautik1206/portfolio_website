import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import type { Project } from "@/data/projects";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
        className,
      )}
    >
      <Link href={`/case-studies/${project.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={`${project.name} website screenshot`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="accent">{project.category}</Pill>
          {project.location && <span className="eyebrow">{project.location}</span>}
        </div>
        <h3 className="mt-3 text-lg font-bold tracking-tight">{project.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <p className="mt-3 font-mono text-xs font-semibold text-foreground">↳ {project.keyFeature}</p>
        <div className="mt-auto flex flex-wrap gap-4 pt-5 text-sm font-semibold">
          <Link href={`/case-studies/${project.slug}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
            <BookOpen className="size-4" />
            Read case study
          </Link>
          {project.live && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground"
            >
              {project.url.includes("github.com") ? "View code" : "Visit project"}
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
