import { Check, Clock } from "lucide-react";
import type { Package } from "@/data/offers";
import { packageIntent } from "@/lib/contact";
import { Reveal } from "@/components/motion/reveal";
import { ContactButton } from "@/components/contact/contact-button";
import { cn } from "@/lib/utils";

export function PackageGrid({ packages, context }: { packages: Package[]; context?: string }) {
  return (
    <div className={cn("grid gap-5 md:grid-cols-2", packages.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
      {packages.map((p, i) => (
        <Reveal
          key={p.name}
          delay={i * 0.05}
          className={cn(
            "relative flex flex-col rounded-2xl border bg-card p-6",
            p.highlighted ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary" : "border-border",
          )}
        >
          {p.badge && (
            <span
              className={cn(
                "eyebrow self-start rounded-full px-2.5 py-1",
                p.highlighted ? "bg-primary text-primary-foreground" : "bg-secondary",
              )}
            >
              {p.badge}
            </span>
          )}
          <h3 className="mt-4 text-xl font-bold tracking-tight">{p.name}</h3>
          <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {p.duration}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {p.deliverables.map((d) => (
              <li key={d} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-7">
            <ContactButton className="w-full" variant={p.highlighted ? "default" : "outline"} intent={packageIntent(p.name, context)}>
              Get a quote
            </ContactButton>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
