"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { streakDays } from "@/components/about/chess-data";

/**
 * The chess-book diagram: the visitor plays white's first move, Ayo replies, and the
 * rest of the game happens on chess.com. A port of the reference script
 * (waande-chess-handoff/about-reference.html, "chess: the visitor plays white's first
 * move") and CHESS.md "Board rules". Deliberately tiny; it is not a chess engine.
 */

/** The streak count, corrected to the visitor's own calendar date once it's in the browser. */
export function StreakDays({ start, initial }: { start: string; initial: number }) {
  const [days, setDays] = useState(initial);
  useEffect(() => {
    const now = new Date();
    setDays(streakDays(start, now.getFullYear(), now.getMonth(), now.getDate()));
  }, [start]);
  return <span className="ch-n">{days}</span>;
}

type Position = Record<string, string>; // "e2" → "wP"

const FILES = "abcdefgh";
const BACK = "RNBQKBNR";
const NAME: Record<string, string> = { R: "rook", N: "knight", B: "bishop", Q: "queen", K: "king", P: "pawn" };
const SPRITE = "/about/chess-pieces.svg";

/** white's move → [black from, black to, annotation, comment] */
type Reply = [string, string, string, string];
const REPLY: Record<string, Reply> = {
  e4: ["e7", "e5", "!", "Classic."],
  d4: ["d7", "d5", "!", "Serious. I like it."],
  c4: ["e7", "e5", "!?", "The English. Fancy."],
  Nf3: ["g8", "f6", "", "Flexible. Respect."],
  f4: ["d7", "d5", "!?", "The Bird. Bold."],
  g4: ["d7", "d5", "?!", "Oh, you’re feeling brave."],
  b4: ["e7", "e5", "?!", "The Sokolsky? Okay then."],
  Nc3: ["d7", "d5", "", "Old school."],
  a3: ["e7", "e5", "?!", "Taking it slow, I see."],
  h4: ["d7", "d5", "?!", "Chaos. I respect it."],
  Nh3: ["d7", "d5", "?!", "A knight on the rim. Bold."],
  Na3: ["d7", "d5", "?!", "A knight on the rim. Bold."],
};
const DEFAULT_REPLY: Reply = ["e7", "e5", "", "Noted. Interesting choice."];

const SLIDE_MS = 340;
const THINK_MS = 1100;
const THINK_MS_REDUCED = 200;
const OVERLAY_DELAY_MS = 600;

function startPosition(): Position {
  const pos: Position = {};
  for (let i = 0; i < 8; i++) {
    pos[FILES[i] + "1"] = "w" + BACK[i];
    pos[FILES[i] + "2"] = "wP";
    pos[FILES[i] + "7"] = "bP";
    pos[FILES[i] + "8"] = "b" + BACK[i];
  }
  return pos;
}

/** White's legal first moves from a square: pawns one or two forward, knights to an empty square. */
function legalMoves(pos: Position, sq: string): string[] {
  const p = pos[sq];
  if (!p || p[0] !== "w") return [];
  const f = FILES.indexOf(sq[0]);
  const r = Number(sq[1]);
  const out: string[] = [];
  if (p[1] === "P") {
    const one = sq[0] + (r + 1);
    const two = sq[0] + (r + 2);
    if (!pos[one]) {
      out.push(one);
      if (r === 2 && !pos[two]) out.push(two);
    }
  }
  if (p[1] === "N") {
    for (const [df, dr] of [[1, 2], [-1, 2], [2, 1], [-2, 1]]) {
      const nf = f + df;
      const nr = r + dr;
      if (nf >= 0 && nf < 8 && nr <= 8 && !pos[FILES[nf] + nr]) out.push(FILES[nf] + nr);
    }
  }
  return out;
}

const SQUARES: string[] = [];
for (let r = 8; r >= 1; r--) for (let i = 0; i < 8; i++) SQUARES.push(FILES[i] + r);

export function ChessBoard({ challengeUrl }: { challengeUrl: string }) {
  const [pos, setPos] = useState<Position>(startPosition);
  const [sel, setSel] = useState<string | null>(null);
  const [last, setLast] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [caption, setCaption] = useState<ReactNode>("White to move.");
  const [overlay, setOverlay] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const finishRef = useRef<HTMLAnchorElement>(null);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Once the overlay is in the DOM, hand focus to "Finish the game ↗".
  useEffect(() => {
    if (overlay) finishRef.current?.focus({ preventScroll: true });
  }, [overlay]);

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const movesFrom = (sq: string) => (done || busy ? [] : legalMoves(pos, sq));
  const targets = sel ? movesFrom(sel) : [];

  /** Slide the piece on `from` to `to` (transform only), then run `then`. */
  const slide = (from: string, to: string, then: () => void) => {
    const board = boardRef.current;
    const piece = board?.querySelector<SVGElement>(`[data-sq="${from}"] .pc`);
    const target = board?.querySelector<HTMLElement>(`[data-sq="${to}"]`);
    if (!piece || !target || reduced()) {
      then();
      return;
    }
    const a = piece.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    piece.style.zIndex = "3";
    piece.style.transform = `translate(${b.left - a.left}px,${b.top - a.top}px)`;
    later(then, SLIDE_MS);
  };

  const move = (from: string, to: string) => {
    const piece = pos[from];
    setBusy(true);
    setSel(null);
    slide(from, to, () => {
      const afterWhite = { ...pos };
      delete afterWhite[from];
      afterWhite[to] = piece;
      setPos(afterWhite);
      setLast([from, to]);

      const san = (piece[1] === "P" ? "" : piece[1]) + to;
      const [rFrom, rTo, mark, comment] = REPLY[san] ?? DEFAULT_REPLY;
      setCaption(
        <>
          <span className="mono">1. {san}</span>ayowandee is thinking…
        </>,
      );

      later(() => {
        slide(rFrom, rTo, () => {
          const black = afterWhite[rFrom];
          const afterBlack = { ...afterWhite };
          delete afterBlack[rFrom];
          afterBlack[rTo] = black;
          setPos(afterBlack);
          setLast([rFrom, rTo]);
          setDone(true);
          setBusy(false);
          const rsan = (black[1] === "P" ? "" : black[1]) + rTo;
          setCaption(
            <>
              <span className="mono">
                1. {san}
                {mark} {rsan}
              </span>
              <em>{comment}</em>
            </>,
          );
          later(() => setOverlay(true), reduced() ? 0 : OVERLAY_DELAY_MS);
        });
      }, reduced() ? THINK_MS_REDUCED : THINK_MS);
    });
  };

  const onSquare = (id: string) => {
    if (done || busy) return;
    if (sel && targets.includes(id)) {
      move(sel, id);
      return;
    }
    // The square button stays mounted across renders, so focus stays on it.
    setSel(movesFrom(id).length && sel !== id ? id : null);
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPos(startPosition());
    setSel(null);
    setLast([]);
    setBusy(false);
    setDone(false);
    setOverlay(false);
    setCaption("White to move.");
    // The Reset button is about to disappear; keep keyboard focus on the board.
    boardRef.current?.querySelector<HTMLElement>('[data-sq="e2"]')?.focus({ preventScroll: true });
  };

  return (
    <figure className="dg">
      {/* Pieces: the "cburnett" set by Colin M.L. Burnett (free licence: GPLv2+/BSD/GFDL), the set used by
          Lichess and Wikipedia. Sprite with the credit comment: public/about/chess-pieces.svg */}
      <figcaption className="dg-head mono">
        <span>Guest – ayowandee</span>
        <span>Rapid · 10 min</span>
      </figcaption>
      <div className="dg-board">
        <div className="dg-rk mono" aria-hidden="true">
          {[8, 7, 6, 5, 4, 3, 2, 1].map((r) => (
            <i key={r}>{r}</i>
          ))}
        </div>
        <div className="bd-wrap">
          <div
            className="bd"
            ref={boardRef}
            role="grid"
            aria-label="Chessboard. You play white. Pick a pawn or knight, then a square."
          >
            {SQUARES.map((id) => {
              const p = pos[id];
              // a1 is dark: file index 0 + rank 1 is odd
              const dark = (FILES.indexOf(id[0]) + Number(id[1])) % 2 === 1 ? " d" : "";
              const isTarget = targets.includes(id);
              const cls =
                "sq" +
                dark +
                (p && movesFrom(id).length ? " can" : "") +
                (sel === id ? " sel" : "") +
                (isTarget ? " tgt" : "") +
                (last.includes(id) ? " last" : "");
              const label =
                id +
                (p ? `, ${p[0] === "w" ? "white" : "black"} ${NAME[p[1]]}` : "") +
                (isTarget ? ", move here" : "");
              return (
                <button key={id} type="button" className={cls} data-sq={id} aria-label={label} onClick={() => onSquare(id)}>
                  {p && (
                    <svg key={`${p}-${id}`} className="pc" viewBox="0 0 45 45" aria-hidden="true" focusable="false">
                      <use href={`${SPRITE}#cp-${p}`} />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
          <div className="dg-after" hidden={!overlay}>
            <p>That’s as far as this board goes. The rest of the game is on chess.com.</p>
            <div className="dg-btns">
              <a className="btn primary" href={challengeUrl} target="_blank" rel="noopener" ref={finishRef}>
                Finish the game ↗
              </a>
              <button className="btn" type="button" onClick={reset}>
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="dg-fl mono" aria-hidden="true">
          {[..."abcdefgh"].map((f) => (
            <i key={f}>{f}</i>
          ))}
        </div>
      </div>
      <p className="dg-foot" aria-live="polite">
        {caption}
      </p>
    </figure>
  );
}
