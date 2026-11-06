"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { displayPath, FALLBACK_PATH } from "./path";

/*
 * The 404's hero, canvas and actions (waande-404-handoff/reference/404.html). Every string
 * and timing is the reference's. The requested path is only ever rendered as React text,
 * never as HTML (see path.ts for how it reaches the prerendered page). Beyond the reference: one cursor loop at a time, S is ignored while the
 * terminal is printing (the reference reset halfway), and the hidden view is inert.
 */

/** Stops for Ayo's cursor, as fractions of the canvas. The last one shows the comment pin. */
const POINTS: readonly (readonly [number, number])[] = [
  [0.3, 0.32],
  [0.62, 0.46],
  [0.44, 0.7],
  [0.76, 0.2],
];

/** One stop: the 1.3s move (CSS) plus a short rest, as the reference's 1500ms sleep. */
const STOP_MS = 1500;
const PIN_MS = 2600;
const TYPE_MS = 38;

const LINKS = [
  ["Home", "/"],
  ["Carmen, an AI agent people trust", "/work/carmen-ai"],
  ["Airstride, six modules, one designer", "/work/airstride"],
  ["About me", "/about"],
] as const;

type Mode = "design" | "running" | "done";
type Line = { kind: "text"; text: string; cls: "m" | "e" | "g" } | { kind: "link"; label: string; href: string };

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return reduce;
}

const noSubscribe = () => () => {};

export function NotShipped() {
  // false while hydrating, so the first client render matches the prerendered HTML.
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);
  const pathname = usePathname();
  const path = hydrated ? displayPath(pathname) : FALLBACK_PATH;
  const reduce = usePrefersReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLButtonElement>(null);

  const [mode, setMode] = useState<Mode>("design");
  const [visible, setVisible] = useState(false);
  const [pinOn, setPinOn] = useState(false);
  const [typed, setTyped] = useState<string | null>(null); // null: no command line yet
  const [typing, setTyping] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);

  /** Bumped on every run and reset; a run that sees a newer id stops printing. */
  const runId = useRef(0);
  const modeRef = useRef<Mode>("design");
  modeRef.current = mode;

  // The loop only runs while at least 30% of the canvas is on screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting), { threshold: 0.3 });
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  // Ayo's cursor drifts around the frame and leaves a comment. The effect owns the loop,
  // so leaving the design view, scrolling away or unmounting always stops it.
  useEffect(() => {
    if (mode !== "design" || !visible || reduce) return;
    let alive = true;
    (async () => {
      while (alive) {
        for (const [x, y] of POINTS) {
          const stage = stageRef.current;
          const cur = curRef.current;
          if (!alive || !stage || !cur) return;
          const r = stage.getBoundingClientRect();
          cur.style.transform = `translate(${x * r.width}px,${y * r.height}px)`;
          await sleep(STOP_MS);
          if (!alive) return;
          if (x === 0.76) {
            setPinOn(true);
            await sleep(PIN_MS);
            setPinOn(false);
          }
        }
      }
    })();
    return () => {
      alive = false;
      setPinOn(false);
    };
  }, [mode, visible, reduce]);

  // Keep the newest log line in view.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines, typed]);

  // Once the log has printed, focus moves to its first link.
  useEffect(() => {
    if (mode === "done") logRef.current?.querySelector("a")?.focus({ preventScroll: true });
  }, [mode]);

  // "Ship it anyway": try to deploy the page that doesn't exist.
  const ship = useCallback(async () => {
    const id = ++runId.current;
    const t = reduce ? 0 : 1;
    const wait = async (ms: number) => {
      if (ms * t) await sleep(ms * t);
      return runId.current === id;
    };
    const print = (line: Line) => setLines((prev) => [...prev, line]);

    setMode("running");
    setLines([]);
    setTyping(true);
    const cmd = `ship ${path}`;
    if (reduce) setTyped(cmd);
    else {
      setTyped("");
      for (let i = 1; i <= cmd.length; i++) {
        if (!(await wait(TYPE_MS))) return;
        setTyped(cmd.slice(0, i));
      }
    }
    setTyping(false);

    if (!(await wait(350))) return;
    print({ kind: "text", text: "▸ exporting frame from Figma…", cls: "m" });
    if (!(await wait(650))) return;
    print({ kind: "text", text: `▸ building route ${path}…`, cls: "m" });
    if (!(await wait(800))) return;
    print({ kind: "text", text: "✕ build failed: frame is empty", cls: "e" });
    if (!(await wait(300))) return;
    print({ kind: "text", text: "  0 components · 0 copy · 1 very optimistic designer", cls: "m" });
    if (!(await wait(700))) return;
    print({ kind: "text", text: "↳ nothing to ship here. try one of these instead:", cls: "g" });
    if (!(await wait(250))) return;
    // Links land 160ms apart; the button comes back 800ms after the first one, as in the reference.
    for (let i = 0; i < LINKS.length; i++) {
      if (i && !(await wait(160))) return;
      print({ kind: "link", label: LINKS[i][0], href: LINKS[i][1] });
    }
    if (!(await wait(800 - 160 * (LINKS.length - 1)))) return;
    setMode("done");
  }, [path, reduce]);

  const reset = useCallback(() => {
    runId.current++;
    // A terminal link can hold focus here; it's about to go inert, so hand focus to the button.
    if (logRef.current?.contains(document.activeElement)) shipRef.current?.focus({ preventScroll: true });
    setMode("design");
  }, []);

  const onShip = useCallback(() => {
    if (modeRef.current === "design") void ship();
    else if (modeRef.current === "done") reset();
  }, [ship, reset]);

  // S runs it too: no modifier held, and not while typing into a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key !== "s" && e.key !== "S") || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const el = e.target as HTMLElement | null;
      if (el && (/^(input|textarea|select)$/i.test(el.tagName) || el.isContentEditable)) return;
      e.preventDefault();
      onShip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onShip]);

  // Leaving the page mid-run stops the printing.
  useEffect(
    () => () => {
      runId.current++;
    },
    [],
  );

  const inDesign = mode === "design";

  return (
    <>
      <div className="nf-hero">
        <span className="label">Error 404 · Not shipped</span>
        <h1>
          I designed this page. <span>I just never shipped it.</span>
        </h1>
        <p>
          You found a frame that never left Figma. Nothing lives at{" "}
          <code data-nf-path="" suppressHydrationWarning>
            {path}
          </code>{" "}
          yet, either the link is old or
          it’s still on my list.
        </p>
      </div>

      <div className="nf-stage" ref={stageRef} role="group" aria-label="A design canvas with an empty, unshipped page frame">
        <div className="nf-zoom" aria-hidden="true">
          <span>Page 404</span>
          <span>100%</span>
        </div>

        <div className={`nf-view${inDesign ? "" : " is-off"}`} inert={!inDesign}>
          <div className="nf-frame">
            <div className="nf-frame-in" aria-hidden="true">
              <div className="nf-sk-r">
                <i style={{ width: "18%" }} />
                <i style={{ width: "28%" }} />
              </div>
              <div className="nf-sk-h">
                <i style={{ width: "62%" }} />
                <i style={{ width: "40%", height: 9 }} />
              </div>
              <div className="nf-sk-g">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="nf-big" aria-hidden="true">
              404
            </div>
            <div className="nf-sel" aria-hidden="true">
              <b />
              <b />
              <b />
              <b />
            </div>
            <span className="nf-ftag">
              Frame ·{" "}
              <span data-nf-path="" suppressHydrationWarning>
                {path}
              </span>
            </span>
            <span className="nf-dims" aria-hidden="true">
              1440 × 404
            </span>
          </div>
          <div className={`nf-pin${pinOn || reduce ? " is-on" : ""}`} aria-hidden="true">
            <i>AO</i>
            <span>
              Still on my to-do list.<small>Ayo · just now</small>
            </span>
          </div>
          <div className="nf-cur" ref={curRef} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M5 3l14 8.2-6.2 1.3L10 19z" fill="#e2603a" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <em>Ayo</em>
          </div>
        </div>

        <div className={`nf-view${inDesign ? " is-off" : ""}`} inert={inDesign}>
          <div className="nf-term">
            <div className="nf-tbar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>~/waande.com</span>
            </div>
            <div className="nf-tlog" ref={logRef} aria-live="polite">
              {typed !== null && (
                <div>
                  <span className="p" aria-hidden="true">
                    $
                  </span>{" "}
                  <span aria-hidden="true">{typed}</span>
                  {typing ? <span className="nf-caret" aria-hidden="true" /> : <span className="nf-sr">{`ship ${path}`}</span>}
                </div>
              )}
              {lines.map((line, i) =>
                line.kind === "text" ? (
                  <div key={i} className={line.cls}>
                    {line.text}
                  </div>
                ) : (
                  <div key={i}>
                    {"  → "}
                    <a href={line.href}>{line.label}</a>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="nf-act">
        <button className="btn primary" ref={shipRef} type="button" onClick={onShip} disabled={mode === "running"}>
          {mode === "done" ? "Back to the canvas" : "Ship it anyway"}
        </button>
        <a className="btn" href="/">
          Take me home
        </a>
        <span className="nf-hint">or press S</span>
      </div>
    </>
  );
}
