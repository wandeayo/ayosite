"use client";

import { useEffect, useState } from "react";

import { AirSidebar, AirTopbar, Ava, useInView } from "@/components/case-study/carmen/air-ui";
import { Ic, type IconName } from "@/components/case-study/carmen/icons";

/* ============================================================
   Campaign command center
   ============================================================ */

type StatusKey = "amber" | "green" | "red";

interface CampGroup {
  co: string;
  desc: string;
  meta: [string, string, string, string];
  people: [string, string, StatusKey][];
}

const CAMP_GROUPS: CampGroup[] = [
  {
    co: "Dariss Consulting",
    desc: "Dariss Consulting is a Senegalese IT integrator established in 2009, specialising in cloud, virtualization, disaster recovery and enterprise messaging.",
    meta: ["SME", "1–10", "$1M", "Growth"],
    people: [
      ["Sarah Johnson", "Product Manager", "amber"],
      ["David Lee", "Product Manager", "amber"],
      ["Jessica Williams", "Head of BD", "amber"],
    ],
  },
  {
    co: "CIS Networking",
    desc: "CIS Networking delivers managed network and connectivity services to mid-market enterprises across EMEA.",
    meta: ["SME", "11–50", "$4M", "Established"],
    people: [
      ["Michael Brown", "Product Manager", "amber"],
      ["Chris Davis", "Partnerships", "green"],
    ],
  },
  {
    co: "Crystal Tech",
    desc: "Crystal Tech builds integration tooling and developer platforms for cloud-native teams.",
    meta: ["Mid-market", "51–200", "$12M", "Scale"],
    people: [
      ["Emily Smith", "Product Manager", "amber"],
      ["Patricia Wilson", "Alliances Lead", "amber"],
      ["James Miller", "Product Manager", "green"],
    ],
  },
  {
    co: "Virtual Tech Malawi",
    desc: "Virtual Tech Malawi provides VR and immersive training solutions for healthcare and education.",
    meta: ["SME", "11–50", "$2M", "Growth"],
    people: [
      ["Robert Taylor", "Product Manager", "amber"],
      ["Emily Johnson", "UI/UX Designer", "green"],
      ["Michael Lin", "Software Engineer", "red"],
    ],
  },
];

const CAMP_NOTIF: { icon: IconName; title: string; sub: string; color: string }[] = [
  { icon: "msg", title: "2 positive replies waiting", sub: "Emily Davis and Marcus Chen", color: "#15924c" },
  { icon: "spark", title: "8 new partners suggested today", sub: "3 high-fit matches from your ICPs", color: "#9b6bf2" },
  { icon: "msg", title: "2 positive replies waiting", sub: "Jessica Williams and David Lee", color: "#15924c" },
];

const STATUS_PILL: Record<StatusKey, [StatusKey, string]> = {
  amber: ["amber", "Pending"],
  green: ["green", "Approved"],
  red: ["red", "Rejected"],
};

const TIMELINE: [string, string, string][] = [
  ["4 partners enriched", "14 contacts found, 24 messages generated", "22 min ago"],
  ["4 partners enriched", "14 contacts found, 24 messages generated", "22 min ago"],
  ["3 partners engaged", "10 contacts found, 18 messages generated", "14 hrs ago"],
];

type TabKey = "recipients" | "suggestions" | "exclusions" | "signed";
const TABS: [TabKey, string, number][] = [
  ["recipients", "Recipients", 16],
  ["suggestions", "Suggestions", 8],
  ["exclusions", "Exclusions", 3],
  ["signed", "Signed", 2],
];

const PAGINATION = ["‹", "1", "2", "3", "4", "5", "…", "10", "›"];

interface Selected {
  g: CampGroup;
  nm: string;
  rl: string;
}

export function CampaignDemo() {
  const [tab, setTab] = useState<TabKey>("recipients");
  const [sel, setSel] = useState<Selected | null>(null);
  const [prog, setProg] = useState(0);
  const [conns, setConns] = useState(127);
  const [ref, seen] = useInView();

  useEffect(() => {
    if (!seen) return;
    const t = setTimeout(() => setProg(64), 350);
    return () => clearTimeout(t);
  }, [seen]);

  useEffect(() => {
    if (!seen) return;
    const t = setInterval(() => setConns((c) => c + (Math.random() < 0.5 ? 1 : 0)), 2600);
    return () => clearInterval(t);
  }, [seen]);

  const metrics: { icon: IconName; label: string; value: string; sub: string; up: boolean }[] = [
    {
      icon: "linkedin",
      label: "LinkedIn Connections",
      value: String(conns),
      sub: conns - 127 ? `+${conns - 127} just now` : "38 pending",
      up: false,
    },
    { icon: "outreach", label: "Messages Sent", value: "289", sub: "LinkedIn 105 · Email 184", up: false },
    { icon: "msg", label: "Replies", value: "24", sub: "12 positive", up: false },
    { icon: "trend", label: "Response Rate", value: "18.9%", sub: "+2.4% vs. last week", up: true },
  ];

  return (
    <div ref={ref} className="air">
      <AirSidebar active="campaigns" linkedinConnected />
      <div className="air-main">
        <AirTopbar
          crumb={
            <div className="crumb">
              Campaigns / <b>Q3 Partnership Drive</b>
            </div>
          }
        />
        <div className="air-content" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* header */}
          <div className="air-card" style={{ padding: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: 20 }}>Q3 Partnership Drive</h3>
                  <span className="air-pill green">
                    <Ic n="trend" style={{ width: 12, height: 12 }} />
                    +12.4%
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--a-faint)",
                    marginTop: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      background: "#16a34a",
                      display: "inline-block",
                      boxShadow: "0 0 0 3px #e7f6ed",
                    }}
                  ></span>
                  Running continuously · Started 12 Jan 2026 · Day 24
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="air-btn pri">
                  <Ic n="pause" />
                  Pause campaign
                </button>
                <button className="air-iconbtn" style={{ border: "1px solid var(--a-line)" }}>
                  <Ic n="dots" />
                </button>
              </div>
            </div>
            <div className="air-divider" style={{ margin: "16px 0" }}></div>
            <div className="air-metrics">
              {metrics.map((m) => (
                <div key={m.label} className="air-metric">
                  <div className="mh">
                    <Ic n={m.icon} />
                    {m.label}
                  </div>
                  <div className="mv">{m.value}</div>
                  <div className={`ms ${m.up ? "up" : ""}`}>
                    {m.up && "↗ "}
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* timeline + what's happening */}
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
            <div className="air-card" style={{ padding: 16 }}>
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <b style={{ fontSize: 14 }}>Campaign Timeline</b>
                  <span className="air-pill blue" style={{ fontSize: 10 }}>
                    Live
                  </span>
                </div>
                <a style={{ fontSize: 12, color: "var(--a-blue)", fontWeight: 600, cursor: "pointer" }}>
                  All activities →
                </a>
              </div>
              <div className="air-tl-item">
                <span className="dot run">
                  <span className="air-typing" style={{ transform: "scale(0.7)" }}>
                    <i></i>
                    <i></i>
                    <i></i>
                  </span>
                </span>
                <div>
                  <div className="ti">Enriching partner contacts</div>
                  <div className="td">271 of 412 enriched · 3.2/min</div>
                  <div className="air-prog" style={{ marginTop: 8 }}>
                    <i style={{ width: prog + "%" }}></i>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--a-faint)", marginTop: 5 }}>
                    {prog}% · ~14 min remaining
                  </div>
                </div>
                <span className="tm">just now</span>
              </div>
              {TIMELINE.map((r, i) => (
                <div key={i} className="air-tl-item" style={{ borderTop: "1px solid var(--a-line-soft)" }}>
                  <span className="dot ok">
                    <Ic n="check" style={{ width: 12, height: 12 }} />
                  </span>
                  <div>
                    <div className="ti">{r[0]}</div>
                    <div className="td">{r[1]}</div>
                  </div>
                  <span className="tm">{r[2]}</span>
                </div>
              ))}
            </div>
            <div className="air-card" style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <b style={{ fontSize: 14 }}>What&rsquo;s happening</b>
                <span className="air-pill amber" style={{ fontSize: 10 }}>
                  4
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {CAMP_NOTIF.map((n, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 11,
                      alignItems: "flex-start",
                      padding: "11px 0",
                      borderTop: i ? "1px solid var(--a-line-soft)" : 0,
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        flex: "none",
                        display: "grid",
                        placeItems: "center",
                        background: n.color + "1a",
                        color: n.color,
                      }}
                    >
                      <Ic n={n.icon} style={{ width: 15, height: 15 }} fill={n.icon === "spark"} />
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div>
                      <div style={{ fontSize: 11.5, color: "var(--a-faint)" }}>{n.sub}</div>
                    </div>
                    <a style={{ fontSize: 12, color: "var(--a-blue)", fontWeight: 600, cursor: "pointer" }}>View</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* potential partners */}
          <div className="air-card" style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <b style={{ fontSize: 15 }}>Potential Partners</b>
              <button className="air-iconbtn" style={{ border: "1px solid var(--a-line)" }}>
                <Ic n="dots" />
              </button>
            </div>
            <div className="air-tabs" style={{ marginTop: 12 }}>
              {TABS.map(([id, lb, c]) => (
                <div key={id} className={`air-tab ${tab === id ? "on" : ""}`} onClick={() => setTab(id)}>
                  {lb}
                  <span className="c">{c}</span>
                </div>
              ))}
            </div>

            {tab === "recipients" && (
              <div style={{ marginTop: 6 }}>
                <div className="air-chat-input" style={{ borderRadius: 9, padding: "8px 12px", margin: "10px 0 4px" }}>
                  <Ic n="search" style={{ width: 16, height: 16, color: "var(--a-faint)" }} />
                  <input placeholder="Search partners or contacts…" readOnly />
                </div>
                {CAMP_GROUPS.map((g) => (
                  <div key={g.co}>
                    <div className="air-group-h">
                      <Ic n="chevD" />
                      {g.co}
                    </div>
                    {g.people.map(([nm, rl, st]) => (
                      <div key={nm} className="air-plist-row" onClick={() => setSel({ g, nm, rl })}>
                        <Ava name={nm} />
                        <div style={{ flex: 1 }}>
                          <div className="nm">{nm}</div>
                          <div className="rl">{rl}</div>
                        </div>
                        <span className={`air-pill ${STATUS_PILL[st][0]}`}>
                          <span className="d"></span>
                          {STATUS_PILL[st][1]}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
                <div
                  style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 14, alignItems: "center" }}
                >
                  {PAGINATION.map((p, i) => (
                    <span
                      key={i}
                      style={{
                        minWidth: 28,
                        height: 28,
                        padding: "0 7px",
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 7,
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: "pointer",
                        background: p === "1" ? "var(--a-blue)" : "transparent",
                        color: p === "1" ? "#fff" : "var(--a-grey)",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {tab !== "recipients" && (
              <div className="air-empty">
                <div className="ic">
                  <Ic n={tab === "signed" ? "check" : "spark"} fill={tab !== "signed"} />
                </div>
                <div className="t">
                  {tab === "suggestions"
                    ? "Carmen refreshes suggestions continuously"
                    : tab === "exclusions"
                      ? "No partners excluded yet"
                      : "No signed partners yet"}
                </div>
                <div className="s">
                  {tab === "suggestions"
                    ? "New high-fit partners surface as the campaign runs, based on your ICP and engagement signals."
                    : tab === "exclusions"
                      ? "Partners you exclude will be kept out of every future campaign."
                      : "Closed partnerships move here once a deal is registered."}
                </div>
                {tab === "suggestions" && (
                  <button className="air-btn pri" style={{ marginTop: 14 }}>
                    <Ic n="spark" fill />
                    Suggest partners
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* partner modal */}
        {sel && (
          <div className="air-modal-wrap" onClick={() => setSel(null)}>
            <div className="air-modal" onClick={(e) => e.stopPropagation()}>
              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <Ava name={sel.g.co} size={40} />
                    <div>
                      <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: 17 }}>{sel.g.co}</h3>
                      <div style={{ fontSize: 12, color: "var(--a-faint)" }}>
                        via {sel.nm} · {sel.rl}
                      </div>
                    </div>
                  </div>
                  <button className="air-iconbtn" onClick={() => setSel(null)}>
                    <Ic n="x" />
                  </button>
                </div>
                <p style={{ fontSize: 13, color: "var(--a-grey)", lineHeight: 1.55, margin: "14px 0" }}>
                  {sel.g.desc}
                </p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
                  {([
                    ["building", sel.g.meta[0]],
                    ["users", sel.g.meta[1]],
                    ["trend", sel.g.meta[2]],
                    ["target", sel.g.meta[3]],
                  ] as [IconName, string][]).map(([ic, v]) => (
                    <div
                      key={v}
                      style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--a-grey)" }}
                    >
                      <Ic n={ic} style={{ width: 15, height: 15, color: "var(--a-faint)" }} />
                      {v}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="air-btn ghost" style={{ flex: 1, justifyContent: "center" }}>
                    <Ic n="linkedin" />
                    LinkedIn
                  </button>
                  <button className="air-btn ghost" style={{ flex: 1, justifyContent: "center" }}>
                    <Ic n="globe" />
                    Website
                  </button>
                  <button className="air-btn danger">
                    <Ic n="x" />
                    Exclude
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
