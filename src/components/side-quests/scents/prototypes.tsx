"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { CardArt, naira, Photo } from "./art";
import { CUTOUT, ITEMS } from "./catalogue";

/**
 * Figs 9 and 10: the next two pieces, prototyped but not shipped. Flip a flag to true only
 * once that feature is live on scentsbybiba; the "Prototype · not live" badge goes with it.
 * (The copy around them says "Neither is live yet", so update it in the same change.)
 */
export const LIVE = { priceSheet: false, agent: false } as const;

/** The figure shell for a prototype: the badge sits on the frame until the feature ships. */
export function ConceptFigure({ live, n, caption, children }: { live: boolean; n: number; caption: string; children: ReactNode }) {
  return (
    <figure className={live ? "sb-fig" : "sb-fig sb-concept"}>
      {!live && <span className="sb-badge">Prototype · not live</span>}
      {children}
      <figcaption>
        <b>Fig. {n}</b>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

const RAMZ = ITEMS.find((i) => i.s === "ramz-silver-lattafa")!;
type Stock = "Yes" | "Sold out" | "Order-in";

/** Fig. 9: Biba edits a row in a Google Sheet; the site "rebuilds" a second later. */
export function PriceSheet() {
  const [price, setPrice] = useState(String(RAMZ.p));
  const [stock, setStock] = useState<Stock>("Yes");
  const [live, setLive] = useState({ p: RAMZ.p, stock: "Yes" as Stock });
  const [status, setStatus] = useState("Edit the price or stock on the left");
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setStatus("Sheet saved · rebuilding the site…");
    const p = parseInt(price.replace(/\D/g, ""), 10) || 0;
    const t = setTimeout(() => {
      setLive({ p, stock });
      setStatus("Live on scentsbybiba · just now");
    }, 1100);
    return () => clearTimeout(t);
  }, [price, stock]);

  const tag = live.stock === "Yes" ? "In the boutique" : live.stock === "Sold out" ? "Sold out" : "Order-in";

  return (
    <div className="sb-frame sb-sheet">
      <div className="sb-gs">
        <div className="sb-gs-title">
          <i aria-hidden="true" />
          Scents by Biba stock · <span className="mono">Google Sheets</span>
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">Perfume</th>
              <th scope="col">Price (₦)</th>
              <th scope="col">On the shelf</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>Ramz Silver</span>
              </td>
              <td>
                <input value={price} inputMode="numeric" aria-label="Ramz Silver price in naira" onChange={(e) => setPrice(e.target.value)} />
              </td>
              <td>
                <select aria-label="Ramz Silver on the shelf" value={stock} onChange={(e) => setStock(e.target.value as Stock)}>
                  <option>Yes</option>
                  <option>Sold out</option>
                  <option>Order-in</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><span>Angham</span></td>
              <td><span>40000</span></td>
              <td><span>Yes</span></td>
            </tr>
            <tr>
              <td><span>Khamrah Waha</span></td>
              <td><span>48000</span></td>
              <td><span>Yes</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="sb-gs-live sb-shop" aria-label="The product card on the site" role="group">
        <div className="sb-art" style={{ "--glow": "#f6dcb6", opacity: live.stock === "Sold out" ? 0.45 : 1 } as CSSProperties}>
          <span className="sb-tag">{tag}</span>
          <CardArt art={RAMZ.art} />
        </div>
        <div className="sb-name">Ramz Silver</div>
        <div className="sb-price">
          {live.stock === "Order-in" ? "About " : ""}
          {naira(live.p)}
        </div>
        <div className="sb-gs-status" role="status">
          {status}
        </div>
      </div>
    </div>
  );
}

const STEP_TEXT = [
  "Step 1 of 4. Biba posts a restock on Instagram, the way she does today.",
  "Step 2 of 4. The agent reads the caption and the photo, and matches them to a perfume in the catalogue.",
  "Step 3 of 4. Nothing goes public on its own: Biba gets one WhatsApp question and taps yes.",
  "Step 4 of 4. The site updates. Her Instagram stays the source of truth, without retyping anything.",
];

/** Fig. 10: Instagram post → agent reads it → Biba approves in WhatsApp → live. One button steps through. */
export function AgentStepper() {
  const [k, setK] = useState(0);
  const on = (i: number) => (i <= k ? "sb-step is-on" : "sb-step");
  return (
    <div className="sb-frame sb-agent">
      <ol className="sb-steps">
        <li className={on(0)}>
          <h3>01 · She posts</h3>
          <div className="sb-ig">
            <div className="sb-ig-h">
              <i aria-hidden="true" />
              scentsbybiba_
            </div>
            <div className="sb-ig-img">
              <Photo img={CUTOUT} alt="Ramz Silver bottle" />
            </div>
            <p>
              <b>scentsbybiba_</b> Restocked! Ramz Silver is back, ₦25k. DM or order on the site 🖤
            </p>
          </div>
        </li>
        <li className={on(1)}>
          <h3>02 · The agent reads it</h3>
          <dl className="sb-kv">
            <dt>Perfume</dt>
            <dd>Ramz Silver, Lattafa</dd>
            <dt>Price</dt>
            <dd>{naira(RAMZ.p)}</dd>
            <dt>Stock</dt>
            <dd>On the shelf</dd>
            <dt>Photo</dt>
            <dd>from the post</dd>
          </dl>
          <span className="sb-conf">● matched to catalogue {RAMZ.r}</span>
        </li>
        <li className={on(2)}>
          <h3>03 · She approves</h3>
          <div className="sb-wa-ask">New post looks like a restock of Ramz Silver at {naira(RAMZ.p)}. Put it on the site as in stock?</div>
          <div className="sb-wa-btns" aria-hidden="true">
            <span className="yes">Yes, publish</span>
            <span>Edit</span>
          </div>
        </li>
        <li className={on(3)}>
          <h3>04 · It’s live</h3>
          <div className="sb-art sb-shop" style={{ "--glow": "#f6dcb6", backgroundColor: "var(--s-ivory)" } as CSSProperties}>
            <Photo img={CUTOUT} />
          </div>
          <span className="sb-conf">● In the boutique · {naira(RAMZ.p)}</span>
          <span className="sb-step-note">updated right after her yes</span>
        </li>
      </ol>
      <div className="sb-ag-ctl">
        <p aria-live="polite">{STEP_TEXT[k]}</p>
        <button className="btn" type="button" onClick={() => setK((x) => (x + 1) % 4)}>
          {k === 3 ? "Start again ↺" : "Next step →"}
        </button>
      </div>
    </div>
  );
}
