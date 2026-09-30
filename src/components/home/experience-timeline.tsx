import { GraduationCap } from "lucide-react";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";

export function ExperienceTimeline() {
  return (
    <Section
      id="experience"
      size="chapter"
      title="Experience,"
      titleMuted="built by shipping."
      description="Product engineering across fintech, real-time platforms and e-commerce, alongside freelance client work since 2022."
    >
      <ol className="relative ml-2 border-l border-border sm:ml-4">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.company} delay={i * 0.05} className="relative pb-14 pl-8 last:pb-10 sm:pl-12">
            <span
              aria-hidden
              className="absolute -left-[7px] top-1.5 grid size-3.5 place-items-center rounded-full border-2 border-background bg-primary ring-4 ring-primary/15"
            />
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">{job.duration}</p>
              {job.current && (
                <Pill tone="accent" className="gap-1.5">
                  <span className="size-1.5 rounded-full bg-success" />
                  Current
                </Pill>
              )}
            </div>
            <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">{job.role}</h3>
            <p className="mt-1 font-semibold text-muted-foreground">{job.company}</p>
            <ul className="mt-5 max-w-3xl space-y-2.5">
              {job.highlights.map((h) => (
                <li key={h} className="relative pl-5 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-border">
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {job.tech.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal as="li" className="relative pl-8 sm:pl-12">
          <span aria-hidden className="absolute -left-[13px] top-0 grid size-6 place-items-center rounded-full border border-border bg-card text-muted-foreground">
            <GraduationCap className="size-3.5" />
          </span>
          <p className="eyebrow">Education</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {education.map((e) => (
              <div key={e.qualification} className="rounded-xl border border-border bg-card p-5">
                <p className="eyebrow">{e.duration}</p>
                <p className="mt-2 font-bold leading-snug">{e.qualification}</p>
                <p className="mt-1 text-sm text-muted-foreground">{e.institution}</p>
                <p className="mt-3 font-mono text-xs font-semibold">{e.grade}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </ol>
    </Section>
  );
}
