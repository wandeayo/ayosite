"use client";

import { useEffect, useState } from "react";

/**
 * Floating nav pill (Work, About, Contact), fixed at the bottom centre and
 * always visible, from first paint (Ayo, 2026-11-05; the handoff hid it until
 * the hero had scrolled away). The one exception: while a prototype is open
 * full size its overlay covers the page, so ProtoFrame sets `data-proto-open`
 * on <html> and the CSS hides the pill underneath.
 *
 * `home` links to the page's own sections and marks the one being read
 * (aria-current="location"). `case` links back to the home sections, with
 * Work as the current page.
 */

type Variant = "home" | "case";

const HOME_SECTIONS = ["work", "about", "contact"] as const;
type SectionId = (typeof HOME_SECTIONS)[number];

const LABELS: Record<SectionId, string> = { work: "Work", about: "About", contact: "Contact" };

/** On home, a section counts as current once its top passes this fraction of the viewport. */
const READ_LINE = 0.4;

export function FloatingNav({ variant }: { variant: Variant }) {
  const [current, setCurrent] = useState<SectionId | null>(null);

  // Home only: mark the section being read. Case pages have nothing to track.
  useEffect(() => {
    if (variant !== "home") return;
    const sections = HOME_SECTIONS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      // The last section can be too short to reach the read line: count the page end as it.
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        setCurrent("contact");
        return;
      }
      const line = window.innerHeight * READ_LINE;
      let next: SectionId | null = null;
      for (const el of sections) if (el.getBoundingClientRect().top <= line) next = el.id as SectionId;
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
  }, [variant]);

  return (
    <nav className="fnav" aria-label="Site">
      {HOME_SECTIONS.map((id) => {
        if (variant === "home") {
          return (
            <a key={id} href={`#${id}`} aria-current={current === id ? "location" : undefined}>
              {LABELS[id]}
            </a>
          );
        }
        // Contact is repeated at the foot of every case page, so it stays on the page.
        const href = id === "contact" ? "#contact" : `/#${id}`;
        return (
          <a key={id} href={href} aria-current={id === "work" ? "page" : undefined}>
            {LABELS[id]}
          </a>
        );
      })}
    </nav>
  );
}
