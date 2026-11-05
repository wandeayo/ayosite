"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { createPortal } from "react-dom";

import type { TileKind } from "./cases";

/**
 * Prototype frame (case-study handoff, section 4.1). Port of the reference's
 * "Fit prototypes" block:
 *
 * - The prototype is authored at a fixed W × H inside `.pstage` and scaled as
 *   one piece (`--s` = view width / W), so it never reflows. `.pview`'s height
 *   is H × s. A ResizeObserver keeps it fitted.
 * - ↺ remounts the prototype, which resets its state and clears its timers.
 * - ⤢ opens it full size: fixed with 16px insets over a blurred backdrop,
 *   letterboxed at min(w/W, h/H). Esc, ✕ or a backdrop click close it and
 *   focus returns to the button that opened it.
 * - Phones (≤ 720px): a non-interactive preview with "Open prototype" over a
 *   gradient. It opens a full-screen viewer that renders at
 *   clamp(.5, w/W, 1) with CSS zoom, so it pans natively; a hint fades after 4.2s.
 * - While open, <html> gets data-proto-open (hides the floating nav) and
 *   overflow:hidden.
 *
 * Deliberate additions: the covered phone preview is `inert`, so keyboard and
 * screen-reader users can't reach controls they can't see; the open frame is
 * labelled as a dialog.
 */

const SMALL = "(max-width: 720px)";
const HINT_MS = 4200;

interface ProtoFrameProps {
  tile: TileKind;
  url: string;
  /** Authored size in px. */
  w: number;
  h: number;
  /** Extra classes on `.pstage` (Carmen's onboarding/chat use `fa`). */
  stageClass?: string;
  stageId?: string;
  /** Rendered under the window, inside the tile (e.g. the verification switch). */
  below?: ReactNode;
  /** What the dialog is called when open full size. */
  label: string;
  /**
   * Show ↺ ⤢ on desktop (default). Airstride's explorer frame shows only its URL; its
   * controls appear only in the phone viewer, where ✕ is the way out.
   */
  controls?: boolean;
  /** Extra classes on `.pview` (the explorer's is also `.mx-view`). */
  viewClass?: string;
  /** Extra attributes on the tile (the explorer makes it a tabpanel). */
  rootProps?: HTMLAttributes<HTMLDivElement>;
  /** The prototype, or a function of the frame's state, to mount heavy content only when it can be seen. */
  children: ReactNode | ((state: FrameState) => ReactNode);
}

export interface FrameState {
  /** Open full size (or in the phone viewer). */
  open: boolean;
  /** Viewport ≤ 720px: the inline frame is a cover-up preview. */
  small: boolean;
}

export function ProtoFrame({ tile, url, w, h, stageClass, stageId, below, label, controls = true, viewClass, rootProps, children }: ProtoFrameProps) {
  const viewRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [run, setRun] = useState(0);
  const [open, setOpen] = useState<null | { mob: boolean }>(null);
  const [small, setSmall] = useState(false);
  const [hintOut, setHintOut] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;

  const fit = useCallback(() => {
    const v = viewRef.current;
    const st = stageRef.current;
    if (!v || !st) return;
    const o = openRef.current;
    let s = v.clientWidth / w;
    if (o?.mob) {
      s = Math.min(1, Math.max(0.5, v.clientWidth / w));
    } else if (o) {
      s = Math.min(v.clientWidth / w, v.clientHeight / h);
      st.style.setProperty("--ox", `${(v.clientWidth - w * s) / 2}px`);
      st.style.setProperty("--oy", `${(v.clientHeight - h * s) / 2}px`);
    }
    v.style.setProperty("--s", String(s));
    st.style.setProperty("--s", String(s));
  }, [w, h]);

  useEffect(() => {
    const v = viewRef.current;
    if (!v) return;
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(v);
    return () => ro.disconnect();
  }, [fit]);

  // Re-fit synchronously-ish whenever the frame opens or closes.
  useEffect(() => {
    fit();
  }, [open, fit]);

  const close = useCallback(() => {
    if (!openRef.current) return;
    setOpen(null);
    const f = openerRef.current ?? expRef.current;
    openerRef.current = null;
    // focus after React has put the frame back in the page
    requestAnimationFrame(() => f?.focus({ preventScroll: true }));
  }, []);

  const openView = useCallback(
    (from: HTMLElement | null) => {
      if (openRef.current) {
        close();
        return;
      }
      openerRef.current = from;
      const mob = matchMedia(SMALL).matches;
      setHintOut(false);
      setOpen({ mob });
    },
    [close],
  );

  // Phone width tracking: the preview cover and the viewer depend on it.
  useEffect(() => {
    const mq = matchMedia(SMALL);
    const sync = () => {
      setSmall(mq.matches);
      if (openRef.current) close();
    };
    setSmall(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [close]);

  // While open: page scroll lock, nav hidden, Esc closes, focus on ✕, hint timer.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    root.setAttribute("data-proto-open", "");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    expRef.current?.focus({ preventScroll: true });
    let hint: ReturnType<typeof setTimeout> | undefined;
    if (open.mob) {
      viewRef.current?.scrollTo(0, 0);
      hint = setTimeout(() => setHintOut(true), HINT_MS);
    }
    return () => {
      root.style.overflow = "";
      root.removeAttribute("data-proto-open");
      document.removeEventListener("keydown", onKey);
      clearTimeout(hint);
    };
  }, [open, close]);

  const winClass = ["win", "pwin", open && "expanded", open?.mob && "mob"].filter(Boolean).join(" ");

  return (
    <div {...rootProps} className={open ? "thumb still ptile has-exp" : "thumb still ptile"} data-tile={tile}>
      <div
        className={winClass}
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? label : undefined}
      >
        <div className="chrome">
          <i />
          <i />
          <i />
          <span className="url">{url}</span>
          {(controls || open) && (
            <span className="pctl">
              {controls && (
                <button type="button" className="prestart" aria-label="Restart prototype" onClick={() => setRun((r) => r + 1)}>
                  ↺
                </button>
              )}
              <button
                type="button"
                className="pexp"
                ref={expRef}
                aria-label={open ? "Close prototype" : "Open prototype full size"}
                onClick={(e) => openView(e.currentTarget)}
              >
                {open ? "✕" : "⤢"}
              </button>
            </span>
          )}
        </div>
        <div className={viewClass ? `pview ${viewClass}` : "pview"} data-w={w} data-h={h} ref={viewRef} style={{ "--ph": h } as React.CSSProperties} suppressHydrationWarning>
          <div
            className={stageClass ? `pstage ${stageClass}` : "pstage"}
            id={stageId}
            ref={stageRef}
            style={{ width: w, height: h }}
            inert={small && !open}
            suppressHydrationWarning
          >
            <Fragment key={run}>{typeof children === "function" ? children({ open: !!open, small }) : children}</Fragment>
          </div>
          <div className="pcover">
            <button type="button" className="popen" onClick={(e) => openView(e.currentTarget)}>
              Open prototype
            </button>
            <span>Best on desktop</span>
          </div>
        </div>
        {open?.mob && (
          <div className={hintOut ? "phint out" : "phint"}>
            <b>Drag to look around</b>
            <span className="prot">Turn your phone sideways for the best view</span>
          </div>
        )}
      </div>
      {below}
      {open && createPortal(<div className="pback" onClick={close} />, document.body)}
    </div>
  );
}
