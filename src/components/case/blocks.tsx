/**
 * Case-study template blocks (case-study handoff, section 3). Markup and class
 * names follow waande-case-handoff/reference/*.html so case.css applies as is.
 */
import type { CSSProperties, ReactNode } from "react";

import type { TileKind } from "./cases";
import { Toc, type TocItem } from "./toc";

/* ------------------------------------------------------------------ images */

export interface ImgSrc {
  /** Path under /public, without extension: `${src}.webp` is the 1x file. */
  src: string;
  w: number;
  h: number;
  /** Density of the `${src}@2x.webp` file, when one exists (2, or less when the original is smaller). */
  hi?: number;
}

interface ImgProps extends ImgSrc {
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Hero-area images load eagerly; everything else is lazy. */
  eager?: boolean;
}

/**
 * Plain <img> with explicit size (no layout shift) and a density srcset.
 * Not next/image: several sit inside stages scaled with CSS transforms, where
 * responsive `sizes` would pick the wrong file.
 */
export function Img({ src, w, h, hi, alt, className, style, eager }: ImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      style={style}
      src={`${src}.webp`}
      srcSet={hi ? `${src}.webp 1x, ${src}@2x.webp ${+hi.toFixed(2)}x` : undefined}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? undefined : "lazy"}
      decoding="async"
    />
  );
}

/* ------------------------------------------------------------- page parts */

export function Impact({ label, items }: { label: string; items: ReadonlyArray<readonly [string, string]> }) {
  return (
    <ul className="cs-impact" aria-label={label}>
      {items.map(([b, span]) => (
        <li key={b}>
          <b>{b}</b>
          <span>{span}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The 168px TOC + 620px reading column. The first grid on a page carries the
 * "On this page" nav; every later grid (reopened after a breakout figure)
 * keeps an empty spacer so the text stays aligned.
 */
export function Body({ toc, children }: { toc?: TocItem[]; children: ReactNode }) {
  return (
    <div className="cs-body">
      {toc ? <Toc items={toc} /> : <div className="cs-toc-spacer" aria-hidden="true" />}
      <div className="cs-main">{children}</div>
    </div>
  );
}

interface SectionProps {
  id?: string;
  /** Mono label, e.g. "01 · Context". */
  label?: string;
  title?: string;
  /** Continuation: no label or H2, 28px top padding. */
  cont?: boolean;
  children: ReactNode;
}

export function Section({ id, label, title, cont, children }: SectionProps) {
  return (
    <section className={cont ? "cs-sec cs-cont" : "cs-sec"} id={id}>
      {label && <span className="label">{label}</span>}
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

/** "In closing": the label is the section's H2 (one H2 per section), styled as the label. */
export function Closing({ children }: { children: ReactNode }) {
  return (
    <section className="cs-sec" id="closing">
      <h2 className="label">In closing</h2>
      <p className="cs-close">{children}</p>
    </section>
  );
}

export function Problems({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
  return (
    <ol className="cs-problems">
      {items.map(([title, line], i) => (
        <li key={title}>
          <span className="mono">P.0{i + 1}</span>
          <div>
            <b>{title}</b>
            <p>{line}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Results({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
  return (
    <dl className="cs-results">
      {items.map(([dt, dd]) => (
        <div key={dt}>
          <dt>{dt}</dt>
          <dd>{dd}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Breakout figure: the full 880px column, between two body grids. */
export function Fig({ n, caption, id, children }: { n: number; caption: ReactNode; id?: string; children: ReactNode }) {
  return (
    <figure className="cs-fig cs-wide" id={id}>
      {children}
      <figcaption>
        <span>Fig. {n}</span>
        {caption}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------- tiles */

/** A browser window on a tile (static: no prototype controls). */
export function BrowserTile({ tile, url, children }: { tile: TileKind; url: string; children: ReactNode }) {
  return (
    <div className="thumb still ptile" data-tile={tile}>
      <div className="win pwin">
        <div className="chrome">
          <i />
          <i />
          <i />
          <span className="url">{url}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Phones in a row on a tile; a scroll-snap row below 640px. */
export function PhoneStrip({ tile, phones }: { tile: TileKind; phones: ReadonlyArray<{ img: ImgSrc; alt: string; label: string }> }) {
  return (
    <div className="thumb still phs-tile" data-tile={tile}>
      <div className="phs" style={{ "--n": phones.length } as CSSProperties}>
        {phones.map((p) => (
          <figure className="phs-i" key={p.label}>
            <Img {...p.img} alt={p.alt} />
            <figcaption>{p.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/** An image on a tile with padding, radius and the tinted shadow. `dark` uses a near-black tile. */
export function WideImage({ tile, img, alt, dark }: { tile: TileKind; img: ImgSrc; alt: string; dark?: boolean }) {
  return (
    <div className={dark ? "thumb still wimg pad dark" : "thumb still wimg pad"} data-tile={tile}>
      <Img {...img} alt={alt} />
    </div>
  );
}

/** Two figures, 1.25fr / 1fr, stacking below 640px. */
export function Pair({ children }: { children: ReactNode }) {
  return <div className="cs-pair cs-wide">{children}</div>;
}

export function PairFig({ n, caption, children }: { n: number; caption: ReactNode; children: ReactNode }) {
  return (
    <figure>
      {children}
      <figcaption>
        <span>Fig. {n}</span>
        {caption}
      </figcaption>
    </figure>
  );
}
