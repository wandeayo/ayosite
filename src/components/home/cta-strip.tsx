import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/site/reveal";
import { SITE } from "@/lib/site";

interface CTAStripProps {
  /** Headline before the italic accent line. */
  lead: React.ReactNode;
  /** Italic-accent closer. */
  emphasis: React.ReactNode;
  /** Body copy under the headline. */
  description: string;
  /** Primary CTA destination. */
  primary: { label: string; href: string };
}

/**
 * Reusable closer shared by the home and about pages so both bottom rails
 * keep the same typographic moment without duplicating layout.
 */
export function CTAStrip({ lead, emphasis, description, primary }: CTAStripProps) {
  return (
    <Reveal>
      <Container as="section" className="relative pt-40 pb-30 text-center">
        <h2 className="font-serif text-[clamp(56px,9vw,144px)] font-normal leading-[0.95] tracking-[-0.03em]">
          {lead}
          <br />
          <span className="accent-it">{emphasis}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[520px] text-[17px] text-ink-dim">{description}</p>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Button variant="primary" href={primary.href} trailingArrow>
            {primary.label}
          </Button>
          <Button href={`mailto:${SITE.email}`}>{SITE.email}</Button>
        </div>
      </Container>
    </Reveal>
  );
}
