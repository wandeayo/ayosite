"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open]);

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
        <span>AYO</span>
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

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative z-101 flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
      >
        <span
          className={cn(
            "block h-px w-5 bg-ink transition-transform duration-300 ease-[var(--ease-out-quart)]",
            open && "translate-y-[3px] rotate-45",
          )}
          aria-hidden
        />
        <span
          className={cn(
            "block h-px w-5 bg-ink transition-transform duration-300 ease-[var(--ease-out-quart)]",
            open && "-translate-y-[3px] -rotate-45",
          )}
          aria-hidden
        />
      </button>

      <div
        id="mobile-nav-menu"
        className={cn(
          "fixed inset-0 top-0 z-100 flex flex-col justify-center gap-2 bg-bg px-(--gutter) transition-opacity duration-300 ease-[var(--ease-out-quart)] md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ ["--gutter" as string]: "clamp(20px, 4vw, 56px)" }}
      >
        {NAV_LINKS.map((link) => {
          const active = link.match(pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "font-mono text-[28px] uppercase tracking-[0.02em] transition-colors duration-200 ease-[var(--ease-out-quart)]",
                active ? "text-ink" : "text-ink-dim",
              )}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
