import { Reveal } from "@/components/motion/reveal";

type Step = { title: string; description: string; duration?: string };

export function ProcessSteps({ steps, columns = 4 }: { steps: Step[]; columns?: 3 | 4 }) {
  return (
    <ol className={columns === 4 ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-4" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.05} className="relative rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-3xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
            {s.duration && <span className="eyebrow">{s.duration}</span>}
          </div>
          <h3 className="mt-4 text-lg font-bold tracking-tight">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
