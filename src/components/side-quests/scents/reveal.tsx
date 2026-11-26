"use client";

import { useEffect, useRef, useState } from "react";

const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Calls `onIn` once, when 40% of the element is on screen (the reference's threshold). */
function useOnceInView<T extends Element>(onIn: () => void) {
  const ref = useRef<T>(null);
  const cb = useRef(onIn);
  cb.current = onIn;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          cb.current();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

const STATS: ReadonlyArray<readonly [number, string]> = [
  [545, "Instagram posts read before any design"],
  [408, "perfumes catalogued, priced and tagged"],
  [129, "real bottle photos, cut out by hand"],
  [32, "“smells like” guides to designer favourites"],
  [448, "pages generated from one catalogue"],
  [1, "WhatsApp message per order"],
];

/**
 * The six numbers. The server renders the final values (no JS, reduced motion and search
 * engines see them); on scroll-in they count up from zero over 1.1s, easing out.
 */
export function Stats() {
  const [shown, setShown] = useState<number[] | null>(null);
  const ref = useOnceInView<HTMLUListElement>(() => {
    if (reduceMotion()) return;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1100);
      const e = 1 - Math.pow(1 - k, 3);
      setShown(k < 1 ? STATS.map(([n]) => Math.round(n * e)) : null);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  return (
    <ul className="sb-stats" ref={ref}>
      {STATS.map(([n, label], i) => (
        <li key={label}>
          {/* the counting digits are hidden from screen readers, which read the final number */}
          <strong aria-hidden={shown ? true : undefined}>{shown ? shown[i] : n}</strong>
          {shown && <span className="sb-sr">{n}</span>}
          {label}
        </li>
      ))}
    </ul>
  );
}

/** Fig. 2: typical likes per post, product against personal. The ranges grow in on scroll-in. */
export function Audit() {
  const [state, setState] = useState<"ssr" | "wait" | "in">("ssr");
  const ref = useOnceInView<HTMLDivElement>(() => setState("in"));
  useEffect(() => setState((s) => (s === "ssr" ? (reduceMotion() ? "in" : "wait") : s)), []);

  return (
    <div className={state === "wait" ? "sb-frame sb-audit" : "sb-frame sb-audit is-in"} ref={ref}>
      <div className="sb-bars">
        <div className="sb-bar-row">
          <span>
            Product posts<small>bottle shots, price lists</small>
          </span>
          <div className="sb-track" role="img" aria-label="Product posts: about 5 to 20 likes">
            <div className="sb-range prod" style={{ left: `${(5 / 200) * 100}%`, width: `${(15 / 200) * 100}%` }} />
          </div>
        </div>
        <div className="sb-bar-row">
          <span>
            Personal posts<small>Biba, her voice, her day</small>
          </span>
          <div className="sb-track" role="img" aria-label="Personal posts: about 110 to 180 likes">
            <div className="sb-range pers" style={{ left: `${(110 / 200) * 100}%`, width: `${(70 / 200) * 100}%` }} />
          </div>
        </div>
      </div>
      <div className="sb-axis" aria-hidden="true">
        <span>0</span>
        <span>50</span>
        <span>100</span>
        <span>150</span>
        <span>200 likes</span>
      </div>
    </div>
  );
}
