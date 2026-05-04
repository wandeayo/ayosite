import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { Project } from "@/lib/projects";

interface CaseNextProps {
  prev: Project;
  next: Project;
}

/**
 * Three-column footer that bookends a case study with prev/next links.
 */
export function CaseNext({ prev, next }: CaseNextProps) {
  return (
    <Container as="section" className="grid grid-cols-1 items-center gap-10 py-25 md:grid-cols-[1fr_auto_1fr]">
      <Link
        href={`/work/${prev.slug}`}
        className="group flex flex-col gap-3 transition-opacity duration-300 hover:opacity-70"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          ← Previous
        </span>
        <h3 className="font-serif text-[56px] font-normal leading-[1] tracking-[-0.02em]">
          {prev.title}
        </h3>
      </Link>

      <div className="hidden h-20 w-px bg-line md:block" aria-hidden />

      <Link
        href={`/work/${next.slug}`}
        className="group flex flex-col gap-3 text-right transition-opacity duration-300 hover:opacity-70 md:items-end"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          Next case →
        </span>
        <h3 className="font-serif text-[56px] font-normal italic leading-[1] tracking-[-0.02em] text-accent">
          {next.title}
        </h3>
      </Link>
    </Container>
  );
}
