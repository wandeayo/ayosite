"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/** A section counts as current once its top passes this fraction of the viewport. */
const READ_LINE = 0.4;

/**
 * Floating section nav pinned to the bottom of the viewport. Highlights the
 * section being read (aria-current) so a one-page nav still shows where you are.
 */
export function BottomNav() {
  const [current, setCurrent] = useState<SectionId | null>(null);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => el !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      // The last section can be too short to reach the read line: count the page end as it.
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        setCurrent(SECTIONS[SECTIONS.length - 1].id);
        return;
      }
      const line = window.innerHeight * READ_LINE;
      let next: SectionId | null = null;
      for (const el of els) if (el.getBoundingClientRect().top <= line) next = el.id as SectionId;
      setCurrent(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="bnav" aria-label="Sections">
      {SECTIONS.map((s) => (
        <a key={s.id} href={`#${s.id}`} aria-current={current === s.id ? "location" : undefined}>
          {s.label}
        </a>
      ))}
    </nav>
  );
}
