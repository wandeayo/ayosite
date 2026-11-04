import type { CSSProperties } from "react";

/**
 * Screens shown inside the thumbnails, served from /public/home. Sizes are
 * 1x stage px: every overlay coordinate assumes these. `hi` marks assets that
 * also ship an @2x export; the browser picks it on high-density screens.
 */
const SHOTS = {
  "carmen-01-scanning": { w: 1440, h: 1008, hi: false },
  "carmen-02-review-base": { w: 1440, h: 1008, hi: false },
  "carmen-02-row-0": { w: 750, h: 106, hi: false },
  "carmen-02-row-1": { w: 750, h: 106, hi: false },
  "carmen-02-row-2": { w: 750, h: 106, hi: false },
  "carmen-02-row-3": { w: 750, h: 106, hi: false },
  "carmen-02-row-4": { w: 750, h: 106, hi: false },
  "carmen-02-buttons": { w: 271, h: 52, hi: false },
  "carmen-03-campaign": { w: 1440, h: 1500, hi: false },
  "carmen-03-stat-0": { w: 240, h: 129, hi: false },
  "carmen-03-stat-1": { w: 240, h: 129, hi: false },
  "carmen-03-stat-2": { w: 240, h: 129, hi: false },
  "carmen-03-stat-3": { w: 240, h: 129, hi: false },
  "airstride-01-board": { w: 1440, h: 1008, hi: false },
  "airstride-02-menu": { w: 239, h: 441, hi: false },
  "airstride-03-summary-modal": { w: 520, h: 871, hi: false },
  "arctic-01-cooling": { w: 402, h: 874, hi: true },
  "arctic-02-heating": { w: 402, h: 874, hi: true },
} as const satisfies Record<string, { w: number; h: number; hi: boolean }>;

export type ShotName = keyof typeof SHOTS;

interface ShotProps {
  name: ShotName;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

export function Shot({ name, id, className, style }: ShotProps) {
  const { w, h, hi } = SHOTS[name];
  const src = `/home/${name}.webp`;
  return (
    // Plain <img>: the stage is scaled with a CSS transform, so next/image's
    // responsive sizing would pick the wrong file. Density descriptors do it right.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      id={id}
      className={className}
      style={style}
      src={src}
      srcSet={hi ? `${src} 1x, /home/${name}@2x.webp 2x` : undefined}
      width={w}
      height={h}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}
