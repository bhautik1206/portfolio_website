import { getMetrics } from "@/data/metrics";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

export function MetricsStrip() {
  const metrics = getMetrics();
  return (
    <section aria-label="Highlights" className="border-y border-border bg-card/50">
      <Container className="grid grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.05} className="px-2 py-8 sm:px-6 lg:py-10">
            <p className="font-mono text-4xl font-bold tracking-tight sm:text-5xl">{m.value}</p>
            <p className="mt-2 text-sm font-semibold">{m.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{m.detail}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
