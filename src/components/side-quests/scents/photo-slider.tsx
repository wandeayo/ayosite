"use client";

import { useState, type CSSProperties } from "react";

import { Photo } from "./art";
import { CUTOUT } from "./catalogue";

/**
 * Fig. 5: drag to compare the catalogue shot (left) with the cut-out on the shop's arch
 * (right). A native range input covers the frame, so mouse, touch (vertical scrolling still
 * works: touch-action pan-y) and the arrow keys all move it; the handle shows its focus ring.
 */
export function PhotoSlider() {
  const [x, setX] = useState(50);
  return (
    <div className="sb-frame sb-photos sb-shop">
      <div className="sb-cutx" style={{ "--x": `${x}%` } as CSSProperties}>
        <div className="sb-layer before">
          <Photo img={CUTOUT} alt="Ramz Silver catalogue photo on a white background" />
        </div>
        <div className="sb-layer after">
          <Photo img={CUTOUT} alt="The same bottle cut out and standing on the shop’s arch" />
        </div>
        <span className="sb-ctag" style={{ left: 12 }} aria-hidden="true">
          Catalogue shot
        </span>
        <span className="sb-ctag" style={{ right: 12 }} aria-hidden="true">
          On the shelf
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={x}
          onChange={(e) => setX(+e.target.value)}
          aria-label="Compare the catalogue shot with the cut-out"
          aria-valuetext={`${x}% catalogue shot, ${100 - x}% cut-out`}
        />
        <div className="sb-handle" aria-hidden="true" />
      </div>
      <ol className="sb-pipe">
        <li>01 · catalogue image</li>
        <li>02 · drawn to canvas</li>
        <li>03 · background flood-filled</li>
        <li>04 · checked by eye</li>
      </ol>
    </div>
  );
}
