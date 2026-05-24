"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "nav-bar fixed inset-x-0 top-0 z-100 flex items-center justify-between px-(--gutter) py-[18px]",
        scrolled && "nav-bar--scrolled",
      )}
      style={{ ["--gutter" as string]: "clamp(20px, 4vw, 56px)" }}
    >
      <Link
        href="/"
        className="flex items-center gap-[10px] font-mono text-[13px] tracking-[0.02em] text-ink"
        aria-label={`${SITE.shortName} home`}
      >
        <span className="pulse-dot" aria-hidden />
        <span>AYO &mdash;05</span>
      </Link>

      <div className="hidden gap-1 font-mono text-[12px] uppercase tracking-[0.06em] md:flex">
        {NAV_LINKS.map((link) => {
          const active = link.match(pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-[14px] py-[10px] transition-colors duration-200 ease-[var(--ease-out-quart)]",
                active ? "text-ink" : "text-ink-dim hover:text-ink",
              )}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <span
                  className="absolute inset-0 rounded-full border border-line bg-bg-glass-strong"
                  aria-hidden
                />
              )}
              <span className="relative">{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div aria-hidden />
    </nav>
  );
}
