import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { ContactButton } from "@/components/contact/contact-button";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} Case Study`,
    description: project.summary,
    alternates: { canonical: `/case-studies/${project.slug}` },
    openGraph: { images: [{ url: project.image }] },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const isRepo = project.url.includes("github.com");

  const meta = [
    { label: "Client", value: project.personal ? "Personal project" : project.name },
    { label: "Industry", value: project.category },
    { label: "Location", value: project.location ?? "Remote" },
    { label: "Role", value: project.personal ? "Design & development" : "Web design & development" },
  ];

  return (
    <article>
      <Container className="pt-10 sm:pt-14">
        <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          All case studies
        </Link>
        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="accent">{project.category}</Pill>
            {!project.live && <Pill tone="outline">Site currently offline</Pill>}
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{project.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{project.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.live && (
              <Button asChild size="lg">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {isRepo ? "View code on GitHub" : "Visit live site"}
                  <ArrowUpRight />
                </a>
              </Button>
            )}
            <ContactButton
              size="lg"
              variant="outline"
              intent={{
                subject: `Project like ${project.name}`,
                message: `Hello Bhautik, I saw your ${project.name} case study and I'd like something similar for my business.`,
              }}
            >
              Build something similar
            </ContactButton>
          </div>
        </Reveal>
      </Container>

      <Container className="mt-12">
        <Reveal className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
          <Image src={project.image} alt={`${project.name} website screenshot`} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover object-top" />
        </Reveal>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label} className="bg-card p-5">
              <dt className="eyebrow">{m.label}</dt>
              <dd className="mt-2 text-sm font-semibold">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr] lg:py-20">
        <div className="space-y-12">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight">What the {project.personal ? "project" : "business"} needed</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.overview}</p>
          </Reveal>

          <Reveal>
            <p className="eyebrow">What I built</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight">Key features</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {project.pages.length > 0 && (
            <Reveal>
              <p className="eyebrow">Site structure</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight">Pages & sections</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.pages.map((p) => (
                  <Pill key={p} tone="outline">
                    {p}
                  </Pill>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Reveal className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow">Highlight</p>
            <p className="mt-3 text-xl font-bold leading-snug">{project.keyFeature}</p>
          </Reveal>
          {project.stack.length > 0 && (
            <Reveal className="rounded-2xl border border-border bg-card p-6">
              <p className="eyebrow">Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </Reveal>
          )}
          <Reveal className="rounded-2xl border border-border bg-foreground p-6 text-background">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] opacity-70">Need something like this?</p>
            <p className="mt-3 text-lg font-bold leading-snug">I build websites, stores and AI features that businesses rely on.</p>
            <ContactButton
              className="mt-5 w-full bg-background text-foreground hover:bg-background/90"
              intent={{
                subject: `Project like ${project.name}`,
                message: `Hello Bhautik, I saw your ${project.name} case study and I'd like something similar for my business.`,
              }}
            >
              Start a project
            </ContactButton>
          </Reveal>
        </aside>
      </Container>

      <nav aria-label="More case studies" className="border-t border-border">
        <Container className="grid gap-4 py-10 sm:grid-cols-2">
          <Link href={`/case-studies/${prev.slug}`} className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40">
            <span className="eyebrow inline-flex items-center gap-1.5">
              <ArrowLeft className="size-3" /> Previous
            </span>
            <span className="mt-2 block text-lg font-bold group-hover:text-primary">{prev.name}</span>
          </Link>
          <Link href={`/case-studies/${next.slug}`} className="group rounded-2xl border border-border bg-card p-6 text-right transition hover:border-primary/40">
            <span className="eyebrow inline-flex items-center gap-1.5">
              Next <ArrowRight className="size-3" />
            </span>
            <span className="mt-2 block text-lg font-bold group-hover:text-primary">{next.name}</span>
          </Link>
        </Container>
      </nav>
    </article>
  );
}
