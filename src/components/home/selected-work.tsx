import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/site/reveal";
import { WorkList } from "@/components/work/work-list";
import { PROJECTS } from "@/lib/projects";

export function SelectedWork() {
  return (
    <Reveal>
      <Container as="section" className="py-10 md:pt-10 md:pb-15">
        <div className="mb-15 flex items-end justify-between border-b border-line pb-6">
          <div className="flex flex-col gap-4">
            <Eyebrow>Selected work · 2023 to 2026</Eyebrow>
            <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1] tracking-[-0.02em]">
              Projects that
              <br />
              <span className="accent-it">shipped.</span>
            </h2>
          </div>
          <Button href="/work" trailingArrow>
            View archive
          </Button>
        </div>

        <WorkList items={PROJECTS} />
      </Container>
    </Reveal>
  );
}
