import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/cn";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <Reveal>
      <Container as="section" className="pt-[140px] pb-25">
        <div className="mb-20 grid grid-cols-1 items-end gap-10 md:grid-cols-[1fr_1.6fr] md:gap-[60px]">
          <Eyebrow>Kind words / Testimonials</Eyebrow>
          <div>
            <h2 className="font-serif text-[clamp(40px,5.4vw,80px)] font-normal leading-[0.98] tracking-[-0.02em]">
              What teammates,
              <br />
              founders and engineers
              <br />
              <span className="accent-it">say about working with me.</span>
            </h2>
            <p className="mt-8 max-w-[56ch] text-[16px] leading-[1.55] text-ink-dim">
              The bit I cherish most. Below are notes from people I&apos;ve actually shipped with,
              copied verbatim from LinkedIn recommendations and Slack DMs I never deleted.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((quote, i) => (
            <TestimonialCard key={quote.name} quote={quote} index={i} />
          ))}
        </div>
      </Container>
    </Reveal>
  );
}

function TestimonialCard({ quote, index }: { quote: Testimonial; index: number }) {
  return (
    <figure
      className={cn(
        "relative flex flex-col gap-6 rounded-[14px] border border-line bg-bg-elev px-9 pt-10 pb-8 transition-[border-color,transform] duration-500 ease-[var(--ease-out-quart)] hover:border-line-strong",
        `t-card--${index % 4}`,
      )}
    >
      <div className="-mb-3 font-serif text-[80px] italic leading-[0.7] text-accent">&ldquo;</div>
      <blockquote className="font-serif text-[22px] leading-[1.4] tracking-[-0.005em] text-ink">
        {quote.body}
      </blockquote>
      <figcaption className="mt-auto border-t border-line pt-5">
        <div className="mb-1 text-[14px] text-ink">{quote.name}</div>
        <div className="font-mono text-[11px] tracking-[0.04em] text-ink-faint">
          {quote.role} <span className="text-ink-faint">·</span>{" "}
          <span className="text-ink-dim">{quote.company}</span>
        </div>
      </figcaption>
    </figure>
  );
}
