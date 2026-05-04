import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/site/reveal";

interface CasePullQuoteProps {
  /** Quote body. Wrap accented words in <span className="accent-it"> manually. */
  quote: React.ReactNode;
  attribution: string;
}

export function CasePullQuote({ quote, attribution }: CasePullQuoteProps) {
  return (
    <Reveal>
      <section className="border-y border-line py-25 text-center">
        <Container>
          <blockquote className="mx-auto max-w-[22ch] font-serif text-[clamp(32px,4.5vw,64px)] leading-[1.15] tracking-[-0.02em]">
            <span className="text-ink">&ldquo;</span>
            {quote}
            <span className="text-ink">&rdquo;</span>
          </blockquote>
          <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            {attribution}
          </div>
        </Container>
      </section>
    </Reveal>
  );
}
