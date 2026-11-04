"use client";

import { useEffect, useState } from "react";

const format = () =>
  `${new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit" }).format(new Date())} local`;

/** Live Abuja time. Server-renders the static "UTC+1" fallback, as the reference does before its script runs. */
export function LocalClock() {
  const [text, setText] = useState("UTC+1");

  useEffect(() => {
    const tick = () => {
      try {
        setText(format());
      } catch {
        // keep the UTC+1 fallback
      }
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return <span id="clock">{text}</span>;
}
