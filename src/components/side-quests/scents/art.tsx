/**
 * Shared pieces for the Scents by Biba figures: prices, the card art (a photo or a drawn
 * bottle) and the icons. No hooks, so server and client figures both use them.
 */
import type { CSSProperties } from "react";

import { BOTTLE_DEFS, type Art, type BottleSpec, type ImgSrc, type Perfume } from "./catalogue";

/** ₦25,000. Grouped by hand, so server and client render the same string. */
export const naira = (n: number) => "₦" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** Order-in prices are estimates, so they never read as a promise. */
export const priceText = (i: Pick<Perfume, "a" | "p">) => (i.a === "order" ? "About " : "") + naira(i.p);

export const stockTag = (i: Pick<Perfume, "a">) => (i.a === "in" ? "In the boutique" : "Order-in");

/** The warm glow behind a bottle, from its first scent family. */
const GLOW: Record<string, string> = {
  sweet: "#f6dcb6", gourmand: "#f6dcb6", vanilla: "#f6dcb6",
  fresh: "#eef0cf", citrus: "#eef0cf", clean: "#eef0cf",
  floral: "#f5dcd8", rose: "#f5dcd8", fruity: "#f8d4c4", oud: "#e5c6c0",
  woody: "#ecd2b4", amber: "#ecd2b4", spicy: "#ecd2b4", musky: "#efe8e1",
};
export const glowFor = (i: Pick<Perfume, "fl">) => GLOW[(i.fl.split(" · ")[0] ?? "").toLowerCase()] ?? "#f3e6cf";
export const glowStyle = (glow: string) => ({ "--glow": glow }) as CSSProperties;

/**
 * The gradients and the eight bottle symbols, once per page. Hidden with a zero-size box,
 * not display:none, which would stop the gradients from painting.
 */
export function BottleDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: BOTTLE_DEFS }} />
  );
}

export function Bottle({ spec, className = "sb-bottle" }: { spec: BottleSpec; className?: string }) {
  return (
    <svg className={spec.shape === "mini" ? `${className} sb-bottle-mini` : className} viewBox="0 0 120 220" aria-hidden="true" focusable="false">
      <use href={`#b-${spec.shape}`} style={{ "--liq": `url(#${spec.liq})`, "--cap": `url(#${spec.cap})` } as CSSProperties} />
    </svg>
  );
}

/** A plain lazy <img> with its intrinsic size, so nothing shifts while it loads. */
export function Photo({ img, alt = "", eager, className, style }: { img: ImgSrc; alt?: string; eager?: boolean; className?: string; style?: CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} style={style} src={img.src} width={img.w} height={img.h} alt={alt} loading={eager ? undefined : "lazy"} decoding="async" />
  );
}

/** A card's bottle: the cut-out photo when there is one, otherwise the drawn bottle. Decorative: the card names it. */
export function CardArt({ art, eager }: { art: Art; eager?: boolean }) {
  return "photo" in art ? <Photo img={art.photo} eager={eager} /> : <Bottle spec={art.bottle} />;
}

export function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      <path d="M12 11.5v5M9.5 14h5" />
    </svg>
  );
}

export function TickIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** WhatsApp-style time, in Biba's timezone. */
export const lagosTime = () =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" }).format(new Date());
