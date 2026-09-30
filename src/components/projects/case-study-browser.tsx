"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, type Category, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { CaseStudyCard } from "./case-study-card";

type Filter = "All" | Category;

export function CaseStudyBrowser({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = React.useState<Filter>("All");
  const available = categories.filter((c) => projects.some((p) => p.category === c));
  const filters: Filter[] = ["All", ...available];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div role="tablist" aria-label="Filter case studies" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
          const active = f === filter;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={cn(
                "relative shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                active ? "border-transparent text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {active && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 -z-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative z-10">
                {f} <span className="font-mono text-xs opacity-70">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <CaseStudyCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
