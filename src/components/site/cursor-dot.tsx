"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Subtle cursor follower with magnetic hover state.
 * Desktop only — CSS hides it on touch devices.
 */
export function CursorDot() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      const node = ref.current;
      if (node) {
        node.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest("a, button, [data-cursor-hover]");
      setHover(isInteractive);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className={cn("cursor-dot", hover && "cursor-dot--hover")} aria-hidden />;
}
