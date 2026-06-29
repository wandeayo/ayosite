import Link from "next/link";

import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <Container as="header" className="pb-[104px] pt-[130px]">
      <div className="mb-[38px] font-mono text-[12px] uppercase tracking-[0.16em] text-ink-faint">
        Product Designer · AI &amp; SaaS · Since 2021
      </div>

      <h1 className="mb-10 max-w-[15ch] font-serif text-[clamp(56px,7.5vw,96px)] font-normal leading-[1.0] tracking-[-0.015em]">
        Designing AI products people{" "}
        <span className="accent-it">actually trust.</span>
      </h1>

      <p className="max-w-[60ch] text-[clamp(17px,1.6vw,21px)] leading-[1.62] text-ink-dim">
        Product designer, four years deep in AI and SaaS. I like the messy middle. Where the idea
        is real but the interface hasn&apos;t caught up yet. That&apos;s where I do my best work.
      </p>

      <div className="mt-[46px] flex flex-wrap gap-[13px]">
        <Link
          href="/work"
          className="inline-flex items-center rounded-full bg-ink px-[26px] py-[14px] text-[14px] font-semibold text-bg transition-colors duration-300 hover:bg-accent hover:text-accent-ink"
        >
          See selected work →
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full border border-line-strong px-[26px] py-[14px] text-[14px] text-ink transition-colors duration-300 hover:border-line-strong hover:bg-bg-glass-strong"
        >
          Start a conversation
        </Link>
      </div>
    </Container>
  );
}
