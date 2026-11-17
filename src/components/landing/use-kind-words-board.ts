"use client";

import { useEffect, useRef } from "react";

import { LANDING } from "./content";
import s from "./kind-words.module.css";

/**
 * The Kind words board: sticky notes you can drag, throw, tidy, mess up, or add your own to.
 * A port of waande-testimonials-handoff/source/kind-words.js with the logic and numbers kept.
 * It runs on the server-rendered notes, so without JS they stay a plain readable grid. React
 * changes: refs instead of ids, a WeakMap instead of el._n, no demo mode, and everything it
 * starts (listeners, timers, frames, the observer, your note) is torn down on unmount.
 */

// Fixed tilts and offsets, so the first view is readable and the same for everyone.
const ROT = [-2.6, 1.8, -1.2, 2.4, -1.8, 1.4];
const JIT: ReadonlyArray<readonly [number, number]> = [
  [-6, 8],
  [10, -4],
  [-4, 14],
  [8, -6],
  [-10, 6],
  [4, 10],
];

interface Note {
  el: HTMLElement;
  x: number;
  y: number;
  r: number;
  base: number;
  tr: number;
  vx: number;
  vy: number;
  drag: boolean;
  moving: boolean;
  w: number;
  h: number;
}

interface Drag {
  n: Note;
  ox: number;
  oy: number;
  sx: number;
  lx: number;
  ly: number;
  lt: number;
  id: number;
  moved: boolean;
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function useKindWordsBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const tidyRef = useRef<HTMLButtonElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const padRef = useRef<HTMLButtonElement>(null);
  const padLabelRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const board = boardRef.current,
      tidyBtn = tidyRef.current,
      count = countRef.current,
      pad = padRef.current,
      padLabel = padLabelRef.current,
      hint = hintRef.current;
    if (!board || !tidyBtn || !count || !pad || !padLabel || !hint) return;

    const ac = new AbortController();
    const on = { signal: ac.signal };
    const timers = new Set<number>();
    const frames = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };
    const frame = (fn: () => void) => {
      const id = requestAnimationFrame(() => {
        frames.delete(id);
        fn();
      });
      frames.add(id);
      return id;
    };

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noteSel = "." + CSS.escape(s.note);
    const byEl = new WeakMap<Element, Note>();
    let notes: Note[] = [],
      W = 0,
      H = 0,
      mode: "scatter" | "tidy" | "mess" = "scatter",
      deck = false,
      Z = 10,
      order: Note[] = [],
      raf = 0,
      dealt = false,
      mine: Note | null = null;
    board.classList.add(s.js);

    function mk(el: HTMLElement): Note {
      const n: Note = { el, x: 0, y: 0, r: 0, base: 0, tr: 0, vx: 0, vy: 0, drag: false, moving: false, w: 0, h: 0 };
      byEl.set(el, n);
      return n;
    }
    notes = [...board.querySelectorAll<HTMLElement>(noteSel)].map(mk);
    const paint = (n: Note) => {
      n.el.style.transform = `translate3d(${n.x}px,${n.y}px,0) rotate(${n.r}deg)`;
    };
    const front = (n: Note) => {
      n.el.style.zIndex = String(++Z);
    };
    const ease = (list: Note[], yes: boolean) => list.forEach((n) => n.el.classList.toggle(s.ease, yes && !reduce));
    function measure() {
      W = board!.clientWidth;
      deck = W < 640;
      board!.classList.toggle(s.deck, deck);
      count!.hidden = !deck;
      tidyBtn!.hidden = deck;
      const nw = deck ? Math.min(320, W - 28) : Math.min(264, Math.floor((W - 40) / 3));
      board!.style.setProperty("--nw", nw + "px");
      notes.forEach((n) => {
        n.w = n.el.offsetWidth;
        n.h = n.el.offsetHeight;
      });
    }

    // desktop: three loose columns, or a neat grid when tidied
    function rowsOf(list: Note[]) {
      const rows: Note[][] = [];
      list.forEach((n, i) => {
        (rows[(i / 3) | 0] = rows[(i / 3) | 0] || []).push(n);
      });
      return rows;
    }
    function layoutDesk(kind: "scatter" | "tidy") {
      const list = notes.filter((n) => n !== mine),
        colW = W / 3;
      let y = kind === "tidy" ? 0 : 18;
      rowsOf(list).forEach((row, ri) => {
        const rh = Math.max(...row.map((n) => n.h));
        row.forEach((n, ci) => {
          const i = ri * 3 + ci,
            j = kind === "tidy" ? [0, 0] : JIT[i % 6];
          n.x = ci * colW + (colW - n.w) / 2 + j[0];
          n.y = y + j[1];
          n.base = n.tr = n.r = kind === "tidy" ? 0 : ROT[i % 6];
        });
        y += rh + (kind === "tidy" ? 20 : 34);
      });
      H = Math.round(y + (kind === "tidy" ? 140 : 120));
      board!.style.height = H + "px";
      pad!.style.left = W - 170 + "px";
      pad!.style.top = H - 150 + "px";
      hint!.textContent = "psst, they move.";
      hint!.style.left = "2px";
      hint!.style.top = H - 70 + "px";
      if (mine) {
        mine.x = clamp(mine.x, 0, W - mine.w);
        mine.y = clamp(mine.y, 0, H - mine.h);
      }
    }
    function messUp() {
      const list = notes.filter((n) => n !== mine);
      list.forEach((n) => {
        n.x = Math.random() * (W - n.w);
        n.y = Math.random() * Math.max(0, H - 180 - n.h * 0.6);
        n.base = n.tr = n.r = (Math.random() * 2 - 1) * 11;
        front(n);
      });
    }

    // phone: a stack you flick through
    function layoutDeck() {
      const h = Math.max(...notes.map((n) => n.h));
      H = h + 24;
      board!.style.height = H + 130 + "px";
      order.forEach((n, d) => {
        n.x = (W - n.w) / 2;
        n.y = Math.min(d, 2) * 7;
        n.base = n.tr = n.r = d === 0 ? 0 : d % 2 ? 2.2 : -2.4;
        n.el.style.zIndex = String(100 - d);
        n.el.style.opacity = d > 2 ? "0" : "1";
        n.el.setAttribute("aria-hidden", d === 0 ? "false" : "true");
        n.el.tabIndex = d === 0 ? 0 : -1;
      });
      pad!.style.left = "6px";
      pad!.style.top = H + 4 + "px";
      hint!.textContent = "flick the top one away →";
      hint!.style.left = "150px";
      hint!.style.top = H + 52 + "px";
      const real = notes.filter((n) => n !== mine),
        top = order[0];
      count!.textContent =
        top === mine
          ? "Your note"
          : String(real.indexOf(top) + 1).padStart(2, "0") + " / " + String(real.length).padStart(2, "0");
    }

    function layout(animate: boolean) {
      measure();
      if (deck) {
        if (!order.length || order.length !== notes.length) order = notes.slice();
        ease(notes, animate);
        layoutDeck();
      } else {
        notes.forEach((n) => {
          n.el.style.opacity = "";
          n.el.removeAttribute("aria-hidden");
          n.el.tabIndex = 0;
        });
        ease(notes, animate);
        if (mode === "mess") {
          layoutDesk("scatter");
          messUp();
        } else layoutDesk(mode);
      }
      notes.forEach(paint);
    }

    // drag + throw
    let drag: Drag | null = null;
    function loop() {
      let busy = false;
      notes.forEach((n) => {
        if (n.drag) {
          n.r += (n.tr - n.r) * 0.25;
          paint(n);
          busy = true;
          return;
        }
        if (n.moving) {
          n.x += n.vx;
          n.y += n.vy;
          n.vx *= 0.9;
          n.vy *= 0.9;
          if (n.x < 0 || n.x > W - n.w) {
            n.x = clamp(n.x, 0, W - n.w);
            n.vx *= -0.45;
          }
          if (n.y < 0 || n.y > H - n.h) {
            n.y = clamp(n.y, 0, H - n.h);
            n.vy *= -0.45;
          }
          n.tr = n.base + clamp(n.vx * 0.8, -14, 14);
          n.r += (n.tr - n.r) * 0.2;
          paint(n);
          if (Math.hypot(n.vx, n.vy) < 0.15 && Math.abs(n.r - n.base) < 0.05) {
            n.moving = false;
            n.r = n.base;
            paint(n);
          } else busy = true;
        }
      });
      raf = busy ? frame(loop) : 0;
    }
    const kick = () => {
      if (!raf) raf = frame(loop);
    };
    const pt = (e: PointerEvent): [number, number] => {
      const b = board.getBoundingClientRect();
      return [e.clientX - b.left, e.clientY - b.top];
    };
    board.addEventListener(
      "pointerdown",
      (e) => {
        const t = e.target as Element;
        const el = t.closest(noteSel);
        if (!el || e.button > 0 || t.closest("textarea,input,a,button")) return;
        const n = byEl.get(el);
        if (!n || (deck && n !== order[0])) return;
        const [px, py] = pt(e);
        drag = { n, ox: px - n.x, oy: py - n.y, sx: px, lx: px, ly: py, lt: performance.now(), id: e.pointerId, moved: false };
        ease([n], false);
        n.moving = false;
        n.vx = n.vy = 0;
        if (!deck) front(n);
      },
      on,
    );
    board.addEventListener(
      "pointermove",
      (e) => {
        if (!drag || e.pointerId !== drag.id) return;
        const n = drag.n,
          [px, py] = pt(e);
        if (!drag.moved) {
          if (Math.hypot(px - drag.lx, py - drag.ly) < 4) return;
          drag.moved = true;
          n.drag = true;
          n.el.classList.add(s.held);
          try {
            n.el.setPointerCapture(e.pointerId);
          } catch {}
          if (!hint.classList.contains(s.gone)) hint.classList.add(s.gone);
        }
        const t = performance.now(),
          dt = Math.max(8, t - drag.lt);
        n.vx = n.vx * 0.5 + ((px - drag.lx) / dt) * 16 * 0.5;
        n.vy = n.vy * 0.5 + ((py - drag.ly) / dt) * 16 * 0.5;
        drag.lx = px;
        drag.ly = py;
        drag.lt = t;
        if (deck) {
          n.x = (W - n.w) / 2 + (px - drag.sx);
          n.tr = (px - drag.sx) * 0.06;
        } else {
          n.x = clamp(px - drag.ox, 0, W - n.w);
          n.y = clamp(py - drag.oy, 0, H - n.h);
          n.tr = n.base + clamp(n.vx * 0.8, -14, 14);
        }
        if (reduce) {
          n.r = n.tr = deck ? 0 : n.base;
          paint(n);
        } else kick();
      },
      on,
    );
    function end(e: PointerEvent) {
      if (!drag || e.pointerId !== drag.id) return;
      const { n, moved } = drag;
      drag = null;
      n.drag = false;
      n.el.classList.remove(s.held);
      if (!moved) return;
      if (deck) {
        const dx = n.x - (W - n.w) / 2;
        if (Math.abs(dx) > W * 0.25 || Math.abs(n.vx) > 9) toss(n, Math.sign(dx || n.vx));
        else {
          ease([n], true);
          layoutDeck();
          paint(n);
        }
        return;
      }
      if (reduce) {
        n.vx = n.vy = 0;
        return;
      }
      n.base = clamp(n.base + clamp(n.vx * 0.3, -4, 4), -12, 12);
      n.moving = true;
      kick();
    }
    board.addEventListener("pointerup", end, on);
    board.addEventListener("pointercancel", end, on);

    // phone: flick the top note away and it goes to the back of the pile
    function toss(n: Note, dir: number) {
      ease([n], true);
      n.x = (W - n.w) / 2 + dir * (W + 40);
      n.r = dir * 18;
      paint(n);
      later(
        () => {
          order.push(order.shift()!);
          ease(notes, false);
          n.el.style.zIndex = "0";
          n.x = (W - n.w) / 2;
          n.y = 14;
          n.r = 0;
          paint(n);
          frame(() =>
            frame(() => {
              ease(notes, true);
              layoutDeck();
              notes.forEach(paint);
            }),
          );
        },
        reduce ? 0 : 320,
      );
    }

    // keyboard: arrows nudge the focused note (or flip through the stack on a phone)
    const KEYS: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    board.addEventListener(
      "keydown",
      (e) => {
        const t = e.target as Element;
        const el = t.closest(noteSel);
        if (!el || t.closest("textarea,input")) return;
        const n = byEl.get(el);
        const k = KEYS[e.key];
        if (!n || !k) return;
        e.preventDefault();
        if (deck) {
          if (k[0]) toss(n, k[0]);
          return;
        }
        const step = e.shiftKey ? 48 : 16;
        ease([n], true);
        front(n);
        n.x = clamp(n.x + k[0] * step, 0, W - n.w);
        n.y = clamp(n.y + k[1] * step, 0, H - n.h);
        paint(n);
      },
      on,
    );
    board.addEventListener(
      "focusin",
      (e) => {
        const el = (e.target as Element).closest<HTMLElement>(noteSel);
        const n = el && byEl.get(el);
        if (n && !deck && Number(el.style.zIndex || 0) < Z) front(n);
      },
      on,
    );

    tidyBtn.addEventListener(
      "click",
      () => {
        mode = mode === "tidy" ? "mess" : "tidy";
        tidyBtn.textContent = mode === "tidy" ? "Mess it up" : "Tidy up";
        notes.forEach((n, i) => {
          n.moving = false;
          n.el.style.transitionDelay = reduce ? "0ms" : i * 45 + "ms";
        });
        layout(true);
        later(() => notes.forEach((n) => (n.el.style.transitionDelay = "")), 900);
      },
      on,
    );

    // the pad: peel off a blank note, write Ayo something, and it's sent from the site (no email app needed)
    const ENDPOINT = board.dataset.endpoint || "/api/note";
    function removeMine() {
      if (!mine) return;
      const el = mine.el;
      notes = notes.filter((n) => n !== mine);
      order = order.filter((n) => n !== mine);
      el.remove();
      mine = null;
      if (deck) {
        ease(notes, true);
        layoutDeck();
        notes.forEach(paint);
      }
    }
    pad.addEventListener(
      "click",
      () => {
        if (mine) {
          const m = mine;
          if (deck) {
            order = [m, ...order.filter((n) => n !== m)];
            ease(notes, true);
            layoutDeck();
            notes.forEach(paint);
          } else front(m);
          m.el.querySelector("textarea")?.focus();
          return;
        }
        const el = document.createElement("figure");
        el.className = `${s.note} ${s.mine}`;
        el.dataset.c = "w";
        el.tabIndex = 0;
        el.setAttribute("aria-label", "Your note to Ayo");
        el.innerHTML =
          `<form class="${s.paper}" novalidate><label class="${s.srOnly}" for="kw-msg">Your note to Ayo</label><textarea id="kw-msg" name="message" maxlength="500" required placeholder="Hi Ayo, …"></textarea>` +
          `<label class="${s.srOnly}" for="kw-from">Your email, if you want a reply</label><input class="${s.mineMail}" id="kw-from" name="email" type="email" autocomplete="email" maxlength="120" placeholder="Your email, if you want a reply">` +
          `<input class="${s.trap}" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">` +
          `<div class="${s.mineFoot}"><b>You</b><span class="${s.mineBtns}"><button type="button" data-act="bin" aria-label="Throw your note away">Bin</button><button type="submit" class="${s.send}" disabled>Send ↗</button></span></div>` +
          `<p class="${s.mineMsg}" role="status" aria-live="polite"></p></form>`;
        board.appendChild(el);
        const m = mk(el);
        mine = m;
        notes.push(m);
        measure();
        const opened = Date.now();
        const form = el.querySelector("form")!,
          ta = form.querySelector("textarea")!,
          mail = form.querySelector<HTMLInputElement>('input[name="email"]')!,
          trap = form.querySelector<HTMLInputElement>('input[name="website"]')!,
          send = form.querySelector<HTMLButtonElement>('button[type="submit"]')!,
          msg = form.querySelector("p")!;
        const ok = () => ta.value.trim().length > 0 && (!mail.value.trim() || mail.checkValidity());
        form.addEventListener(
          "input",
          () => {
            send.disabled = !ok();
            el.classList.remove(s.err);
            msg.textContent = "";
          },
          on,
        );
        form.querySelector('[data-act="bin"]')!.addEventListener(
          "click",
          () => {
            removeMine();
            pad.focus();
          },
          on,
        );
        form.addEventListener(
          "submit",
          async (e) => {
            e.preventDefault();
            if (!ok()) {
              if (!mail.checkValidity()) {
                msg.textContent = "That email doesn’t look right.";
                el.classList.add(s.err);
              }
              return;
            }
            const body = { message: ta.value.trim(), email: mail.value.trim(), website: trap.value, ms: Date.now() - opened };
            el.classList.add(s.sending);
            send.disabled = true;
            send.textContent = "Sending…";
            ta.readOnly = mail.readOnly = true;
            try {
              const r = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                signal: ac.signal,
              });
              if (!r.ok) throw new Error(String(r.status));
              sent(el);
            } catch {
              if (ac.signal.aborted) return;
              el.classList.remove(s.sending);
              ta.readOnly = mail.readOnly = false;
              send.disabled = false;
              send.textContent = "Try again ↗";
              el.classList.add(s.err);
              const a = document.createElement("a");
              a.href = `mailto:${LANDING.email}?subject=${encodeURIComponent("A note from waande.com")}&body=${encodeURIComponent(ta.value)}`;
              a.textContent = "Email me instead ↗";
              msg.replaceChildren("Didn’t send. ", a);
            }
          },
          on,
        );
        if (deck) {
          order = [m, ...order];
          ease(notes, false);
          layoutDeck();
          notes.forEach(paint);
          ta.focus({ preventScroll: true });
          return;
        }
        const px = parseFloat(pad.style.left),
          py = parseFloat(pad.style.top);
        m.x = px - 10;
        m.y = py - 20;
        m.r = 4;
        paint(m);
        front(m);
        frame(() =>
          frame(() => {
            ease([m], true);
            m.x = clamp(W / 2 - m.w / 2 + 30, 0, W - m.w);
            m.y = clamp(H - m.h - 110, 0, H - m.h);
            m.base = m.r = -2.5;
            paint(m);
            later(() => ta.focus({ preventScroll: true }), 350);
          }),
        );
      },
      on,
    );
    // sent: a stamp lands on the note, then it flies off the desk to Ayo
    function sent(el: HTMLElement) {
      const n = byEl.get(el)!;
      el.classList.remove(s.sending);
      el.classList.add(s.sent);
      el.querySelector("p")!.textContent = "Stuck to Ayo’s desk ✓";
      later(
        () => {
          if (!el.isConnected) return;
          ease([n], true);
          el.style.opacity = "0";
          n.y -= deck ? 0 : 60;
          n.x += deck ? W : 80;
          n.r += 12;
          paint(n);
          later(
            () => {
              removeMine();
              padLabel!.textContent = "Sent. Thank you.";
              pad!.focus({ preventScroll: true });
              later(() => (padLabel!.textContent = "Your turn."), 5000);
            },
            reduce ? 0 : 650,
          );
        },
        reduce ? 600 : 1500,
      );
    }

    // first time the board scrolls into view, the notes land one by one
    layout(false);
    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      notes.forEach((n) => {
        n.el.classList.add(s.pre);
        n.el.style.transform = `translate3d(${n.x}px,${n.y - 28}px,0) rotate(${n.r * 2}deg)`;
      });
      io = new IntersectionObserver(
        (es) => {
          if (!es[0].isIntersecting || dealt) return;
          dealt = true;
          io!.disconnect();
          notes.forEach((n, i) => {
            n.el.style.transitionDelay = i * 80 + "ms";
            ease([n], true);
            n.el.classList.remove(s.pre);
            paint(n);
          });
          later(
            () =>
              notes.forEach((n) => {
                n.el.style.transitionDelay = "";
                ease([n], false);
              }),
            1400,
          );
        },
        { threshold: 0.25 },
      );
      io.observe(board);
    }
    let rt = 0;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(rt);
        rt = window.setTimeout(() => {
          const was = deck;
          measure();
          if (was !== deck || !deck) layout(false);
          else {
            layoutDeck();
            notes.forEach(paint);
          }
        }, 150);
      },
      on,
    );
    document.fonts?.ready.then(() => {
      if (!ac.signal.aborted && !drag) layout(false);
    });

    return () => {
      ac.abort();
      io?.disconnect();
      clearTimeout(rt);
      timers.forEach(clearTimeout);
      frames.forEach(cancelAnimationFrame);
      mine?.el.remove();
      board.classList.remove(s.js, s.deck);
    };
  }, []);

  return { boardRef, tidyRef, countRef, padRef, padLabelRef, hintRef };
}
