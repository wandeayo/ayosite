"use client";

import { useEffect, useState } from "react";

import { CardArt, naira, priceText, stockTag } from "./art";
import { DUPES } from "./catalogue";

/**
 * Fig. 4: pick a designer favourite; see its price beside the closest perfume in the shop
 * and the three cheapest alternatives. Every number is the catalogue's (catalogue.ts).
 * The bars grow from zero on each pick, as on the reference; the values are in the text.
 */
const FIRST = Math.max(0, DUPES.findIndex((d) => d.page === "mfk-baccarat-rouge-540"));

export function DupeGuide() {
  const [k, setK] = useState(FIRST);
  const [grown, setGrown] = useState(false);
  const d = DUPES[k];
  const cheapest = Math.min(...d.alts.map((a) => a.p));
  const max = d.orig.p;

  // Start the bars at zero, then let them grow on the next frames (no motion under reduced motion: home.css).
  useEffect(() => {
    setGrown(false);
    let b = 0;
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setGrown(true));
    });
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, [k]);

  return (
    <div className="sb-frame sb-dupe sb-shop">
      <div className="sb-pick" role="group" aria-label="Pick a designer perfume">
        {DUPES.map((g, i) => (
          <button key={g.page} type="button" aria-pressed={i === k} onClick={() => setK(i)}>
            {g.like}
          </button>
        ))}
      </div>
      <dl className="sb-dprice">
        <div className="sb-dp-row">
          <dt>
            {d.orig.n}, {d.orig.b}
          </dt>
          <dd className="sb-dp-bar" aria-hidden="true">
            <i style={{ width: grown ? "100%" : 0 }} />
          </dd>
          <dd>
            <b>About {naira(max)}</b>
          </dd>
        </div>
        <div className="sb-dp-row">
          <dt>Closest in the shop</dt>
          <dd className="sb-dp-bar alt" aria-hidden="true">
            <i style={{ width: grown ? `${Math.max(1.5, (cheapest / max) * 100)}%` : 0 }} />
          </dd>
          <dd>
            <b>from {naira(cheapest)}</b>
          </dd>
        </div>
      </dl>
      <p className="sb-save" aria-live="polite">
        {Math.round((1 - cheapest / max) * 100)}% less, for the same mood.
      </p>
      <ul className="sb-grid sb-dupe-grid" role="list" aria-label={`In the shop, like ${d.like}`}>
        {d.alts.map((a) => (
          <li key={a.s}>
            <div className="sb-art">
              <span className="sb-tag">{stockTag(a)}</span>
              <CardArt art={a.art} />
            </div>
            <div className="sb-name">{a.n}</div>
            <div className="sb-why">{a.b || " "}</div>
            <div className="sb-price">{priceText(a)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
