import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/site/reveal";

/**
 * Journey narrative on /about. The body is hand-written copy in Ayowande's
 * voice; we keep highlights as <span className="hl"> for the accent wash.
 */
export function Journey() {
  return (
    <Reveal>
      <Container
        as="section"
        className="grid grid-cols-1 items-start gap-8 border-t border-line py-25 md:grid-cols-[280px_1fr] md:gap-20"
      >
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint md:sticky md:top-25">
          The Journey
        </span>
        <div>
          <h2 className="mb-14 font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1] tracking-[-0.02em]">
            From learning Adobe XD
            <br />
            to <span className="accent-it">leading product design.</span>
          </h2>

          <div className="flex max-w-[64ch] flex-col gap-6 text-[19px] leading-[1.65]">
            <p>
              I landed my first real role at Groflex, a German startup. Spent five months on the
              WebApp team alongside two other designers which became my first taste of actual
              product work, with actual deadlines.
            </p>
            <p>
              After that, I joined Approvam as their only designer. Just me. I figured it out,
              delivered, and learned more in that stretch than any course could teach.
            </p>
            <p>
              Then I joined Dexla. UK-based startup. They brought me in to lead the redesign of
              their low-code app builder into a fully no-code AI product. That project stretched
              me in ways I didn&apos;t expect, leading design across multiple teams, keeping
              documentation tight, communicating with people who thought very differently from me.
              It&apos;s also what pulled me into the AI space.
            </p>
            <p>
              Now I&apos;m at Airstride, and honestly, it&apos;s the most I&apos;ve ever grown in a
              role. I came in to design version 2 of the product, specifically Carmen, an AI agent
              that helps vendors find and acquire partners without the usual headaches. The role
              kept growing. I ended up owning the website redesign too, and diving into SEO.
              Before I knew it, I was in everything.{" "}
              <span className="hl">
                It worked. The website redesign drove an 84% jump in conversions.
              </span>{" "}
              I&apos;m not just designing here, I&apos;m building.
            </p>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
