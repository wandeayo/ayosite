import type { Metadata } from "next";

import { Reveal } from "@/components/site/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WorkCard } from "@/components/work/work-card";
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

        <p className="mt-10 max-w-[50ch] text-[17px] text-ink-dim">
          Four projects I&apos;m proud of. Each one has a problem behind it, a decision I made, and
          a few things I&apos;d do differently.
        </p>

        <div className="grid grid-cols-1 gap-[30px] pt-20 pb-10 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <Reveal key={project.slug}>
              <WorkCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
