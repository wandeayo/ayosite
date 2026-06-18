import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CaseMetaGrid } from "@/components/case-study/case-meta-grid";
import { CaseCover } from "@/components/case-study/case-cover";
import type { Project } from "@/lib/projects";
import { SITE } from "@/lib/site";

/**
 * Honest fallback for projects without a written case study yet.
 * Shows real metadata so the page is still useful, plus a clear CTA back.
 */
export function CaseInProgress({ project }: { project: Project }) {
  return (
    <>
      <Container as="section" className="pt-20 pb-15">
        <CaseMetaGrid
          items={[
            { label: "Project", value: project.title },
            { label: "Role", value: project.role },
            { label: "Year", value: project.year },
            { label: "Status", value: "Case study in progress", highlight: true },
          ]}
        />
        <Eyebrow className="mb-8">Case study · Coming soon</Eyebrow>
        <h1 className="font-serif text-[clamp(48px,7.5vw,72px)] font-normal leading-[0.95] tracking-[-0.03em]">
          {project.title}
          <span className="accent-it">.</span>
        </h1>
        <p className="mt-10 max-w-[56ch] font-serif text-[clamp(20px,2.2vw,24px)] leading-[1.4] text-ink-dim">
          {project.description}
        </p>
      </Container>

      <CaseCover
        glyph={project.title.charAt(0)}
        caption={`${project.title} · Composition pending`}
      />

      <Container as="section" className="py-25 text-center">
        <p className="mx-auto max-w-[40ch] font-serif text-[clamp(28px,3vw,40px)] leading-[1.2] tracking-[-0.02em]">
          The full write-up is being drafted.
          <br />
          <span className="accent-it">Reach out for the deep version.</span>
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button variant="primary" href={`mailto:${SITE.email}`} trailingArrow>
            Email me
          </Button>
          <Button href="/work">Browse work</Button>
        </div>
      </Container>
    </>
  );
}
