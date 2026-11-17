"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

import { runCommand, type Line } from "./commands";
import { decodePath, displayPath, FALLBACK_KIND, FALLBACK_PATH, kindFor } from "./path";
import { suggest, TERMINAL_LINKS } from "./routes";
import { FrameSkeletons } from "./skeletons";

/*
 * The 404's hero, canvas and actions (waande-404-handoff/reference/404.html). Strings and
 * timings are the reference's. The requested path is only ever rendered as React text,
 * never as HTML (see path.ts for how it reaches the prerendered page).
 *
 * On top of the reference:
 *  - "did you mean": the closest real page leads the terminal's links (routes.ts);
 *  - the frame's skeleton guesses what the page would have been (path.ts, skeletons.tsx);
 *  - a mouse over the canvas becomes a "You" cursor, and Ayo's cursor comes over to chat;
 *  - once the log has printed, the terminal takes commands (commands.ts).
 * Also: one cursor loop at a time, S is ignored while the terminal prints, and the hidden
 * view is inert.
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

/** What Ayo says over cursor chat while a visitor's cursor is on the canvas, and when. */
const CHAT: readonly (readonly [number, string])[] = [
  [1100, "oh, hi 👋"],
  [3400, "this page isn’t built yet"],
  [6200, "press S. I dare you"],
];
const BYE = "bye 👋";
/** How often Ayo's cursor re-aims at the visitor's while following. */
const FOLLOW_MS = 700;

type Mode = "design" | "running" | "done";

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), Math.max(lo, hi));

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

function LogLine({ line }: { line: Line }) {
  if (line.kind === "echo")
    return (
      <div>
        <span className="p">$</span> {line.text}
      </div>
    );
  if (line.kind === "text") return <div className={line.cls}>{line.text}</div>;
  return (
    <div className={line.cls}>
      {line.before}
      <a href={line.href}>{line.label}</a>
      {line.after}
    </div>
  );
}

export function NotShipped() {
  // false while hydrating, so the first client render matches the prerendered HTML.
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);
  const pathname = usePathname();
  const path = hydrated ? displayPath(pathname) : FALLBACK_PATH;
  const kind = useMemo(() => (hydrated ? kindFor(pathname) : FALLBACK_KIND), [hydrated, pathname]);
  const suggestion = useMemo(() => (hydrated ? suggest(decodePath(pathname)) : null), [hydrated, pathname]);
  const reduce = usePrefersReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<Mode>("design");
  const [visible, setVisible] = useState(false);
  const [pinOn, setPinOn] = useState(false);
  const [typed, setTyped] = useState<string | null>(null); // null: no command line yet
  const [typing, setTyping] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [visitor, setVisitor] = useState(false); // a mouse is over the canvas
  const [chat, setChat] = useState<string | null>(null);

  /** Bumped on every run and reset; a run that sees a newer id stops printing. */
  const runId = useRef(0);
  const modeRef = useRef<Mode>("design");
  modeRef.current = mode;
  const visitorRef = useRef(false);
  const youPos = useRef({ x: 0, y: 0 });
  const byeTimer = useRef(0);
  const navTimer = useRef(0);
  const history = useRef<string[]>([]);
  const historyAt = useRef(0);

  // The loop only runs while at least 30% of the canvas is on screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting), { threshold: 0.3 });
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  // Ayo's cursor drifts around the frame and leaves a comment. The effect owns the loop,
  // so leaving the design view, a visitor arriving, scrolling away or unmounting stops it.
  useEffect(() => {
    if (mode !== "design" || !visible || reduce || visitor) return;
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
  }, [mode, visible, reduce, visitor]);

  // A visitor's cursor is on the canvas: Ayo's comes over, keeps a polite distance, and chats.
  useEffect(() => {
    if (mode !== "design" || reduce || !visitor) return;
    const stage = stageRef.current;
    const cur = curRef.current;
    if (!stage || !cur) return;
    cur.classList.add("is-follow");
    const place = () => {
      const { x: vx, y: vy } = youPos.current;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      // Down and to the left of the visitor; to the right or above when there's no room.
      const x = vx - 130 < 12 ? vx + 80 : vx - 130;
      const y = vy + 60 > h - 64 ? vy - 90 : vy + 60;
      cur.style.transform = `translate(${clamp(x, 12, w - 120)}px,${clamp(y, 28, h - 64)}px)`;
    };
    place();
    const follow = window.setInterval(place, FOLLOW_MS);
    const lines = CHAT.map(([ms, text]) => window.setTimeout(() => setChat(text), ms));
    return () => {
      window.clearInterval(follow);
      lines.forEach(window.clearTimeout);
      cur.classList.remove("is-follow");
    };
  }, [mode, reduce, visitor]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduce || modeRef.current !== "design") return;
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    youPos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    // The arrow's tip is 4px in and 2.5px down its 20px box.
    if (youRef.current) youRef.current.style.transform = `translate(${youPos.current.x - 4}px,${youPos.current.y - 2.5}px)`;
    if (!visitorRef.current) {
      visitorRef.current = true;
      window.clearTimeout(byeTimer.current);
      setChat(null);
      setVisitor(true);
    }
  };

  const onPointerLeave = () => {
    if (!visitorRef.current) return;
    visitorRef.current = false;
    setVisitor(false);
    // Only say bye if there was a conversation.
    setChat((c) => (c ? BYE : null));
    byeTimer.current = window.setTimeout(() => setChat(null), 1600);
  };

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

    visitorRef.current = false;
    setVisitor(false);
    setChat(null);
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
    if (suggestion) {
      print({ kind: "link", cls: "g", before: "↳ nothing to ship here. did you mean ", label: suggestion, href: suggestion, after: "?" });
      if (!(await wait(250))) return;
      print({ kind: "text", text: "  or try one of these:", cls: "m" });
    } else {
      print({ kind: "text", text: "↳ nothing to ship here. try one of these instead:", cls: "g" });
    }
    if (!(await wait(250))) return;
    // Links land 160ms apart; the button comes back 800ms after the first one, as in the reference.
    const links = TERMINAL_LINKS.filter((l) => l.href !== suggestion);
    for (let i = 0; i < links.length; i++) {
      if (i && !(await wait(160))) return;
      print({ kind: "link", before: "  → ", label: links[i].label, href: links[i].href });
    }
    if (!(await wait(800 - 160 * (links.length - 1)))) return;
    setMode("done");
  }, [path, reduce, suggestion]);

  const reset = useCallback(() => {
    runId.current++;
    window.clearTimeout(navTimer.current);
    // A terminal link or the prompt can hold focus here; it's about to go inert, so hand focus to the button.
    if (logRef.current?.contains(document.activeElement)) shipRef.current?.focus({ preventScroll: true });
    setMode("design");
  }, []);

  const onShip = useCallback(() => {
    if (modeRef.current === "design") void ship();
    else if (modeRef.current === "done") reset();
  }, [ship, reset]);

  // S runs it too: no modifier held, and not while typing into a field (the prompt included).
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

  // Leaving the page mid-run stops the printing and any pending timers.
  useEffect(
    () => () => {
      runId.current++;
      window.clearTimeout(byeTimer.current);
      window.clearTimeout(navTimer.current);
    },
    [],
  );

  // The hidden command line.
  const onCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (!input) return;
    const value = input.value;
    input.value = "";
    if (value.trim()) history.current.push(value);
    historyAt.current = history.current.length;

    const { lines: out, effect } = runCommand(value, { path });
    if (effect?.type === "exit") return reset();
    if (effect?.type === "clear") {
      setTyped(null);
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, { kind: "echo", text: value }, ...out]);
    if (effect?.type === "navigate") {
      const { href } = effect;
      navTimer.current = window.setTimeout(() => window.location.assign(href), reduce ? 0 : 500);
    }
  };

  // Up and down walk back through what was typed, as in a shell.
  const onPromptKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    const h = history.current;
    if (!h.length) return;
    e.preventDefault();
    historyAt.current = clamp(historyAt.current + (e.key === "ArrowUp" ? -1 : 1), 0, h.length);
    e.currentTarget.value = h[historyAt.current] ?? "";
  };

  // Clicking the log focuses the prompt, as a terminal does (not when clicking a link or selecting text).
  const onLogClick = (e: React.MouseEvent) => {
    if (mode !== "done" || (e.target as HTMLElement).closest("a")) return;
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  };

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
          yet, either the link is old or it’s still on my list.
        </p>
      </div>

      <div
        className={`nf-stage${visitor ? " is-you" : ""}`}
        ref={stageRef}
        role="group"
        aria-label="A design canvas with an empty, unshipped page frame"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className="nf-zoom" aria-hidden="true">
          <span>Page 404</span>
          <span>100%</span>
        </div>

        <div className={`nf-view${inDesign ? "" : " is-off"}`} inert={!inDesign}>
          <div className="nf-frame" data-nf-frame="" data-kind={kind.kind} suppressHydrationWarning>
            <div className="nf-frame-in" aria-hidden="true">
              <FrameSkeletons />
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
              <span data-nf-kind="" suppressHydrationWarning>
                {kind.label}
              </span>
              {" · "}
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
            {chat && (
              <span className="nf-chat" key={chat}>
                {chat}
              </span>
            )}
          </div>
          <div className="nf-you" ref={youRef} hidden={!visitor} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M5 3l14 8.2-6.2 1.3L10 19z" fill="#7b61ff" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <em>You</em>
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
            {/* onClick is a mouse convenience (focus the prompt); keyboard users reach it by Tab. */}
            <div className="nf-tlog" ref={logRef} aria-live="polite" onClick={onLogClick}>
              {typed !== null && (
                <div>
                  <span className="p" aria-hidden="true">
                    $
                  </span>{" "}
                  <span aria-hidden="true">{typed}</span>
                  {typing ? <span className="nf-caret" aria-hidden="true" /> : <span className="nf-sr">{`ship ${path}`}</span>}
                </div>
              )}
              {lines.map((line, i) => (
                <LogLine key={i} line={line} />
              ))}
              {mode === "done" && (
                <form className="nf-prompt" onSubmit={onCommand}>
                  <span className="p" aria-hidden="true">
                    $
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    aria-label="Terminal command. Type help for a list."
                    placeholder="type help"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    enterKeyHint="send"
                    maxLength={80}
                    onKeyDown={onPromptKey}
                  />
                </form>
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
        {suggestion && (
          <span className="nf-dym">
            Did you mean <a href={suggestion}>{suggestion}</a>?
          </span>
        )}
      </div>
    </>
  );
}
