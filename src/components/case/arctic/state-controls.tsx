"use client";

import { useEffect, useRef, useState } from "react";

import { Img, type ImgSrc } from "../blocks";

/**
 * Arctic Edge interactive figures (case-study handoff, section 4.3). Ports of
 * the reference's `ae-states` and `ae-zones` scripts.
 */

const AUTO_MS = 3200;
const VISIBLE_AT = 0.4;

export interface PhoneState {
  img: ImgSrc;
  alt: string;
  title: string;
  line: string;
}

/**
 * Fig. 2: the phone (max 230px) beside five states. The active state shows its
 * line and a #7c8cff rule; images cross-fade over .45s. It advances every 3.2s
 * while at least 40% is on screen and the tab is visible, and stops for good
 * once someone picks a state. No auto-advance with reduced motion.
 */
export function StateSwitcher({ heading, states }: { heading: string; states: readonly PhoneState[] }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: VISIBLE_AT });
    io.observe(el);
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (!auto || !visible || !pageVisible || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % states.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [auto, visible, pageVisible, i, states.length]);

  return (
    <div className="thumb still sw-tile" data-tile="arctic">
      <div className="sw" id="ae-states" ref={root}>
        <div className="sw-phone">
          {states.map((s, k) => (
            <Img key={s.title} {...s.img} className={k === i ? "sw-img on" : "sw-img"} alt={s.alt} />
          ))}
        </div>
        <div className="sw-list" role="group" aria-label="Home screen states">
          <span className="sw-h">{heading}</span>
          {states.map((s, k) => (
            <button
              key={s.title}
              type="button"
              className={k === i ? "sw-b on" : "sw-b"}
              aria-pressed={k === i}
              onClick={() => {
                setAuto(false);
                setI(k);
              }}
            >
              <b>{s.title}</b>
              <span>{s.line}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Fig. 4: a pill segmented control that cross-fades the Set temperature sheet (phone max 200px). */
export function ZoneToggle({ zones }: { zones: ReadonlyArray<{ label: string; img: ImgSrc; alt: string }> }) {
  const [z, setZ] = useState(0);
  return (
    <div className="thumb still sw-tile" data-tile="arctic">
      <div className="zn" id="ae-zones">
        <div className="zn-seg" role="group" aria-label="Temperature zone">
          {zones.map((zone, k) => (
            <button key={zone.label} type="button" className={k === z ? "on" : undefined} aria-pressed={k === z} onClick={() => setZ(k)}>
              {zone.label}
            </button>
          ))}
        </div>
        <div className="zn-phone">
          {zones.map((zone, k) => (
            <Img key={zone.label} {...zone.img} className={k === z ? "sw-img on" : "sw-img"} alt={zone.alt} />
          ))}
        </div>
      </div>
    </div>
  );
}
