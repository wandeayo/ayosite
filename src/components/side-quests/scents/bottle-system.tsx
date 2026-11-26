"use client";

import { useId, useState } from "react";

import { Bottle } from "./art";

/**
 * Fig. 6: eight silhouettes, 26 liquids and five metal caps, picked from a perfume's name.
 * Type a name and the colour words in it repaint the row; tap a bottle to cycle its liquid.
 *
 * One fix to the reference: it let "oud" overwrite every bottle that "rose" had turned pink,
 * so with its own default name the pink its caption promises never appeared. Here every
 * colour word read (and "oud") takes its turn across the row.
 */

const SHAPES = ["flacon", "orb", "column", "oud", "block", "disc", "tall", "mini"];
const LIQ = ["amber", "honey", "gold", "orange", "pink", "blush", "red", "burgundy", "navy", "blue", "aqua", "green", "purple", "black", "smoke", "white", "clear", "brown", "cream", "fresh", "sweet", "floral", "fruity", "woody", "oud", "musky"];
const METALS = ["gold", "noir", "silver", "rose", "ivory"];

/** [colour words, liquid, cap] */
const NAME: ReadonlyArray<readonly [RegExp, string, string]> = [
  [/\b(black|aswad|noir|nuit|night|midnight|layl)\b/, "black", "noir"],
  [/\b(red|rouge|cherry|scarlet|apple)\b/, "red", "gold"],
  [/\b(pink|rose|blush|kiss)\b/, "pink", "rose"],
  [/\b(blue|bleu|ocean|aqua|sea)\b/, "blue", "silver"],
  [/\b(white|blanc|abiyad|abyad|snow)\b/, "white", "ivory"],
  [/\b(silver)\b/, "smoke", "silver"],
  [/\b(gold|golden|dhahab)\b/, "gold", "gold"],
  [/\b(green|mint|leaf)\b/, "green", "gold"],
  [/\b(brown|tobacco|coffee|qahwa|chocolate)\b/, "brown", "noir"],
  [/\b(purple|amethyst|violet|viola|lavender)\b/, "purple", "silver"],
  [/\b(orange|mandarin)\b/, "orange", "gold"],
  [/\b(vanilla|cream|creamy|milk)\b/, "cream", "gold"],
];

function read(name: string) {
  const n = name.toLowerCase();
  const hits = NAME.flatMap(([re, liq, cap]) => {
    const m = n.match(re);
    return m ? [{ word: m[1], liq, cap }] : [];
  });
  if (/\boud\b/.test(n)) hits.push({ word: "oud", liq: "oud", cap: "gold" });
  // A night word sets every cap to noir, as on the reference.
  const noir = hits.some((h) => h.cap === "noir");
  const base = SHAPES.map((shape, k) => {
    const h = hits[k % (hits.length || 1)];
    return {
      shape,
      liq: h ? h.liq : LIQ[(k * 5) % LIQ.length],
      cap: noir ? "noir" : h ? h.cap : METALS[k % METALS.length],
    };
  });
  return { base, words: hits.map((h) => h.word) };
}

const DEFAULT_NAME = "Midnight Rose Oud";

export function BottleSystem() {
  const id = useId();
  const [name, setName] = useState(DEFAULT_NAME);
  /** Taps per bottle since the name last changed: each moves its liquid one step. */
  const [taps, setTaps] = useState<number[]>(() => SHAPES.map(() => 0));
  const { base, words } = read(name);
  const bottles = base.map((b, k) => ({ ...b, liq: LIQ[(LIQ.indexOf(b.liq) + taps[k]) % LIQ.length] }));

  return (
    <div className="sb-frame sb-bottles sb-shop">
      <div className="sb-b-row" role="group" aria-label="The eight bottle shapes">
        {bottles.map((b, k) => (
          <button
            key={b.shape}
            type="button"
            aria-label={`${b.shape} bottle, ${b.liq} liquid, ${b.cap} cap. Change the liquid`}
            onClick={() => setTaps((t) => t.map((n, i) => (i === k ? n + 1 : n)))}
          >
            <span className="sb-bx">
              <Bottle spec={{ shape: b.shape, liq: `liq-${b.liq}`, cap: `g-${b.cap}` }} className="sb-b" />
            </span>
            {b.shape}
          </button>
        ))}
      </div>
      <div className="sb-b-ctl">
        <label htmlFor={`${id}-n`}>
          Type a perfume name
          <input
            id={`${id}-n`}
            value={name}
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
              setTaps(SHAPES.map(() => 0));
            }}
          />
        </label>
        <output htmlFor={`${id}-n`}>{words.length ? `read: ${words.join(", ")}` : "no colour words: falls back to the scent family"}</output>
      </div>
    </div>
  );
}
