import { Reveal } from "@/components/site/reveal";
import { Container } from "@/components/ui/container";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

const featured = TESTIMONIALS.filter((t) => t.featured);
const marqueeItems = TESTIMONIALS.filter((t) => !t.featured);

export function Testimonials() {
  return (
    <Reveal>
      <section className="border-t border-line pb-[104px] pt-[96px]" style={{ background: "#0d0e12" }}>
        {/* section header */}
        <Container className="mb-[50px]">
          <div className="mb-[18px] font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">
            Kind words · Copied verbatim
          </div>
          <h2 className="max-w-[22ch] font-serif text-[clamp(36px,4vw,52px)] font-normal leading-[1.06] tracking-[-0.01em]">
            Notes from people I&apos;ve{" "}
            <span className="accent-it">actually shipped with.</span>
          </h2>
        </Container>

        {/* featured pair */}
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((quote) => (
            <FeaturedCard key={quote.name} quote={quote} />
          ))}
        </Container>

        {/* marquee strip */}
        <div
          className="mt-6 overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
          }}
        >
          <div
            className="flex w-max gap-6 px-3"
            style={{ animation: "ayo-marquee 38s linear infinite" }}
          >
            {[...marqueeItems, ...marqueeItems].map((quote, i) => (
              <MarqueeCard key={`${quote.name}-${i}`} quote={quote} />
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function FeaturedCard({ quote }: { quote: Testimonial }) {
  return (
    <figure
      className="rounded-[16px] border border-line p-[34px] md:p-[36px]"
      style={{
        background: "linear-gradient(160deg, rgba(200,242,80,.05), transparent 50%)",
      }}
    >
      {/* avatar + name row */}
      <div className="mb-[22px] flex items-center gap-[14px]">
        <div
          className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full font-mono text-[14px] font-medium"
          style={{ background: "var(--color-accent)", color: "#08130d" }}
        >
          {quote.initials}
        </div>
        <div>
          <div className="text-[16px] font-semibold text-ink">{quote.name}</div>
          <div className="font-mono text-[11px] text-ink-faint">
            {quote.role}{quote.company ? ` · ${quote.company}` : ""}
          </div>
        </div>
        {quote.date && (
          <span className="ml-auto font-mono text-[10px] text-ink-faint/60">{quote.date}</span>
        )}
      </div>

      <blockquote className="font-serif text-[clamp(17px,1.5vw,21px)] leading-[1.5] text-ink">
        &ldquo;{quote.body}&rdquo;
      </blockquote>
    </figure>
  );
}

function MarqueeCard({ quote }: { quote: Testimonial }) {
  return (
    <figure
      className="flex w-[420px] shrink-0 flex-col rounded-[14px] border border-line p-7"
      style={{ background: "#0e0f13" }}
    >
      <blockquote className="flex-1 text-[15px] leading-[1.6] text-ink-dim">
        &ldquo;{quote.body}&rdquo;
      </blockquote>
      <div className="mt-5 flex items-center gap-3">
        <div
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full font-mono text-[12px] text-ink"
          style={{ background: "#22252c" }}
        >
          {quote.initials}
        </div>
        <div>
          <div className="text-[14px] font-semibold text-ink">{quote.name}</div>
          <div className="font-mono text-[11px] text-ink-faint">
            {quote.role}{quote.company ? ` · ${quote.company}` : ""}
          </div>
        </div>
      </div>
    </figure>
  );
}
