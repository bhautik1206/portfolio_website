import { Bot, Database, Globe, Layers, Server, Sparkles } from "lucide-react";
import { services, type Service } from "@/data/services";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";

const icons: Record<Service["icon"], typeof Bot> = {
  bot: Bot,
  database: Database,
  sparkles: Sparkles,
  layers: Layers,
  server: Server,
  globe: Globe,
};

export function ServicesGrid() {
  return (
    <Section
      id="services"
      eyebrow="What I do"
      title="One idea. A whole system."
      description="From AI agents and RAG pipelines to the backend and frontend around them, I take a feature from idea to production."
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <Reveal key={s.title} delay={(i % 3) * 0.05} className="group bg-card p-7 transition hover:bg-accent/40">
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground transition group-hover:scale-105">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <Pill key={t} tone="outline">
                    {t}
                  </Pill>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
