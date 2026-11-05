"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { Img } from "../blocks";
import { AVATAR, ONBOARDING_LEFT, PARTNER_LOGO } from "./assets";
import { AppShell, FeedbackOpening } from "./shell";

/**
 * Fig. 2: the setup flow, following the Figma file. Port of "Prototype A" in
 * reference/carmen.html: org → setup → research (adjust) → scan → 5 cards →
 * review → saving → saved → "Find more partners in chat" scrolls to Fig. 3.
 * Restarting remounts this component (ProtoFrame), which clears every timer.
 */

/*
 * Product headings keep their tags (the prototype CSS styles them by element) but sit at
 * level 3 in the page outline, under the section's H2, via aria-level.
 */

/**
 * CloudBridge is real, from Figma. Partners 2–5 are placeholder scores, facts
 * and reasons (handoff section 4.2): replace with Ayo's real values.
 */
const PARTNERS = [
  {
    n: "CloudBridge Solutions",
    m: "Cloudbridgesolutions@gmail.com",
    p: 65,
    co: "United Kingdom",
    sz: "10-50",
    rg: "EMEA",
    ind: ["B2B SaaS", "Enterprise Software", "Cloud & Infrastructure", "Channel & Partnerships"],
    why: [
      "Serves your exact ICP, mid-market SaaS companies",
      "Active partner program with 18 vendor integrations",
      "Strong UK presence with expanding EMEA footprint",
    ],
  },
  {
    n: "TechSavvy Innovations",
    m: "techsavvyinnovations@gmail.com",
    p: 41,
    co: "United States",
    sz: "200-500",
    rg: "North America",
    ind: ["Consumer Tech", "Hardware"],
    why: ["Large reseller network in consumer hardware", "Some overlap with channel sales automation", "Limited presence in your priority regions"],
  },
  {
    n: "GreenWave Technologies",
    m: "greenwavetech@gmail.com",
    p: 78,
    co: "Germany",
    sz: "50-200",
    rg: "EMEA",
    ind: ["B2B SaaS", "Cloud & Infrastructure"],
    why: ["Resells cloud tooling to mid-market SaaS", "Runs a co-sell program with 12 partners", "Growing DACH and UK pipeline"],
  },
  {
    n: "DataPulse Analytics",
    m: "datapulseanalytics@gmail.com",
    p: 38,
    co: "Canada",
    sz: "10-50",
    rg: "North America",
    ind: ["Data Analytics", "Consulting"],
    why: ["Analytics consultancy for enterprise teams", "No formal partner program yet", "Small overlap with your ICP"],
  },
  {
    n: "NextGen Systems",
    m: "nextgensystems@gmail.com",
    p: 72,
    co: "United Kingdom",
    sz: "50-200",
    rg: "EMEA",
    ind: ["Enterprise Software", "Channel & Partnerships"],
    why: ["Integrator for enterprise SaaS stacks", "Dedicated alliances team of six", "Strong UK presence"],
  },
] as const;

const TAG_GROUPS = [
  ["Region", ["North America", "EMEA", "United Kingdom"]],
  ["Product Focus", ["Partner Relationship Management", "Channel Sales Automation", "AI-Powered Outreach"]],
  ["Industries", ["B2B SaaS", "Enterprise Software", "Cloud & Infrastructure", "Channel & Partnerships"]],
] as const;

const NOTE_IDLE = "Is this correct? Adjust the regions and industries above, or confirm to find partners.";
const NOTE_ADJUSTING = "Tap a region, focus or industry to include or exclude it.";

const SETUP_TASKS = [
  ["Setting up your organisation", "Creating your workspace and configuring account settings"],
  ["Researching your company", "Analysing vendor positioning, ICP, and partner-readiness signals"],
] as const;
const SCAN_TASKS = [
  ["Scanning partner database", "Searching across verified 85,000+ companies to find potential matches"],
  ["Selecting top 5 sample partners", "Shortlisting high-fit partners based on your goals and ICP"],
  ["Scoring against your Ideal Customer Profile (ICP) filters", "Evaluating each partner against your criteria to rank best fits"],
] as const;

type View = "org" | "setup" | "research" | "scan" | "card" | "review";
type TaskState = "" | "run" | "done";

const STEP_LABELS = ["Create profile", "Update profile", "Assess partners", "Review matches"];
/** [done, current] for the progress steps in each view. */
const STEPS: Record<View, [number, number]> = {
  org: [0, 1],
  setup: [0, 1],
  research: [1, 2],
  scan: [2, 3],
  card: [3, 4],
  review: [4, 0],
};

const RING = 97.4; // circumference of r=15.5

function Tasks({ items, states, barRef }: { items: ReadonlyArray<readonly [string, string]>; states: TaskState[]; barRef: (i: number) => (el: HTMLElement | null) => void }) {
  return (
    <>
      {items.map(([title, line], i) => {
        const s = states[i] ?? "";
        return (
          <div key={title} className={`fa-task ${s}`} data-t={i}>
            <span className="fa-ti">{s === "done" ? "✓" : s === "run" ? "" : String(i + 1)}</span>
            <span className="fa-tt">
              <b>{title}</b>
              <small>{line}</small>
              <i className="fa-bar">
                <i ref={barRef(i)} />
              </i>
            </span>
            <em className="fa-chip">{s === "done" ? "↗ Completed" : s === "run" ? "↗ In progress" : "↗ Pending"}</em>
          </div>
        );
      })}
    </>
  );
}

export function SetupProto() {
  const [view, setView] = useState<View>("org");
  const [setupTasks, setSetupTasks] = useState<TaskState[]>([]);
  const [scanTasks, setScanTasks] = useState<TaskState[]>([]);
  const [adjusting, setAdjusting] = useState(false);
  const [excluded, setExcluded] = useState<ReadonlySet<string>>(new Set());
  const [idx, setIdx] = useState(0);
  const [dec, setDec] = useState<boolean[]>([]);
  const [saving, setSaving] = useState<null | "saving" | "saved">(null);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Progress bars are driven imperatively, as in the reference: snap to 38%,
  // then run to 100% over `ms`. Each bar is only visible while its task runs.
  const bars = useRef(new Map<string, HTMLElement>());
  const barRef = (group: string) => (i: number) => (el: HTMLElement | null) => {
    if (el) bars.current.set(`${group}${i}`, el);
    else bars.current.delete(`${group}${i}`);
  };
  const runBar = (group: string, i: number, ms: number) => {
    const b = bars.current.get(`${group}${i}`);
    if (!b) return;
    b.style.transition = "none";
    b.style.width = "38%";
    void b.offsetWidth;
    b.style.transition = `width ${ms}ms linear`;
    b.style.width = "100%";
  };

  // A task's bar runs once the task is rendered as running: 1.7s in setup;
  // 1.4s then 1.2s in the scan, as in the reference.
  useLayoutEffect(() => {
    const i = setupTasks.indexOf("run");
    if (i >= 0) runBar("setup", i, 1700);
  }, [setupTasks]);
  useLayoutEffect(() => {
    const i = scanTasks.indexOf("run");
    if (i >= 0) runBar("scan", i, i === 1 ? 1400 : 1200);
  }, [scanTasks]);

  const goCard = useCallback(() => {
    setIdx(0);
    setDec([]);
    setView("card");
  }, []);

  const goSetup = () => {
    setView("setup");
    setSetupTasks(["done", "run"]);
    later(() => {
      setSetupTasks(["done", "done"]);
      later(() => {
        setView("research");
        setAdjusting(false);
      }, 600);
    }, 1750);
  };

  const goScan = () => {
    setView("scan");
    setScanTasks(["done", "run", ""]);
    later(() => {
      setScanTasks(["done", "done", "run"]);
      later(() => {
        setScanTasks(["done", "done", "done"]);
        later(goCard, 500);
      }, 1250);
    }, 1450);
  };

  const chatBtn = useRef<HTMLButtonElement>(null);
  const goSave = () => {
    setSaving("saving");
    later(() => {
      setSaving("saved");
      requestAnimationFrame(() => chatBtn.current?.focus({ preventScroll: true }));
    }, 2200);
  };

  const decide = (yes: boolean) => {
    const next = [...dec];
    next[idx] = yes;
    setDec(next);
    if (idx < 4) setIdx(idx + 1);
    else setView("review");
  };

  // The match ring animates from empty to the partner's score on every card.
  const arc = useRef<SVGCircleElement>(null);
  useEffect(() => {
    if (view !== "card" || !arc.current) return;
    const a = arc.current;
    a.setAttribute("stroke-dasharray", `0 ${RING}`);
    const raf = requestAnimationFrame(() => a.setAttribute("stroke-dasharray", `${((RING * PARTNERS[idx].p) / 100).toFixed(1)} ${RING}`));
    return () => cancelAnimationFrame(raf);
  }, [view, idx]);

  const [done, cur] = STEPS[view];
  const p = PARTNERS[idx];
  const arcColour = p.p >= 60 ? "#7cb342" : p.p >= 45 ? "#e0a23a" : "#d9534f";

  return (
    <>
      <Img {...ONBOARDING_LEFT} className="fa-left" alt="Welcome to Airstride: automate partner growth, drive revenue" />
      <div className="fa-right">
        <ol className="fa-steps" aria-label="Onboarding progress">
          {STEP_LABELS.map((label, i) => (
            <li key={label} className={[i < done && "done", i === cur - 1 && "cur"].filter(Boolean).join(" ") || undefined}>
              <i>{i + 1}</i>
              <span>{label}</span>
            </li>
          ))}
        </ol>

        <section className="fa-v" data-v="org" hidden={view !== "org"}>
          <h5 className="fa-h" aria-level={3}>Create your organisation</h5>
          <p className="fa-sub">Tell us a bit about your company. We will use this to personalise your experience</p>
          <label className="fa-lbl">
            Organisation Name <em>*</em>
          </label>
          <div className="fa-in">
            Airstride <span>⌄</span>
          </div>
          <label className="fa-lbl">
            Website <em>*</em>
          </label>
          <div className="fa-in">
            airstride.ai <span>⌄</span>
          </div>
          <button className="fa-btn wide" type="button" onClick={goSetup}>
            Create organisation
          </button>
          <p className="fa-help">You can update these details later in settings</p>
        </section>

        <section className="fa-v" data-v="setup" hidden={view !== "setup"}>
          <h5 className="fa-h" aria-level={3}>Setting up your account…</h5>
          <p className="fa-sub">Analysing your company information. This takes about a minute</p>
          <Tasks items={SETUP_TASKS} states={setupTasks} barRef={barRef("setup")} />
        </section>

        <section className={adjusting ? "fa-v fa-card fa-research adjusting" : "fa-v fa-card fa-research"} data-v="research" hidden={view !== "research"}>
          <div className="fa-carmen">
            <Img {...AVATAR} alt="" />
            <b>CARMEN-AI</b>
            <em className="fa-chip ok">↗ Research completed</em>
          </div>
          <h6 aria-level={3}>Your Business</h6>
          <p className="fa-p">
            Airstride is an AI-powered partnership management platform that helps B2B SaaS companies discover, recruit, and
            manage channel partners at scale. Conversational AI agent (Carmen) that automates partner acquisition, co-sell
            planning, and campaign management — replacing manual partner ops.
          </p>
          <h6 aria-level={3}>Your Market</h6>
          {TAG_GROUPS.map(([group, tags]) => (
            <TagGroup
              key={group}
              group={group}
              tags={tags}
              excluded={excluded}
              onToggle={(t) => {
                if (!adjusting) return;
                const next = new Set(excluded);
                if (next.has(t)) next.delete(t);
                else next.add(t);
                setExcluded(next);
              }}
            />
          ))}
          <div className="fa-two">
            <button className="fa-btn ghost" type="button" onClick={() => setAdjusting(!adjusting)}>
              {adjusting ? "Done adjusting" : "Adjust research"}
            </button>
            <button className="fa-btn" type="button" onClick={goScan}>
              See sample partners
            </button>
          </div>
          <p className="fa-help" id="pa-note">
            {adjusting ? NOTE_ADJUSTING : NOTE_IDLE}
          </p>
        </section>

        <section className="fa-v" data-v="scan" hidden={view !== "scan"}>
          <h5 className="fa-h" aria-level={3}>Scanning partner database…</h5>
          <p className="fa-sub">Searching across 85,000+ partner companies</p>
          <Tasks items={SCAN_TASKS} states={scanTasks} barRef={barRef("scan")} />
        </section>

        <section className="fa-v fa-card fa-partner" data-v="card" hidden={view !== "card"}>
          <div className="fa-ph">
            <span id="pa-of">{idx + 1} of 5 PARTNERS</span>
            <span className="fa-dash" id="pa-dash">
              {PARTNERS.map((_, i) => (
                <i key={i} className={i <= idx ? "on" : undefined} />
              ))}
            </span>
          </div>
          <div className="fa-who">
            <Img {...PARTNER_LOGO} alt="" />
            <span>
              <b id="pa-name">{p.n}</b>
              <small id="pa-mail">{p.m}</small>
            </span>
            <span className="fa-ring" id="pa-ring">
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e8edd9" strokeWidth="3" />
                <circle
                  id="pa-arc"
                  ref={arc}
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke={arcColour}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`0 ${RING}`}
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <b id="pa-pct">{p.p}%</b>
            </span>
            <span className="fa-mt">Match</span>
          </div>
          <div className="fa-facts">
            <div>
              <small>Company Name</small>
              <b id="pa-cn">{p.n}</b>
            </div>
            <div>
              <small>Country</small>
              <b id="pa-co">{p.co}</b>
            </div>
            <div>
              <small>Company Size</small>
              <b id="pa-sz">{p.sz}</b>
            </div>
            <div>
              <small>Region</small>
              <b id="pa-rg">{p.rg}</b>
            </div>
            <div className="fa-ind">
              <small>Industry</small>
              <div className="fa-tags ro" id="pa-ind">
                {p.ind.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="fa-why">
            <b>Why Carmen matched you</b>
            <ul id="pa-why">
              {p.why.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="fa-two">
            <button className="fa-btn ghost" type="button" onClick={() => decide(false)}>
              ✕&nbsp; Not a fit
            </button>
            <button className="fa-btn" type="button" onClick={() => decide(true)}>
              ✓&nbsp; Good match
            </button>
          </div>
        </section>

        <section className="fa-v" data-v="review" hidden={view !== "review"}>
          <h5 className="fa-h" aria-level={3}>Review your matches</h5>
          <p className="fa-sub">Approve or reject each partner, this teaches Carmen your preferences.</p>
          <ul className="fa-rows" id="pa-rows">
            {view === "review" &&
              PARTNERS.map((pt, i) => (
                <li key={pt.n} className={dec[i] ? "y" : "n"} style={{ animationDelay: `${i * 70}ms` }}>
                  <Img {...PARTNER_LOGO} alt="" />
                  <span>
                    <b>{pt.n}</b>
                    <small>{pt.m}</small>
                  </span>
                  <em>↗ {dec[i] ? "Matched" : "Not matched"}</em>
                </li>
              ))}
          </ul>
          <div className="fa-end">
            <button className="fa-btn ghost" type="button" onClick={goCard}>
              Edit choices
            </button>
            <button className="fa-btn" type="button" onClick={goSave}>
              Save preferences
            </button>
          </div>
        </section>
      </div>

      <div className="fa-shellwrap" id="pa-shell" hidden={!saving}>
        <AppShell>
          <div className="fs-log" aria-hidden="true">
            <FeedbackOpening />
            <div className="fs-sugg">
              <small>Suggestions to find more partners</small>
              <div>
                <button type="button" tabIndex={-1}>
                  Yes, find more like these
                </button>
                <button type="button" tabIndex={-1}>
                  Focus on EMEA only
                </button>
              </div>
            </div>
          </div>
          <div className="fs-comp">
            <span>+</span>
            <span className="ph">Type your message...</span>
            <b>↑</b>
          </div>
        </AppShell>
        <div className="fa-scrim">
          <div className="fa-modal" id="pa-modal">
            <span className="fa-dots" id="pa-dots" hidden={saving === "saved"}>
              <i />
              <i />
              <i />
            </span>
            <span className="fa-seal" id="pa-seal" hidden={saving !== "saved"}>
              ✓
            </span>
            <b id="pa-mt">{saving === "saved" ? "Match preferences saved" : "Saving your match preferences…"}</b>
            <p id="pa-ms">
              {saving === "saved"
                ? "Everything’s set! You’re all set to explore exciting new partnerships."
                : "Saving your partner preferences so Carmen understands your ideal partner."}
            </p>
            <div className="fa-info">
              <span>i</span>Carmen is currently analysing your matched partners to understand your ideal profile. This takes a
              few seconds
            </div>
            <hr />
            <small>This usually takes 5 - 10 seconds</small>
            <button
              className="fa-btn sm"
              type="button"
              id="pa-chat"
              ref={chatBtn}
              disabled={saving !== "saved"}
              onClick={() =>
                document.getElementById("fig-chat")?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                  block: "center",
                })
              }
            >
              Find more partners in chat
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function TagGroup({
  group,
  tags,
  excluded,
  onToggle,
}: {
  group: string;
  tags: readonly string[];
  excluded: ReadonlySet<string>;
  onToggle: (tag: string) => void;
}) {
  return (
    <>
      <span className="fa-mk">{group}</span>
      <div className="fa-tags">
        {tags.map((t) => (
          <button key={t} type="button" aria-pressed={!excluded.has(t)} onClick={() => onToggle(t)}>
            {t}
          </button>
        ))}
      </div>
    </>
  );
}
