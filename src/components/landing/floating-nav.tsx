"use client";

import { useEffect, useState } from "react";

/**
 * Floating nav pill (Work, About, Contact), fixed at the bottom centre and
 * always visible, from first paint (Ayo, 2026-11-05; the handoff hid it until
 * the hero had scrolled away). The one exception: while a prototype is open
 * full size its overlay covers the page, so ProtoFrame sets `data-proto-open`
 * on <html> and the CSS hides the pill underneath.
 *
 * Links follow waande-site-handoff/CASE-STUDIES.md section 2: Work → /#work,
 * About → /about (its own page), Contact → #contact (repeated at the foot of
 * every page, so it stays on the page).
 *
 * `home` marks the section being read (aria-current="location") for the two
 * items that live on the home page, Work and Contact. `case` marks Work and
 * `about` marks About as the current page (aria-current="page"). `page` (the 404) marks nothing.
 */

type Variant = "home" | "case" | "about" | "page";

type Item = "work" | "about" | "contact";

const ITEMS: readonly Item[] = ["work", "about", "contact"];

const LABELS: Record<Item, string> = { work: "Work", about: "About", contact: "Contact" };

/** Home section ids, in page order. `about` is the "What I do" section, which no pill item points at. */
const HOME_SECTIONS = ["work", "about", "contact"] as const;
type SectionId = (typeof HOME_SECTIONS)[number];

/** On home, a section counts as current once its top passes this fraction of the viewport. */
const READ_LINE = 0.4;

function hrefFor(item: Item, variant: Variant): string {
  if (item === "about") return "/about";
  if (item === "contact") return "#contact";
  return variant === "home" ? "#work" : "/#work";
}

export function FloatingNav({ variant }: { variant: Variant }) {
  const [current, setCurrent] = useState<SectionId | null>(null);

  // Home only: track the section being read. The other pages mark a fixed item.
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

  const ariaCurrent = (item: Item): "page" | "location" | undefined => {
    if (variant === "home") return item !== "about" && current === item ? "location" : undefined;
    if (variant === "case") return item === "work" ? "page" : undefined;
    if (variant === "about") return item === "about" ? "page" : undefined;
    return undefined;
  };

  return (
    <nav className="fnav" aria-label="Site">
      {ITEMS.map((item) => (
        <a key={item} href={hrefFor(item, variant)} aria-current={ariaCurrent(item)}>
          {LABELS[item]}
        </a>
      ))}
    </nav>
  );
}
