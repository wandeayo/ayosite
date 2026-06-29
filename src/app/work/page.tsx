import Link from "next/link";
import type { Metadata } from "next";

import { WorkRow } from "@/components/work/work-row";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A small set of projects. Each one is a problem, a system, and the team that built it.",
};

export default function WorkPage() {
  return (
    <div className="page-anim">
      {/* header */}
      <header className="mx-auto w-full max-w-[1280px] px-[clamp(20px,4vw,48px)]" style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="mb-[34px] font-mono text-[12px] uppercase tracking-[0.16em] text-ink-faint">
          Archive · 2023–2026
        </div>
        <h1 className="mb-[34px] font-serif text-[clamp(64px,9vw,92px)] font-normal leading-[1] tracking-[-0.015em]">
          Selected <span className="accent-it">work.</span>
        </h1>
        <p className="max-w-[58ch] text-[20px] leading-[1.6] text-ink-dim">
          A small set of projects I&apos;m proud of. Each one is a problem, a system, and the team
          that built it, written the way I&apos;d actually explain it to you over coffee.
        </p>
      </header>

      {/* project rows — capped at 1280px to match design spec */}
      <section className="mx-auto w-full max-w-[1280px] px-[clamp(20px,4vw,48px)] pb-10">
        {PROJECTS.map((project, idx) => (
          <WorkRow
            key={project.slug}
            project={project}
            index={idx}
            isLast={idx === PROJECTS.length - 1}
          />
        ))}
      </section>

      {/* bottom CTA */}
      <section className="py-[110px] text-center">
        <h2 className="mx-auto mb-[30px] max-w-[20ch] font-serif text-[clamp(36px,4vw,54px)] font-normal leading-[1.06]">
          Want the <span className="accent-it">full story</span> behind one of these?
        </h2>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-accent px-[30px] py-[15px] text-[15px] font-semibold text-[#08130d] transition-transform duration-200 hover:-translate-y-[2px]"
        >
          Ask me about it →
        </Link>
      </section>
    </div>
  );
}
