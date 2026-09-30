import { stackGroups } from "@/data/stack";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";

export function StackColumns({ id = "stack", bordered = true }: { id?: string; bordered?: boolean }) {
  return (
    <Section
      id={id}
      bordered={bordered}
      eyebrow="Tech stack"
      title="A stack with purpose."
      description="Tools I use in production, chosen for reliability and fit rather than novelty."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stackGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.05} className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 font-bold tracking-tight">{g.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
