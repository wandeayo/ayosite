"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { Img } from "../blocks";
import { ProtoFrame } from "../proto-frame";

/**
 * Fig. 2: the Airstride module explorer (case-study handoff, section 4.4).
 *
 * Seven tabs; the browser frame's URL follows the module, and the module's
 * number, heading and line sit under the frame. As the handoff asks for
 * production, the frame embeds Ayo's live demo instead of the reference's
 * still + "Play live demo" link:
 *
 * - Only the active module's iframe is mounted; switching unmounts the others.
 * - Each module's still stays up as the poster until its iframe has loaded.
 * - The demos render at 1280 × 859, the size the reference stills were taken
 *   at, so the frame shows exactly the reference's framing (800:537).
 * - Phones get ProtoFrame's preview + viewer, and the iframe only mounts once
 *   the viewer opens; the preview is just the still.
 * - The demo is unmounted while the explorer is off screen, so it isn't
 *   animating unseen (handoff section 6); it restarts when scrolled back.
 */

const DEMO_W = 1280;
const DEMO_H = 859;

const MODULES = [
  {
    slug: "overview",
    tab: "Overview",
    n: "00",
    title: "One surface for Monday morning.",
    line: "A five-step quickstart for new vendors, then a configurable scorecard, an attention queue and an AI briefing of the three things worth doing today.",
  },
  {
    slug: "deals",
    tab: "Deals",
    n: "01",
    title: "Every deal’s status, scannable without opening it.",
    line: "Clear deal states, focus filters that surface what needs action, and detail panels that open as overlays so the list stays in view.",
  },
  {
    slug: "account-mapping",
    tab: "Account mapping",
    n: "02",
    title: "Name what you need before you ask for it.",
    line: "The access scope is stated above the connect button, not buried in a permissions modal. Every connection state is distinct, and abandoned flows resume where they stopped.",
  },
  {
    slug: "analytics",
    tab: "Analytics",
    n: "03",
    title: "A different view of the same data.",
    line: "A customise overlay lets each person choose and arrange their own sections without changing what anyone else sees.",
  },
  {
    slug: "partner-training",
    tab: "Partner training",
    n: "04",
    title: "The same module, three different jobs.",
    line: "Vendors build, partner admins deploy, partner users complete. Upload material and let AI draft the module, or build it by hand.",
  },
  {
    slug: "content-library",
    tab: "Content library",
    n: "05",
    title: "Content access is a permissions problem first.",
    line: "Permissions live on the folder, not the file. Create a folder, mirror an existing source with a review step, or let Carmen sort it.",
  },
  {
    slug: "engagement",
    tab: "Engagement",
    n: "06",
    title: "Which partners are drifting.",
    line: "Five behavioural signals blend into one health score, so vendors act on the partners who crossed a threshold instead of reading an audit log.",
  },
] as const;

export function ModuleExplorer() {
  const [active, setActive] = useState(0);
  // Stills load the first time their module is shown, then stay for cross-fades.
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set([0]));
  const [loaded, setLoaded] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // A little margin so the demo is already loading as the frame scrolls in.
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = (n: number, focus = false) => {
    setActive(n);
    setLoaded(null);
    setSeen((s) => (s.has(n) ? s : new Set([...s, n])));
    if (focus) tabs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const last = MODULES.length - 1;
    const to = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    show(to, true);
  };

  const m = MODULES[active];

  return (
    <div className="mx" id="as-mods" ref={root}>
      <div className="mx-tabs" role="tablist" aria-label="Airstride modules" onKeyDown={onKey}>
        {MODULES.map((mod, i) => (
          <button
            key={mod.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`mx-tab-${mod.slug}`}
            aria-controls="mx-panel"
            className={i === active ? "mx-t on" : "mx-t"}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => show(i)}
          >
            {mod.tab}
          </button>
        ))}
      </div>

      <ProtoFrame
        tile="air"
        url={`app.airstride.ai/${m.slug}`}
        w={DEMO_W}
        h={DEMO_H}
        controls={false}
        viewClass="mx-view"
        label={`Airstride ${m.tab} demo`}
        rootProps={{ role: "tabpanel", id: "mx-panel", "aria-labelledby": `mx-tab-${m.slug}` }}
      >
        {({ open, small }) =>
          MODULES.map((mod, i) => {
            const on = i === active;
            // The live demo mounts for the active module only: in the viewer on phones,
            // otherwise while the explorer is on (or near) the screen.
            const live = on && (open || (!small && near));
            return (
              <div key={mod.slug} className={on ? "mx-p on" : "mx-p"} aria-hidden={on ? undefined : true}>
                {live && (
                  <iframe
                    src={`/work/airstride/${mod.slug}-demo/index.html`}
                    title={`Airstride ${mod.tab} module, live demo`}
                    width={DEMO_W}
                    height={DEMO_H}
                    loading="lazy"
                    onLoad={() => setLoaded(i)}
                  />
                )}
                {seen.has(i) && (
                  <Img
                    src={`/work/airstride/${mod.slug}`}
                    w={800}
                    h={537}
                    hi={2}
                    className={live && loaded === i ? "mx-poster out" : "mx-poster"}
                    alt={`Airstride ${mod.tab} module`}
                  />
                )}
              </div>
            );
          })
        }
      </ProtoFrame>

      <div className="mx-ds">
        {MODULES.map((mod, i) => (
          <div key={mod.slug} className={i === active ? "mx-d on" : "mx-d"} aria-hidden={i === active ? undefined : true}>
            <span className="mono">Module {mod.n}</span>
            <b>{mod.title}</b>
            <p>{mod.line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
