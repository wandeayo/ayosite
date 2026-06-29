import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MarginNote } from "@/components/ui/margin-note";

export function AboutHero() {
  return (
    <Container as="section" className="pt-20 pb-15">
      <Eyebrow className="mb-10">About · b. 1998 / based in Lagos</Eyebrow>
      <h1 className="font-serif text-[clamp(48px,7.5vw,128px)] font-normal leading-[0.95] tracking-[-0.03em]">
        A designer who
        <br />
        sweats <span className="accent-it">the small,</span>
        <br />
        slow details.
      </h1>
      <div className="mt-14 grid grid-cols-1 items-end gap-6 border-t border-line pt-8 md:grid-cols-[minmax(0,56ch)_1fr] md:gap-15">
        <p className="text-[18px] leading-[1.55] text-ink-dim">
          Five years designing AI and SaaS products at startups that move fast. I care about
          clean layouts and I document obsessively. Both have a way of paying off later.
        </p>
        <MarginNote rotate={1}>
          {" "}
          ask my engineers,
          <br />
          they&apos;ll back me up.
        </MarginNote>
      </div>
    </Container>
  );
}
