"use client";

import { useMemo, useState } from "react";

import { Reveal } from "@/components/site/reveal";
import { WorkCard } from "@/components/work/work-card";
import { cn } from "@/lib/cn";
import {
  PROJECT_FILTERS,
  type Project,
  type ProjectFilter,
} from "@/lib/projects";

interface WorkFiltersProps {
  projects: Project[];
  description: React.ReactNode;
}

/**
 * Owns filter pill state and the filtered grid. The description prop is
 * server-rendered and passed in so it sits next to the pills on the same row.
 */
export function WorkFilters({ projects, description }: WorkFiltersProps) {
  const [active, setActive] = useState<ProjectFilter>("all");

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  );

  return (
    <>
      <div className="mt-10 flex flex-wrap items-end justify-between gap-5">
        {description}
        <div className="flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActive(filter.id)}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-all duration-200",
                active === filter.id
                  ? "border-ink bg-ink text-bg"
                  : "border-line text-ink-dim hover:border-line-strong hover:text-ink",
              )}
              aria-pressed={active === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 pt-20 pb-10 md:grid-cols-2">
        {visible.map((project, idx) => (
          <Reveal key={project.slug} className={project.featured ? "md:col-span-2" : ""}>
            <WorkCard project={project} index={idx} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
