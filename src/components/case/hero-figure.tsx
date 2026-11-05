"use client";

import { useEffect, useRef } from "react";

import { startThumbnails } from "@/components/landing/thumbs/players";

/**
 * Fig. 1: the project's animated thumbnail from the home page, at full column
 * width. Same markup, timeline and hover loupe; only the host differs.
 */
export function HeroFigureClient({ thumb, caption }: { thumb: React.ReactNode; caption: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return startThumbnails(ref.current);
  }, []);

  return (
    <figure className="cs-fig cs-wide cs-herofig" ref={ref}>
      {thumb}
      <figcaption>
        <span>Fig. 1</span>
        {caption}
      </figcaption>
    </figure>
  );
}
