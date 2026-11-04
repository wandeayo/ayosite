"use client";

import { useEffect, useRef, useState } from "react";

import { LANDING, LINKS } from "./content";

const IDLE = "Copy email";

/** Selectable email + Copy email (clipboard, falling back to selecting the text) + Book a call. */
export function EmailRow() {
  const emailRef = useRef<HTMLElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [label, setLabel] = useState(IDLE);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const selectEmail = () => {
    const el = emailRef.current;
    const selection = window.getSelection();
    if (!el || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
    setLabel("Selected");
  };

  const copy = () => {
    const done = () => {
      setLabel("Copied");
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setLabel(IDLE), 1600);
    };
    try {
      navigator.clipboard.writeText(LANDING.email).then(done, selectEmail);
    } catch {
      selectEmail();
    }
  };

  return (
    <div className="email">
      <code id="email" ref={emailRef}>
        {LANDING.email}
      </code>
      <button className="btn" id="copy" type="button" onClick={copy}>
        {label}
      </button>
      <a className="btn primary" href={LINKS.calendly} target="_blank" rel="noopener">
        Book a call
      </a>
    </div>
  );
}
