import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { Container } from "@/components/ui/container";
import { WorkCard } from "@/components/work/work-card";
import { PROJECTS } from "@/lib/projects";

export function SelectedWork() {
  return (
    <Reveal>
      <Container as="section" className="pb-[110px] pt-[30px]">
        {/* section header */}
        <div className="mb-10 flex items-baseline justify-between border-b border-line pb-[30px]">
          <div>
            <div className="mb-[14px] font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">
              Selected work · 2023–2026
            </div>
            <h2 className="font-serif text-[clamp(32px,3.6vw,46px)] font-normal leading-[1] tracking-[-0.01em]">
              Projects that <span className="accent-it">shipped.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="font-mono text-[13px] text-accent transition-opacity hover:opacity-70"
          >
            View archive →
          </Link>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
          {PROJECTS.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Reveal>
  );
}
