import Link from "next/link";

import { CASE_STUDIES } from "@/components/case-study/registry";
import type { Project } from "@/lib/projects";
import { WorkThumb } from "./work-thumb";

interface WorkRowProps {
  project: Project;
  index: number;
  isLast?: boolean;
}

export function WorkRow({ project, index, isLast }: WorkRowProps) {
  const flipLayout = index % 2 !== 0;
  const hasCaseStudy = project.slug in CASE_STUDIES;

  const thumbnail = (
    <div
      className="overflow-hidden rounded-[14px] border border-white/[.08] transition-[border-color] duration-[350ms] group-hover:border-accent/40"
      style={{ aspectRatio: "16/10" }}
    >
      <WorkThumb kind={project.thumbKind} />
    </div>
  );

  const body = (
    <div>
      <div className="mb-[18px] flex items-center gap-[14px] font-mono text-[12px] text-ink-faint">
        <span className="text-accent">{project.num}</span>
        <span>
          {project.role.toUpperCase()} · {project.year}
        </span>
      </div>
      <h2 className="mb-4 font-serif text-[clamp(32px,3.5vw,44px)] font-normal leading-[1.02] tracking-[-0.015em] text-ink">
        {project.title}
      </h2>
      <p className="mb-[22px] max-w-[46ch] text-[16px] leading-[1.6] text-ink-dim">
        {project.workDescription}
      </p>
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/[.12] px-[11px] py-[5px] font-mono text-[11px] text-ink-faint"
          >
            {tag}
          </span>
        ))}
      </div>
      {hasCaseStudy ? (
        <span className="font-mono text-[13px] text-accent">Read case study →</span>
      ) : (
        <span className="font-mono text-[13px] text-ink-faint/60">Case study on request</span>
      )}
    </div>
  );

  const rowClass = `group grid grid-cols-1 items-center gap-10 border-t border-line py-14 md:gap-14 ${isLast ? "border-b" : ""} ${flipLayout ? "md:grid-cols-[1fr_1.15fr]" : "md:grid-cols-[1.15fr_1fr]"}`;

  if (hasCaseStudy) {
    return (
      <Link href={`/work/${project.slug}`} className={rowClass}>
        {flipLayout ? (
          <>
            {body}
            {thumbnail}
          </>
        ) : (
          <>
            {thumbnail}
            {body}
          </>
        )}
      </Link>
    );
  }

  return (
    <div className={rowClass}>
      {flipLayout ? (
        <>
          {body}
          {thumbnail}
        </>
      ) : (
        <>
          {thumbnail}
          {body}
        </>
      )}
    </div>
  );
}
