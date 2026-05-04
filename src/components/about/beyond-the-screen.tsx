import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/site/reveal";
import { BEYOND } from "@/lib/about";

export function BeyondTheScreen() {
  return (
    <Reveal>
      <Container as="section" className="border-t border-line py-25">
        <div className="mb-15 flex flex-col gap-6">
          <Eyebrow>Beyond the screen</Eyebrow>
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1] tracking-[-0.02em]">
            Things I do
            <br />
            <span className="accent-it">when I&apos;m not designing.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px border-y border-line bg-line md:grid-cols-3">
          {BEYOND.map((item) => (
            <article
              key={item.title}
              className="flex min-h-60 flex-col gap-4 bg-bg p-8 md:p-12"
            >
              <span className="font-mono text-[11px] tracking-[0.1em] text-ink-faint">
                {item.num}
              </span>
              <h3 className="font-serif text-[36px] italic font-normal leading-[1] tracking-[-0.02em] text-accent">
                {item.title}
              </h3>
              <p className="mt-auto text-[14px] leading-[1.6] text-ink-dim">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}
