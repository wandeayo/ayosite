"use client";

import { KIND_WORDS } from "./content";
import s from "./kind-words.module.css";
import { useKindWordsBoard } from "./use-kind-words-board";

/**
 * Kind words: the testimonials as sticky notes on a desk. Ported from
 * waande-testimonials-handoff (the approved design). The notes are server-rendered figures, so
 * without JS they're a plain readable grid; useKindWordsBoard turns them into a board you can
 * drag, throw and tidy (a flickable stack on phones), with a pad for leaving Ayo a note, which
 * POSTs to /api/note.
 */
export function KindWords() {
  const { boardRef, tidyRef, countRef, padRef, padLabelRef, hintRef } = useKindWordsBoard();

  return (
    <section id="kind-words" className={s.root} aria-labelledby="kw-h">
      <div className="sec-head">
        <h2 className="label" id="kw-h">
          Kind words
        </h2>
        <div className={s.ctl}>
          <span className={`${s.count} mono`} ref={countRef} hidden>
            {`01 / ${String(KIND_WORDS.length).padStart(2, "0")}`}
          </span>
          <button className={`${s.tidy} mono`} ref={tidyRef} type="button">
            Tidy up
          </button>
        </div>
      </div>
      <p className={s.srOnly} id="kw-help">
        Each note can be dragged around the board, or moved with the arrow keys once focused.
      </p>
      <div className={s.board} ref={boardRef} aria-describedby="kw-help" data-endpoint="/api/note">
        {KIND_WORDS.map((p) => (
          <figure key={p.name} className={s.note} data-c={p.paper} tabIndex={0}>
            <div className={s.paper}>
              <blockquote>{p.quote}</blockquote>
              <figcaption>
                <b>{p.name}</b>
                <span>{p.role}</span>
              </figcaption>
            </div>
          </figure>
        ))}
        <button className={s.pad} ref={padRef} type="button" aria-label="Write Ayo a note">
          <span className={s.padTop}>
            <b ref={padLabelRef}>Your turn.</b>
            <span className="mono">Leave a note +</span>
          </span>
        </button>
        <p className={`${s.hint} mono`} ref={hintRef} aria-hidden="true">
          psst, they move.
        </p>
      </div>
    </section>
  );
}
