"use client";

import { useId, useMemo, useState } from "react";

import { BagIcon, CardArt, glowFor, glowStyle, lagosTime, naira, priceText, stockTag, TickIcon } from "./art";
import { ITEMS, type Perfume } from "./catalogue";

/**
 * Fig. 1: the whole product in one frame. A port of the reference's search: it reads a
 * budget, scent families, an occasion, who it's for and "long-lasting" from plain words,
 * scores the 24 perfumes, and never returns nothing. The bag writes the WhatsApp order.
 *
 * Accessibility, beyond the reference: the bag button's name says how many are in the bag
 * (pressing it again adds another, so it isn't a toggle), each add is announced, and the
 * send button stays focusable (aria-disabled) so focus isn't lost when it disables itself.
 */

const DEFAULT_QUERY = "something sweet for my wife, under 30k";
const CHIPS = ["oud for a wedding", "fresh for the hot weather, under 20k", "a gift for him", "chocolate"];

const FAM: Record<string, string[]> = {
  sweet: ["sweet", "gourmand", "vanilla", "caramel", "creamy"], vanilla: ["vanilla"], oud: ["oud", "woody", "amber"],
  fresh: ["fresh", "citrus", "clean"], floral: ["floral", "rose"], rose: ["rose", "floral"], fruity: ["fruity", "cherry"],
  chocolate: ["chocolate", "gourmand"], spicy: ["spicy", "amber"], woody: ["woody"], musky: ["musky"], caramel: ["caramel"], citrus: ["citrus"],
};
const OCC: Record<string, string> = {
  wedding: "Weddings|Evening", weddings: "Weddings|Evening", party: "Evening", night: "Evening", evening: "Evening",
  work: "Office", office: "Office", date: "Dates", hot: "Hot weather", heat: "Hot weather", sun: "Hot weather",
  everyday: "Everyday", daily: "Everyday", gift: "Gifts",
};

interface Parsed {
  budget: number | null;
  fam: string[];
  occ: string[];
  who: "Women" | "Men" | null;
  lasting: boolean;
  any: boolean;
}

function parse(raw: string): Parsed {
  const q = raw.toLowerCase();
  const m = q.match(/(?:under|below|less than|max|within|budget)\s*₦?\s*([\d,.]+)\s*(k)?/) || q.match(/₦\s*([\d,.]+)\s*(k)?/) || q.match(/\b(\d+)\s*k\b/);
  let budget: number | null = null;
  if (m) {
    budget = parseFloat(m[1].replace(/,/g, ""));
    if (m[2] || budget < 1000) budget *= 1000;
  }
  const fam = Object.keys(FAM).filter((k) => q.includes(k));
  const occ = Object.keys(OCC).filter((k) => new RegExp("\\b" + k).test(q)).map((k) => OCC[k]);
  const who = /\b(wife|her|woman|women|girlfriend|girl|mum|mother|sister|she)\b/.test(q)
    ? "Women"
    : /\b(husband|him|man|men|boyfriend|dad|father|brother|he)\b/.test(q)
      ? "Men"
      : null;
  const lasting = /last|long|strong/.test(q);
  return { budget, fam, occ, who, lasting, any: Boolean(budget || fam.length || occ.length || who || lasting) };
}

function score(i: Perfume, p: Parsed): { s: number; why: string } {
  let s = 0;
  const why: string[] = [];
  const f = i.fl.toLowerCase();
  for (const k of p.fam) {
    if (FAM[k].some((w) => f.includes(w))) {
      s += 3;
      why.push(i.fl.split(" · ").slice(0, 2).join(" & ").toLowerCase());
    }
  }
  for (const o of p.occ) {
    const re = new RegExp(o);
    const hit = i.o.find((x) => re.test(x));
    if (hit) {
      s += 2;
      why.push("for " + hit.toLowerCase());
    }
  }
  if (p.who) {
    if (i.g === p.who) {
      s += 2;
      why.push(p.who === "Women" ? "for her" : "for him");
    } else if (i.g === "Unisex") s += 1;
    else s -= 3;
  }
  if (p.budget) {
    if (i.p <= p.budget) {
      s += 2;
      why.push("under " + naira(p.budget));
    } else s -= 4;
  }
  if (p.lasting && i.lo >= 3) {
    s += 1;
    why.push("long-lasting");
  }
  if (i.a === "in") s += 0.5;
  return { s, why: [...new Set(why)].slice(0, 2).join(" · ") };
}

/** The assorted minis are a gift add-on, not a search answer. */
const SEARCHABLE = ITEMS.filter((i) => i.s !== "mini-perfume-assorted");

function search(q: string) {
  const p = parse(q);
  const top = SEARCHABLE.map((i) => ({ i, ...score(i, p) }))
    .sort((a, b) => b.s - a.s || a.i.p - b.i.p)
    .slice(0, 3);
  const exact = p.any && top[0].s >= 3;
  const note = !p.any ? "Popular in the boutique right now." : exact ? `Biba’s picks for “${q.trim()}”` : "Nothing matches all of that, so here are the closest three.";
  return { top, note };
}

interface Line {
  i: Perfume;
  q: number;
  from: string;
}

function orderMessage(lines: Line[], city: string): string {
  const items = lines.map(({ i, q }, k) => {
    const brand = i.b ? ` by ${i.b}` : "";
    const size = i.z ? ` (${i.z}ml)` : "";
    return `${k + 1}. ${i.n}${brand}${size}${q > 1 ? " x" + q : ""}: ${priceText(i)}${q > 1 ? " each" : ""}. Ref ${i.r}`;
  });
  const total = lines.reduce((t, { i, q }) => t + i.p * q, 0);
  const est = lines.some(({ i }) => i.a !== "in") ? "About " : "";
  const searched = lines.find((x) => x.from)?.from;
  return [
    "Hi Biba, I’d like to order these from your website:",
    searched ? `(I searched for “${searched}”.)` : null,
    "",
    ...items,
    "",
    `Estimated total: ${est}${naira(total)}`,
    city ? `Deliver to: ${city}` : null,
    "Please confirm stock, the final total and delivery. Thank you!",
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export function SearchDemo() {
  const ids = useId();
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [run, setRun] = useState({ q: DEFAULT_QUERY, n: 0 });
  const [bag, setBag] = useState<Line[]>([]);
  const [city, setCity] = useState("");
  const [sent, setSent] = useState<null | string>(null);
  const [status, setStatus] = useState("");

  const { top, note } = useMemo(() => search(run.q), [run.q]);
  const count = bag.reduce((n, x) => n + x.q, 0);

  const go = (q: string) => {
    setQuery(q);
    setRun((r) => ({ q, n: r.n + 1 }));
  };

  const add = (i: Perfume) => {
    const had = bag.find((x) => x.i.s === i.s);
    const next = had
      ? bag.map((x) => (x.i.s === i.s ? { ...x, q: Math.min(x.q + 1, 9) } : x))
      : [...bag, { i, q: 1, from: run.q.trim() }];
    setBag(next);
    setSent(null);
    const n = next.reduce((t, x) => t + x.q, 0);
    setStatus(`Added ${i.n}. ${n} in the bag; the WhatsApp order is updated.`);
  };

  const send = () => {
    if (!count || sent) return;
    setSent(lagosTime());
    setStatus("Order sent to Biba on WhatsApp.");
  };

  const disabled = !count || !!sent;

  return (
    <div className="sb-frame sb-demo sb-shop">
      <div className="sb-site">
        <p className="sb-ask" id={`${ids}-ask`}>
          Describe the scent you’re looking for
        </p>
        <form
          className="sb-form"
          role="search"
          aria-labelledby={`${ids}-ask`}
          onSubmit={(e) => {
            e.preventDefault();
            go(query);
          }}
        >
          <label className="sb-sr" htmlFor={`${ids}-q`}>
            Describe a scent
          </label>
          <input id={`${ids}-q`} autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} enterKeyHint="search" />
          <button type="submit">Find my scent</button>
        </form>
        <div className="sb-chips">
          <span>Or try</span>
          {CHIPS.map((c) => (
            <button key={c} type="button" onClick={() => go(c)}>
              {c}
            </button>
          ))}
        </div>
        <p className="sb-note" aria-live="polite">
          {note}
        </p>
        <ul className="sb-grid" role="list" aria-label="Results">
          {top.map(({ i, why }) => {
            const inBag = bag.find((x) => x.i.s === i.s)?.q ?? 0;
            return (
              <li className="sb-rise" key={`${run.n}-${i.s}`}>
                <div className="sb-art" style={glowStyle(glowFor(i))}>
                  <span className="sb-tag">{stockTag(i)}</span>
                  <CardArt art={i.art} eager />
                  <button
                    type="button"
                    className={inBag ? "sb-add is-on" : "sb-add"}
                    aria-label={inBag ? `${i.n}: ${inBag} in your bag. Add another` : `Add ${i.n} to bag`}
                    onClick={() => add(i)}
                  >
                    {inBag ? <TickIcon /> : <BagIcon />}
                  </button>
                </div>
                <div className="sb-name">{i.n}</div>
                <div className="sb-why">{why || i.fl.toLowerCase()}</div>
                <div className="sb-price">{priceText(i)}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sb-phone" role="group" aria-label="Biba’s WhatsApp">
        <div className="sb-ph-top">
          <i aria-hidden="true">B</i>
          <div>
            Scents by Biba<small>WhatsApp</small>
          </div>
        </div>
        <div className="sb-chat">
          {count ? (
            <p className="sb-msg">
              {orderMessage(bag, city.trim())}
              <span className="sb-msg-t">
                {sent ?? lagosTime()} ·{" "}
                {sent ? (
                  <span className="sb-ticks" aria-label="sent">
                    ✓✓
                  </span>
                ) : (
                  "draft"
                )}
              </span>
            </p>
          ) : (
            <div className="sb-empty">Tap the bag button on a perfume. The order message writes itself here.</div>
          )}
        </div>
        <label className="sb-city">
          Deliver to{" "}
          <input
            placeholder="Your city"
            autoComplete="address-level2"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setSent(null);
            }}
          />
        </label>
        <button type="button" className="sb-send" aria-disabled={disabled} onClick={send}>
          {sent ? "Sent. Biba replies to confirm stock and the total" : count ? `Send order to Biba on WhatsApp (${count})` : "Send order to Biba on WhatsApp"}
        </button>
        <p className="sb-sr" role="status">
          {status}
        </p>
      </div>
    </div>
  );
}
