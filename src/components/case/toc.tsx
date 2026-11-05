"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

/**
 * "On this page". The section being read gets the dark rule, tracked with an
 * IntersectionObserver over a band 30–40% down the viewport (handoff section 3).
 */
export function Toc({ items }: { items: TocItem[] }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="cs-toc" aria-label="On this page">
      <span className="label">On this page</span>
      {items.map((it) => (
        <a key={it.id} href={`#${it.id}`} className={it.id === current ? "on" : undefined} aria-current={it.id === current ? "location" : undefined}>
          {it.label}
        </a>
      ))}
    </nav>
  );
}
