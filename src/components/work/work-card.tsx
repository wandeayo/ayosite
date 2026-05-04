import Link from "next/link";

import { MediaTile } from "@/components/ui/media-tile";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

interface WorkCardProps {
  project: Project;
  index: number;
}

/**
 * Single project card used in the /work archive.
 * Featured projects span both columns and use a wider aspect ratio.
 */
export function WorkCard({ project, index }: WorkCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group block overflow-hidden rounded-lg border border-line bg-bg-elev transition-[border-color,transform] duration-500 ease-[var(--ease-out-quart)] hover:border-line-strong",
        project.featured && "md:col-span-2",
      )}
    >
      <MediaTile
        aspect={project.featured ? "aspect-[21/9]" : "aspect-[16/10]"}
        background={project.cardGradient}
        className="rounded-none border-0"
      >
        <div className="absolute top-5 left-6 font-mono text-[11px] uppercase tracking-[0.1em] text-white/50">
          {String(index + 1).padStart(2, "0")} / {project.role}
        </div>
        <div
          className="absolute bottom-5 left-6 font-serif italic leading-[1] tracking-[-0.03em] text-accent"
          style={{ fontSize: project.featured ? 96 : 56 }}
        >
          {project.title.split(" ")[0]}
        </div>
      </MediaTile>

      <div className="flex items-end justify-between gap-6 p-6 md:px-7 md:pt-6 md:pb-7">
        <div>
          <h3 className="mb-1.5 font-serif text-[32px] font-normal leading-tight tracking-[-0.01em]">
            {project.title}
          </h3>
          <p className="text-[14px] text-ink-dim">{project.description}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className="whitespace-nowrap text-right font-mono text-[11px] tracking-[0.08em] text-ink-faint">
          {project.year}
        </div>
      </div>
    </Link>
  );
}
