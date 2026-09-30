import type { Card } from "@/data/offers";
import { Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { OfferIcon } from "./icon";

export function CardGrid({ cards, variant = "default" }: { cards: Card[]; variant?: "default" | "metric" }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, i) => (
        <Reveal
          key={c.title}
          delay={i * 0.05}
          className={cn("flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/40")}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <OfferIcon name={c.icon} className="size-5" />
            </span>
            {c.meta && <span className="eyebrow">{c.meta}</span>}
          </div>
          <h3 className={cn("mt-5 font-bold tracking-tight", variant === "metric" ? "font-mono text-xl" : "text-lg")}>{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
          {c.tags && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {c.tags.map((t) => (
                <Pill key={t} tone="outline">
                  {t}
                </Pill>
              ))}
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}
