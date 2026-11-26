"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Photo } from "./art";
import { TOUR } from "./catalogue";

const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Seven phone screens from the live site, in a scroll-snap row. Swipe, scroll, use the
 * arrows, or focus the row and use the arrow keys. Each arrow reports when it is at the
 * end (aria-disabled, so it keeps focus) instead of silently doing nothing.
 */
export function Tour() {
  const row = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const sync = useCallback(() => {
    const el = row.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  const by = (dir: 1 | -1) => {
    const el = row.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: reduceMotion() ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="sb-tour-nav">
        <button type="button" aria-label="Previous screen" aria-disabled={edge.start} onClick={() => !edge.start && by(-1)}>
          ←
        </button>
        <button type="button" aria-label="Next screen" aria-disabled={edge.end} onClick={() => !edge.end && by(1)}>
          →
        </button>
      </div>
      <ul className="sb-tour" ref={row} tabIndex={0} role="list" aria-label="Seven screens from the live site, at phone width">
        {TOUR.map((s, k) => (
          <li key={s.img.src}>
            <figure>
              <Photo img={s.img} alt={`Screenshot of the live site at phone width. ${s.cap}`} />
              <figcaption aria-hidden="true">
                <b>0{k + 1}</b>
                {s.cap}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
