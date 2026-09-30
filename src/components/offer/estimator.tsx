"use client";

import * as React from "react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { estimator, recommendPackage, type EstimatorTimeline, type EstimatorType } from "@/data/offers";
import { useContact } from "@/components/contact/contact-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Option({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
        active ? "border-primary bg-accent text-accent-foreground ring-1 ring-primary" : "border-border bg-background hover:border-primary/40",
      )}
    >
      {children}
    </button>
  );
}

export function Estimator() {
  const { openContact } = useContact();
  const [type, setType] = React.useState<EstimatorType | null>(null);
  const [timeline, setTimeline] = React.useState<EstimatorTimeline | null>(null);

  const typeLabel = estimator.projectTypes.find((t) => t.id === type)?.label;
  const timelineLabel = estimator.timelines.find((t) => t.id === timeline)?.label;
  const result = type && timeline ? recommendPackage(type, timeline) : null;

  return (
    <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-8">
        <fieldset>
          <legend className="eyebrow">Step 1 · What are you building?</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {estimator.projectTypes.map((t) => (
              <Option key={t.id} active={type === t.id} onClick={() => setType(t.id)}>
                {t.label}
              </Option>
            ))}
          </div>
        </fieldset>
        <fieldset disabled={!type} className={cn("transition", !type && "opacity-50")}>
          <legend className="eyebrow">Step 2 · When do you need it?</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {estimator.timelines.map((t) => (
              <Option key={t.id} active={timeline === t.id} onClick={() => setTimeline(t.id)}>
                {t.label}
              </Option>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={cn("flex flex-col rounded-xl border p-6 transition", result ? "border-primary/40 bg-accent/40" : "border-dashed border-border")}>
        {result ? (
          <>
            <p className="eyebrow inline-flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" /> Recommended
            </p>
            <p className="mt-3 text-2xl font-extrabold tracking-tight">{result.pkg}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{result.note}</p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              {typeLabel} · {timelineLabel}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              <Button
                onClick={() =>
                  openContact({
                    subject: `Enquiry: ${result.pkg} (${typeLabel})`,
                    message: `Hello Bhautik, I'm interested in the ${result.pkg} for a ${typeLabel} project, timeline: ${timelineLabel}. Could you share a quote?`,
                  })
                }
              >
                Get a quote
                <ArrowRight />
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setType(null);
                  setTimeline(null);
                }}
              >
                <RotateCcw />
                Reset
              </Button>
            </div>
          </>
        ) : (
          <div className="m-auto text-center">
            <p className="eyebrow">Project estimator</p>
            <p className="mt-3 text-sm text-muted-foreground">Pick a project type and timeline to see the engagement that fits.</p>
          </div>
        )}
      </div>
    </div>
  );
}
