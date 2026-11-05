"use client";

import { useEffect, useState } from "react";

/**
 * Floating nav pill (Work, About, Contact), pinned to the bottom centre.
 * Case-study handoff section 2:
 *
 * - Hidden until the hero has scrolled out of view (its bottom is less than
 *   80px from the top of the viewport), then it slides up.
 * - Hidden while a prototype is open full size: ProtoFrame sets
 *   `data-proto-open` on <html>, and the CSS hides the pill.
 * - While hidden it is `inert`, so keyboard focus can't land on links you
 *   can't see.
 *
 * `home` links to the page's own sections and marks the one being read
 * (aria-current="location"). `case` links back to the home sections, with
 * Work as the current page.
 */

type Variant = "home" | "case";

const HOME_SECTIONS = ["work", "about", "contact"] as const;
type SectionId = (typeof HOME_SECTIONS)[number];

const LABELS: Record<SectionId, string> = { work: "Work", about: "About", contact: "Contact" };

/** The pill shows once the hero's bottom edge rises above this line (px from the top). */
const SHOW_LINE = 80;
/** On home, a section counts as current once its top passes this fraction of the viewport. */
const READ_LINE = 0.4;

export function FloatingNav({ variant }: { variant: Variant }) {
  const [shown, setShown] = useState(false);
  const [current, setCurrent] = useState<SectionId | null>(null);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".cs-hero, .intro");
    const sections =
      variant === "home"
        ? HOME_SECTIONS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
        : [];
    let frame = 0;

    const update = () => {
      frame = 0;
      setShown(hero ? hero.getBoundingClientRect().bottom < SHOW_LINE : window.scrollY > 300);
      if (variant !== "home") return;
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
    <nav className={shown ? "fnav show" : "fnav"} aria-label="Site" inert={!shown}>
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
