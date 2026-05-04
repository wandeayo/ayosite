import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/site/reveal";
import { CAPABILITIES } from "@/lib/capabilities";

export function Capabilities() {
  return (
    <Reveal>
      <Container as="section" className="py-20">
        <div className="mb-15 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-[60px]">
          <Eyebrow>What I do well</Eyebrow>
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1] tracking-[-0.02em]">
            I help teams design <span className="accent-it">thinking products.</span> The kind that
            reason, suggest, and stay legible when they do.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px border-y border-line bg-line md:grid-cols-3">
          {CAPABILITIES.map((cap) => (
            <article
              key={cap.num}
              className="flex min-h-60 flex-col gap-4 bg-bg p-8 transition-colors duration-400 hover:bg-bg-elev md:p-10"
            >
              <span className="font-mono text-[11px] tracking-[0.1em] text-ink-faint">
                {cap.num}
              </span>
              <h3 className="font-serif text-[32px] font-normal leading-[1.05] tracking-[-0.01em]">
                {cap.title}
              </h3>
              <p className="mt-auto text-[14px] leading-[1.55] text-ink-dim">{cap.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}
