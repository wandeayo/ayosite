"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

interface WorkListProps {
  items: Project[];
}

interface PreviewState {
  show: boolean;
  x: number;
  y: number;
  index: number;
}

const INITIAL_PREVIEW: PreviewState = { show: false, x: 0, y: 0, index: 0 };

/**
 * Cursor-tracking work list for the home page.
 * Each row navigates to its project on click and pushes a floating
 * preview tile that follows the cursor on hover.
 */
export function WorkList({ items }: WorkListProps) {
  const router = useRouter();
  const [preview, setPreview] = useState<PreviewState>(INITIAL_PREVIEW);

  const onMove = useCallback((event: React.MouseEvent, index: number) => {
    setPreview({
      show: true,
      x: event.clientX + 24,
      y: event.clientY - 100,
      index,
    });
  }, []);

  const onLeave = useCallback(() => {
    setPreview((prev) => ({ ...prev, show: false }));
  }, []);

  return (
    <>
      <ul className="flex flex-col">
        {items.map((item, index) => (
          <li key={item.slug}>
            <button
              type="button"
              onMouseMove={(e) => onMove(e, index)}
              onMouseLeave={onLeave}
              onClick={() => router.push(`/work/${item.slug}`)}
              className="group grid w-full cursor-pointer grid-cols-[50px_1fr_48px] items-center gap-4 border-b border-line py-8 text-left transition-[padding] duration-400 ease-[var(--ease-out-quart)] hover:pl-4 md:grid-cols-[80px_1fr_auto_auto] md:gap-8"
            >
              <span className="font-mono text-[12px] tracking-[0.06em] text-ink-faint">
                {item.num}
              </span>
              <span className="font-serif text-[clamp(28px,3.5vw,48px)] leading-[1] tracking-[-0.02em]">
                {item.title}
              </span>
              <span className="hidden max-w-[200px] text-right font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint md:block">
                {item.role} · {item.year}
                <br />
                <span className="text-ink-faint/70">{item.summary}</span>
              </span>
              <ArrowCell />
            </button>
          </li>
        ))}
      </ul>

      <CursorPreview state={preview} items={items} />
    </>
  );
}

function ArrowCell() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink-dim transition-all duration-400 ease-[var(--ease-out-quart)] group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8h10m0 0L9 4m4 4L9 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CursorPreview({ state, items }: { state: PreviewState; items: Project[] }) {
  const item = items[state.index];
  if (!item) return null;
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed z-50 h-[240px] w-[380px] overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-[opacity,transform] duration-300 ease-[var(--ease-out-quart)]",
        state.show ? "scale-100 opacity-100" : "scale-90 opacity-0",
      )}
      style={{ left: state.x, top: state.y, background: item.cardGradient }}
    >
      {item.cardImage ? (
        <Image
          src={item.cardImage}
          alt=""
          fill
          sizes="380px"
          className="object-cover"
          priority={state.index === 0}
        />
      ) : (
        <div className="stripes-overlay" />
      )}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-4 left-5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/80">
        {item.title} · Preview
      </div>
    </div>
  );
}
