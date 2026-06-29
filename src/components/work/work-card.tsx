"use client";

import Link from "next/link";

import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";
import { WorkThumb } from "./work-thumb";

interface WorkCardProps {
  project: Project;
  className?: string;
}

export function WorkCard({ project, className }: WorkCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group block overflow-hidden rounded-[14px] border border-line bg-bg-elev",
        "transition-[transform,border-color] duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)]",
        "hover:-translate-y-[6px] hover:border-accent/40",
        className,
      )}
    >
      {/* thumbnail */}
      <div
        className="relative w-full border-b border-line"
        style={{ aspectRatio: "16/10" }}
      >
        <WorkThumb kind={project.thumbKind} />
      </div>

      {/* card body */}
      <div className="p-6 md:px-[26px] md:py-6">
        {/* title row */}
        <div className="mb-[10px] flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-[27px] font-[500] leading-tight tracking-[-0.01em] text-ink">
            {project.title}
          </h3>
          <span className="shrink-0 text-right font-mono text-[11px] text-ink-faint">
            {project.role} · {project.year}
          </span>
        </div>

        {/* description */}
        <p className="mb-4 text-[15px] leading-[1.55] text-ink-dim">{project.description}</p>

        {/* tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-[10px] py-[5px] font-mono text-[11px] text-ink-faint"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
