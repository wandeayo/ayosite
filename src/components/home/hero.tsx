import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MarginNote } from "@/components/ui/margin-note";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <Container as="section" className="relative overflow-hidden pt-[120px] pb-20">
      <div className="mb-[60px] flex flex-wrap items-center justify-between gap-3">
        <Eyebrow>Portfolio · {SITE.edition}</Eyebrow>
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
          UTC+1
        </div>
      </div>

      <h1 className="font-serif text-[clamp(56px,11vw,184px)] font-normal leading-[0.92] tracking-[-0.03em] text-ink">
        Designing
        <br />
        <span className="accent-it">considered</span> systems
        <br />
        <span className="stroke-text">for AI products.</span>
      </h1>

      <div className="mt-16 grid grid-cols-1 items-end gap-6 border-t border-line pt-8 md:grid-cols-[minmax(0,56ch)_1fr] md:gap-20">
        <p className="text-[18px] leading-[1.55] text-ink-dim">
          I&apos;m Ayowande, a Product Designer working at the seam where AI capability meets
          human reasoning. I build interfaces that developers enjoy implementing, stakeholders
          are proud to ship, and users actually trust.
        </p>
        <MarginNote>
          {" "}
          a fancy way of saying I sweat
          <br />
          the small stuff so you don&apos;t have to.
        </MarginNote>
      </div>
    </Container>
  );
}
