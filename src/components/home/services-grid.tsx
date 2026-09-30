import Link from "next/link";
import { ArrowUpRight, Bot, Database, Globe, Layers, Server, Sparkles } from "lucide-react";
import { services, type Service } from "@/data/services";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SystemAssembly } from "./system-assembly";

const icons: Record<Service["icon"], typeof Database> = {
  bot: Bot,
  database: Database,
  sparkles: Sparkles,
  layers: Layers,
  server: Server,
  globe: Globe,
};

function ChapterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex h-11 items-center gap-2.5 text-sm font-semibold text-foreground">
      {children}
      <ArrowUpRight className="size-[17px] text-[#3b82f6] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#78a7ff]" />
    </Link>
  );
}

export function ServicesGrid() {
  return (
    <section id="services" className="relative scroll-mt-24 border-t border-frame-border py-24 sm:py-28 lg:py-[8.1rem]">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-[100px]">
          {/* Left: pinned while the services scroll past */}
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <Reveal>
              <h2 className="chapter-title" style={{ fontSize: "clamp(2.75rem, 4.5vw, 4rem)" }}>
                One idea.
                <br />
                <span className="muted">A whole system.</span>
              </h2>
              <p className="mt-6 max-w-[400px] text-[15px] leading-relaxed text-heading-muted">
                I connect the intelligence, backend and interface that make a product actually work, from the first prompt to the
                last pixel.
              </p>
            </Reveal>
            <div className="mt-10">
              <SystemAssembly />
            </div>
          </div>

          {/* Right: the six services scroll past the pinned heading */}
          <div>
            {services.map((s, i) => {
              const Icon = icons[s.icon];
              return (
                <Reveal
                  as="article"
                  key={s.title}
                  className={i === 0 ? "border-b border-border pb-[52px] pt-2.5" : "border-b border-border pb-[52px] pt-[42px]"}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="size-[25px] text-[#3b82f6] dark:text-[#78a7ff]" strokeWidth={1.6} />
                    <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-[1.625rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[1.75rem]">{s.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-heading-muted">{s.description}</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{s.tags.join(" · ")}</p>
                </Reveal>
              );
            })}
            <div className="flex flex-wrap gap-x-8 pt-8">
              <ChapterLink href="/hire-me">Hire me for a project</ChapterLink>
              <ChapterLink href="/how-i-build">How I build</ChapterLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
