import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CaseMetaGrid, type CaseMetaItem } from "@/components/case-study/case-meta-grid";

export interface CaseHeroCta {
  label: string;
  href: string;
}

interface CaseHeroProps {
  meta: CaseMetaItem[];
  title: React.ReactNode;
  lede: React.ReactNode;
  /** Optional CTA shown below the lede. External URLs open in a new tab. */
  cta?: CaseHeroCta;
}

export function CaseHero({ meta, title, lede, cta }: CaseHeroProps) {
  const isExternal = cta?.href.startsWith("http") ?? false;
  return (
    <Container as="section" className="pt-20 pb-15">
      <CaseMetaGrid items={meta} />
      <h1 className="max-w-[14ch] font-serif text-[clamp(48px,7.5vw,128px)] font-normal leading-[0.95] tracking-[-0.03em]">
        {title}
      </h1>
      <p className="mt-10 max-w-[56ch] font-serif text-[clamp(20px,2.2vw,28px)] leading-[1.4] text-ink-dim">
        {lede}
      </p>
      {cta && (
        <div className="mt-10">
          <Button
            variant="primary"
            href={cta.href}
            trailingArrow
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {cta.label}
          </Button>
        </div>
      )}
    </Container>
  );
}
