"use client";

import { useState } from "react";

import { BagIcon, CardArt, glowFor, glowStyle, naira, TickIcon } from "./art";
import { ITEMS } from "./catalogue";

/**
 * Fig. 7: the same four cards, before (two text buttons each, wrapping at phone width) and
 * after (one quick add on the photo). The "before" buttons are a picture of the old cards,
 * so they're text, not controls; the "after" quick adds toggle.
 */
const PICKS = ["ramz-silver-lattafa", "angham-lattafa", "khamrah-waha-lattafa", "island-fresh-khadlaj-island-series"].map(
  (s) => ITEMS.find((i) => i.s === s)!,
);

export function BeforeAfter() {
  const [after, setAfter] = useState(false);
  const [added, setAdded] = useState<Set<string>>(() => new Set());

  return (
    <div className="sb-frame sb-ba sb-shop">
      <div className="sb-seg-wrap">
        <div className="sb-seg" role="group" aria-label="Compare the cards">
          <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>
            Before
          </button>
          <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>
            After
          </button>
        </div>
      </div>
      <ul className="sb-ba-grid" role="list">
        {PICKS.map((i) => {
          const on = added.has(i.s);
          return (
            <li key={i.s}>
              <div className="sb-art" style={glowStyle(glowFor(i))}>
                <CardArt art={i.art} />
                {after && (
                  <button
                    type="button"
                    className={on ? "sb-add is-on" : "sb-add"}
                    aria-pressed={on}
                    aria-label={`Add ${i.n} to bag`}
                    onClick={() =>
                      setAdded((s) => {
                        const n = new Set(s);
                        if (on) n.delete(i.s);
                        else n.add(i.s);
                        return n;
                      })
                    }
                  >
                    {on ? <TickIcon /> : <BagIcon />}
                  </button>
                )}
              </div>
              <div className="sb-name">{i.n}</div>
              <div className="sb-price">{naira(i.p)}</div>
              {!after && (
                <div className="sb-ctas">
                  <span>Order on WhatsApp</span>
                  <span>Add to bag</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="sb-ba-note" aria-live="polite">
        {after ? "One quick add on the photo. WhatsApp lives on the product page." : "Two text buttons per card, wrapping at phone width."}
      </p>
    </div>
  );
}
