"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Ask my engineers, they'll back me up.": the word is a button that deals out three
 * cards. A port of the reference script (waande-about-handoff/reference/about.html and
 * ABOUT.md section 2):
 *  - fine pointer: entering opens; leaving closes after 180ms, so the cursor can reach the cards;
 *  - tap/click toggles;
 *  - keyboard focus opens, blur closes, and a click within 400ms of focus is ignored
 *    (a tap focuses and clicks at once, so it would otherwise open and close);
 *  - Esc or a click outside closes.
 */

const ENGINEERS = [
  { initials: "WB", bg: "#d9e6ff", fg: "#2a5bb8", name: "Williams Balogun", role: "Full Stack Engineer · Airstride" },
  { initials: "TM", bg: "#e3f6dc", fg: "#2f7d1f", name: "Tom McDonough", role: "CTO · Airstride" },
  { initials: "T", bg: "#f6e6d6", fg: "#9a5a1e", name: "Toba", role: "Designer turned engineer · Dexla" },
] as const;

const CLOSE_DELAY_MS = 180;
const FOCUS_CLICK_GUARD_MS = 400;

export function Engineers() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const button = buttonRef.current;
    if (!wrap || !button) return;

    let closeTimer: ReturnType<typeof setTimeout> | undefined;
    let isOpen = false;
    let focusedAt = 0;
    const set = (next: boolean) => {
      clearTimeout(closeTimer);
      isOpen = next;
      setOpen(next);
    };

    const onEnter = () => set(true);
    const onLeave = () => {
      closeTimer = setTimeout(() => set(false), CLOSE_DELAY_MS);
    };
    const onClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (Date.now() - focusedAt < FOCUS_CLICK_GUARD_MS) return;
      set(!isOpen);
    };
    const onFocus = () => {
      focusedAt = Date.now();
      set(true);
    };
    const onBlur = () => set(false);
    const onDocClick = (e: MouseEvent) => {
      if (!wrap.contains(e.target as Node)) set(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") set(false);
    };

    const fine = window.matchMedia("(hover: hover)").matches;
    if (fine) {
      wrap.addEventListener("pointerenter", onEnter);
      wrap.addEventListener("pointerleave", onLeave);
    }
    button.addEventListener("click", onClick);
    button.addEventListener("focus", onFocus);
    button.addEventListener("blur", onBlur);
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(closeTimer);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      button.removeEventListener("click", onClick);
      button.removeEventListener("focus", onFocus);
      button.removeEventListener("blur", onBlur);
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <span ref={wrapRef} className={open ? "eng-wrap open" : "eng-wrap"}>
      <button ref={buttonRef} type="button" className="eng" id="eng" aria-expanded={open} aria-controls="eng-hand">
        engineers
      </button>
      <span className="eng-hand" id="eng-hand" role="group" aria-label="Engineers who’ll back me up">
        {ENGINEERS.map((e, i) => (
          <span key={e.name} className="eng-card" style={{ "--i": i } as React.CSSProperties}>
            <i style={{ "--c": e.bg, "--t": e.fg } as React.CSSProperties}>{e.initials}</i>
            <b>{e.name}</b>
            <small>{e.role}</small>
          </span>
        ))}
      </span>
    </span>
  );
}
