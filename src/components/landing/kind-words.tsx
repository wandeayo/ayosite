"use client";

import { useEffect, useRef, useState } from "react";

import { KIND_WORDS } from "./content";

const DUR = 6000;
const VISIBLE_AT = 0.4;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Kind words: one voice at a time. Port of the prototype's testimonial block.
 * Auto-advances every 6s while ≥40% in view; pauses on hover and while the tab
 * is hidden, and resumes with the time that was left. Click or arrow keys to
 * switch. No auto-advance with reduced motion. All quotes share one grid cell,
 * so the height is the longest quote's and nothing shifts.
 */
export function KindWords() {
  const total = KIND_WORDS.length;
  const [cur, setCur] = useState(0);
  // Bumped on every show() so each progress bar remounts and restarts its fill.
  const [cycle, setCycle] = useState(0);
  // Null until mounted, so the server markup matches the reference before its script runs.
  const [mode, setMode] = useState<{ auto: boolean; paused: boolean } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const t = useRef({
    cur: 0,
    timer: null as ReturnType<typeof setTimeout> | null,
    start: 0,
    left: DUR,
    vis: false,
    hovering: false,
    reduce: false,
  });

  // These only touch refs and state setters, so they're safe to recreate per render.
  function schedule() {
    const s = t.current;
    if (s.timer) clearTimeout(s.timer);
    s.timer = null;
    const running = !s.reduce && s.vis && !s.hovering && !document.hidden;
    setMode({ auto: !s.reduce, paused: !running });
    if (running) {
      s.start = performance.now();
      s.timer = setTimeout(() => show(t.current.cur + 1), s.left);
    }
  }

  function pause() {
    const s = t.current;
    if (s.timer) {
      clearTimeout(s.timer);
      s.timer = null;
      s.left = Math.max(0, s.left - (performance.now() - s.start));
    }
    setMode((m) => ({ auto: m?.auto ?? !s.reduce, paused: true }));
  }

  function show(n: number) {
    const s = t.current;
    s.cur = (n + total) % total;
    s.left = DUR;
    setCur(s.cur);
    setCycle((c) => c + 1);
    schedule();
  }

  // Keep the latest closures for listeners registered once.
  const api = useRef({ schedule, pause });
  api.current = { schedule, pause };

  useEffect(() => {
    const s = t.current;
    s.reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    api.current.schedule();

    const onVisibility = () => (document.hidden ? api.current.pause() : api.current.schedule());
    document.addEventListener("visibilitychange", onVisibility);

    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window && rootRef.current) {
      io = new IntersectionObserver(
        (entries) => {
          s.vis = entries[0]?.isIntersecting ?? false;
          if (s.vis) api.current.schedule();
          else api.current.pause();
        },
        { threshold: VISIBLE_AT },
      );
      io.observe(rootRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
      if (s.timer) clearTimeout(s.timer);
      s.timer = null;
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = t.current.cur + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = t.current.cur - 1;
    if (next === null) return;
    e.preventDefault();
    show(next);
    tabRefs.current[t.current.cur]?.focus();
  };

  const className = ["kw", mode?.auto && "auto", mode?.paused && "paused"].filter(Boolean).join(" ");

  return (
    <section>
      <div className="sec-head">
        <h2 className="label">Kind words</h2>
        <span className="kw-count" id="kw-count">
          {pad(cur + 1)} / {pad(total)}
        </span>
      </div>
      <div
        className={className}
        id="kw"
        ref={rootRef}
        style={{ ["--kwdur" as string]: `${DUR}ms` }}
        onKeyDown={onKeyDown}
        onPointerEnter={() => {
          t.current.hovering = true;
          pause();
        }}
        onPointerLeave={() => {
          t.current.hovering = false;
          schedule();
        }}
      >
        <div className="kw-people" role="tablist" aria-label="People">
          {KIND_WORDS.map((p, i) => (
            <button
              key={p.name}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              className="kw-p"
              type="button"
              role="tab"
              id={`kwt${i}`}
              aria-controls={`kwq${i}`}
              aria-selected={i === cur}
              tabIndex={i === cur ? 0 : -1}
              onClick={() => show(i)}
            >
              <i key={cycle} />
              <b>{p.name}</b>
              <span>{p.role}</span>
            </button>
          ))}
        </div>
        <div className="kw-stage">
          {KIND_WORDS.map((p, i) => (
            // tabpanel isn't an allowed role on <figure>, so the panel wraps it.
            // The figure is display: contents (home.css), so layout is unchanged.
            <div
              key={p.name}
              className={i === cur ? "kw-q on" : "kw-q"}
              role="tabpanel"
              id={`kwq${i}`}
              aria-labelledby={`kwt${i}`}
            >
              <figure>
                <blockquote>{p.quote}</blockquote>
                <figcaption>
                  <b>{p.name}</b>
                  <span>{p.role}</span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
