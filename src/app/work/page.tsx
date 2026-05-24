import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WorkFilters } from "@/components/work/work-filters";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from 2023 to 2026. Each entry tells the story of a problem, a system, and the team that built it.",
};

export default function WorkPage() {
  return (
    <div className="page-anim">
      <Container as="section" className="pt-25 pb-15">
        <Eyebrow className="mb-8">Archive · 2023 to 2026</Eyebrow>
        <h1 className="font-serif text-[clamp(64px,10vw,168px)] font-normal leading-[0.9] tracking-[-0.03em]">
          Selected
          <br />
          <span className="accent-it">work.</span>
        </h1>

        <WorkFilters
          projects={PROJECTS}
          description={
            <p className="max-w-[50ch] text-[17px] text-ink-dim">
              A small set of projects I am proud of. Each entry tells the story of a problem, a
              system, and the team that built it.
            </p>
          }
        />
      </Container>
    </div>
  );
}
