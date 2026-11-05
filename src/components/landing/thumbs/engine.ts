/**
 * Thumbnail timeline toolkit. A one-to-one port of `kit()` / `setCam()` from
 * the approved prototype (waande-handoff/reference/index.html). Timelines are
 * plain async sequences that drive the server-rendered DOM imperatively; the
 * React tree for a tile never re-renders, so nothing fights these mutations.
 *
 * Cancellation: every wait goes through `w()`, which throws STOP once the
 * player's token has moved on. Holding: `w()` also parks while `held()` is
 * true, so hover freezes the story mid-step instead of resetting it.
 */

export const STOP = Symbol("thumb-timeline-stop");

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const $ = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => {
  const el = root.querySelector<T>(sel);
  if (!el) throw new Error(`thumbnail element not found: ${sel}`);
  return el;
};

export const $$ = <T extends Element = HTMLElement>(root: ParentNode, sel: string) =>
  Array.from(root.querySelectorAll<T>(sel));

/** [origin x, origin y, zoom] in stage px. */
export type Framing = readonly [number, number, number];

const savedFraming = new WeakMap<HTMLElement, Framing>();

/**
 * Point the camera. Scripted moves remember their framing so that leaving
 * hover-inspect can return to it; loupe moves pass `scripted = false`.
 */
export function setCam(cam: HTMLElement, x: number, y: number, z: number, scripted = true) {
  cam.style.setProperty("--ox", `${x}px`);
  cam.style.setProperty("--oy", `${y}px`);
  cam.style.setProperty("--z", String(z));
  if (scripted) savedFraming.set(cam, [x, y, z]);
}

export const getSavedFraming = (cam: HTMLElement) => savedFraming.get(cam);

export interface Kit {
  stage: HTMLElement;
  /** Wait `ms`, then park while held. Throws STOP if the timeline was cancelled. */
  w: (ms: number) => Promise<void>;
  show: (el: Element, on?: boolean) => void;
  move: (x: number, y: number, ms?: number) => Promise<void>;
  place: (x: number, y: number) => void;
  hideCur: () => void;
  click: () => Promise<void>;
  to: (el: Element, ms?: number, fx?: number, fy?: number) => Promise<void>;
}

export function createKit(thumb: HTMLElement, alive: () => boolean, held: () => boolean): Kit {
  const stage = $(thumb, ".stage,.ph-stage");
  const cur = $(stage, ".cursor");

  const w = async (ms: number) => {
    await sleep(ms);
    while (held() && alive()) await sleep(90);
    if (!alive()) throw STOP;
  };

  const show = (el: Element, on = true) => {
    el.classList.toggle("hide", !on);
  };

  const move = async (x: number, y: number, ms = 700) => {
    cur.style.setProperty("--d", `${ms}ms`);
    cur.style.opacity = "1";
    cur.style.transform = `translate(${x}px,${y}px)`;
    await w(ms);
  };

  const place = (x: number, y: number) => {
    cur.style.setProperty("--d", "0ms");
    cur.style.transform = `translate(${x}px,${y}px)`;
    cur.getBoundingClientRect(); // commit the jump before the next transition
  };

  const hideCur = () => {
    cur.style.opacity = "0";
  };

  const click = async () => {
    cur.classList.add("down");
    const m = new DOMMatrix(getComputedStyle(cur).transform);
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    ripple.style.left = `${m.m41 + 11}px`;
    ripple.style.top = `${m.m42 + 8}px`;
    cur.parentNode?.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    await w(150);
    cur.classList.remove("down");
    await w(90);
  };

  /** Stage coordinates of a point inside `el`, offset to the arrow's tip. */
  const pos = (el: Element, fx = 0.5, fy = 0.5): [number, number] => {
    const a = el.getBoundingClientRect();
    const b = stage.getBoundingClientRect();
    const sc = b.width / 1440;
    return [(a.left - b.left + a.width * fx) / sc - 11, (a.top - b.top + a.height * fy) / sc - 8];
  };

  const to = (el: Element, ms?: number, fx?: number, fy?: number) => {
    const [x, y] = pos(el, fx, fy);
    return move(x, y, ms);
  };

  return { stage, w, show, move, place, hideCur, click, to };
}

export interface Scene {
  /** Put the tile on its rest frame. Must match the server-rendered markup. */
  reset: (thumb: HTMLElement) => void;
  /** One pass of the story. Loops while the player is alive. */
  run: (thumb: HTMLElement, k: Kit) => Promise<void>;
}
