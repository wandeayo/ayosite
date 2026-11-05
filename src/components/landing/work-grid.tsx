"use client";

import { useEffect, useRef } from "react";

import { startThumbnails } from "./thumbs/players";

/** Hosts the server-rendered project cards and drives their thumbnails. */
export function WorkGrid({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return startThumbnails(ref.current);
  }, []);

  return (
    <div className="work" ref={ref}>
      {children}
    </div>
  );
}
