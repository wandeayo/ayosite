"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

interface RevealProps {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}

/**
 * Adds a soft fade-up the first time this element scrolls into view.
 * Reduced-motion users see it in place.
 */
export function Reveal({ as: Tag = "div", className, delay, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
