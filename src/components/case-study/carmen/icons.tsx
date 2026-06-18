/**
 * Inline icon set for the Carmen product demos (tabler-style, 24 grid,
 * stroke = currentColor). Pure + server-renderable so it can be used in
 * both the static case-study frame and the interactive client demos.
 */

export const AIR_ICONS = {
  plus: "M12 5v14M5 12h14",
  spark: "M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 14l.7 1.8L20.5 16.5l-1.8.7L18 19l-.7-1.8L15.5 16.5l1.8-.7z",
  campaign: "M3 8l13-4-3 16-4-6-6-2zM9 12l11-8",
  outreach: "M10 14l11-11M21 3l-6.5 18a.5.5 0 0 1-1 0L10 14l-7-3.5a.5.5 0 0 1 0-1z",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-.6.5-1 1.2-1 2H9c0-.8-.4-1.5-1-2A6 6 0 0 1 12 3z",
  linkedin: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8 10v6M8 7v.01M12 16v-3a2 2 0 0 1 4 0v3",
  mic: "M9 4a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0zM5 10a7 7 0 0 0 14 0M12 17v4",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3",
  check: "M5 12l5 5L20 7",
  x: "M6 6l12 12M18 6L6 18",
  chevD: "M6 9l6 6 6-6",
  chevR: "M9 6l6 6-6 6",
  chevL: "M15 6l-6 6 6 6",
  swap: "M8 9l4-4 4 4M16 15l-4 4-4-4",
  dots: "M12 6h.01M12 12h.01M12 18h.01",
  bell: "M10 5a2 2 0 0 1 4 0 7 7 0 0 1 4 6v3l1.5 2.5h-15L6 14v-3a7 7 0 0 1 4-6M9.5 19a2.5 2.5 0 0 0 5 0",
  msg: "M21 12a8 7 0 0 1-11.5 6.2L4 20l1.8-4A8 7 0 1 1 21 12z",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M4 19a5 5 0 0 1 10 0M16 5.2a3 3 0 0 1 0 5.6M20 19a5 5 0 0 0-3-4.6",
  world: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M3.5 12h17M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18",
  trend: "M3 17l6-6 4 4 8-8M16 7h5v5",
  shield: "M12 3l7 3v5c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6z",
  lock: "M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3",
  link: "M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  pause: "M9 5v14M15 5v14",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 8v4l3 2",
  refresh: "M20 11a8 8 0 1 0-2.3 5.6M20 5v6h-6",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 12h.01",
  layout: "M4 4h16v16H4zM10 4v16M4 10h6",
  building: "M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M15 21V9h3a1 1 0 0 1 1 1v11M8 8h2M8 12h2M8 16h2",
  panel: "M4 4h16v16H4zM15 4v16",
  arrowU: "M12 20V6M6 12l6-6 6 6",
  arrowR: "M5 12h14M13 6l6 6-6 6",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M3.5 12h17",
  ext: "M14 4h6v6M20 4l-9 9M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  grad: "M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1",
} as const;

export type IconName = keyof typeof AIR_ICONS;

type IcProps = Omit<React.SVGProps<SVGSVGElement>, "fill"> & {
  n: IconName;
  /** Flag from the source UI kit; the icons are stroked, so it is a no-op. */
  fill?: boolean;
};

export function Ic({ n, fill: _fill, ...props }: IcProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={AIR_ICONS[n]} />
    </svg>
  );
}
