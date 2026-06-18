"use client";

import { Fragment, useEffect, useState } from "react";

import { Ava } from "@/components/case-study/carmen/air-ui";
import { Ic } from "@/components/case-study/carmen/icons";

/* ============================================================
   Conversational onboarding (research -> assess -> teach)
   ============================================================ */

interface ObPartner {
  name: string;
  dom: string;
  match: number;
  tags: string[];
}

const OB_PARTNERS: ObPartner[] = [
  { name: "NextGen Systems", dom: "nextgensystems.io", match: 72, tags: ["Integration Services", "North America"] },
  { name: "CloudBridge Solutions", dom: "cloudbridge.io", match: 65, tags: ["Cloud Infrastructure", "EMEA"] },
  { name: "GreenWave Technologies", dom: "greenwavetech.com", match: 58, tags: ["Data Storage", "United Kingdom"] },
  { name: "TechSavvy Innovations", dom: "techsavvy.io", match: 44, tags: ["DevOps Tooling", "EMEA"] },
  { name: "DataPulse Analytics", dom: "datapulse.ai", match: 37, tags: ["Analytics", "United Kingdom"] },
];

const OB_SCAN: [string, string][] = [
  ["Scanning partner database", "Searching across 85,000+ verified companies"],
  ["Selecting top 5 sample partners", "Shortlisting high-fit partners for your ICP"],
  ["Scoring against your ICP filters", "Ranking each partner against your criteria"],
];

const OB_MARKET: [string, string[]][] = [
  ["Region", ["North America", "EMEA", "United Kingdom"]],
  ["Product Focus", ["Partner Relationship Mgmt", "Channel Sales Automation", "AI-Powered Outreach"]],
  ["Industries", ["B2B SaaS", "Enterprise Software", "Cloud & Infrastructure"]],
];

const STEPS = ["Create profile", "Update profile", "Assess partners", "Review matches"];

type ObStep = "research" | "scan" | "review" | "saved";
type Decision = "yes" | "no";

export function OnboardingDemo() {
  const [step, setStep] = useState<ObStep>("research");
  const [scanI, setScanI] = useState(0);
  const [decn, setDecn] = useState<Record<string, Decision>>({});

  const stepIdx: number = { research: 1, scan: 2, review: 3, saved: 3 }[step];

  useEffect(() => {
    if (step !== "scan") return;
    setScanI(0);
    let i = 0;
    let to: ReturnType<typeof setTimeout> | undefined;
    const t = setInterval(() => {
      i++;
      setScanI(i);
      if (i >= OB_SCAN.length) {
        clearInterval(t);
        to = setTimeout(() => setStep("review"), 700);
      }
    }, 850);
    return () => {
      clearInterval(t);
      clearTimeout(to);
    };
  }, [step]);

  const approved = Object.values(decn).filter((v) => v === "yes").length;
  const decided = Object.keys(decn).length;

  return (
    <div className="air no-side">
      <div className="air-main">
        <div className="air-content" style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
          {/* stepper */}
          <div className="air-stepper" style={{ marginBottom: 26 }}>
            {STEPS.map((s, i) => (
              <Fragment key={s}>
                <div
                  className={`st ${i + 1 < stepIdx || (step === "saved" && i + 1 <= 4) ? "done" : ""} ${
                    i + 1 === stepIdx ? "on" : ""
                  }`}
                >
                  <span className="n">
                    {i + 1 < stepIdx ? <Ic n="check" style={{ width: 15, height: 15 }} /> : i + 1}
                  </span>
                  <span className="lb">{s}</span>
                </div>
                {i < 3 && <div className={`bar ${i + 1 < stepIdx ? "fill" : ""}`}></div>}
              </Fragment>
            ))}
          </div>

          {step === "research" && (
            <div className="air-card" style={{ padding: 20 }}>
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      background: "linear-gradient(135deg,#2367f1,#f124b3)",
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                    }}
                  >
                    <Ic n="spark" style={{ width: 15, height: 15 }} fill />
                  </span>
                  <b style={{ fontFamily: "var(--font-jakarta)" }}>CARMEN&nbsp;AI</b>
                </div>
                <span className="air-pill green">
                  <span className="d"></span>Research completed
                </span>
              </div>
              <h4 style={{ fontSize: 15, marginBottom: 6 }}>Your Business</h4>
              <p style={{ fontSize: 13, color: "var(--a-grey)", lineHeight: 1.55, marginBottom: 18 }}>
                Airstride is an AI-powered partnership platform that helps B2B SaaS companies discover, recruit, and
                manage channel partners at scale, replacing manual partner ops with an autonomous agent.
              </p>
              <h4 style={{ fontSize: 15, marginBottom: 10 }}>Your Market</h4>
              {OB_MARKET.map(([lb, items]) => (
                <div key={lb} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--a-grey)", marginBottom: 6 }}>{lb}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {items.map((t) => (
                      <span key={t} className="air-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <button className="air-btn ghost">
                  <Ic n="refresh" />
                  Adjust research
                </button>
                <button className="air-btn pri" onClick={() => setStep("scan")}>
                  <Ic n="spark" fill />
                  See sample partners
                </button>
              </div>
              <p style={{ fontSize: 12, color: "var(--a-faint)", marginTop: 12, textAlign: "center" }}>
                Is this correct? Adjust the regions and industries above, or confirm to find partners.
              </p>
            </div>
          )}

          {step === "scan" && (
            <div className="air-card" style={{ padding: 22 }}>
              <h4 style={{ fontSize: 16, marginBottom: 2 }}>Scanning partner database…</h4>
              <p style={{ fontSize: 13, color: "var(--a-faint)", marginBottom: 18 }}>
                Searching across 85,000+ partner companies
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {OB_SCAN.map((s, i) => {
                  const state = i < scanI ? "done" : i === scanI ? "run" : "wait";
                  return (
                    <div
                      key={s[0]}
                      className="air-card"
                      style={{
                        padding: "13px 15px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        opacity: state === "wait" ? 0.55 : 1,
                      }}
                    >
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 999,
                          flex: "none",
                          display: "grid",
                          placeItems: "center",
                          background: state === "done" ? "#e7f6ed" : state === "run" ? "var(--a-blue-soft)" : "#f1f3f6",
                          color: state === "done" ? "#15924c" : state === "run" ? "var(--a-blue)" : "var(--a-faint)",
                        }}
                      >
                        {state === "done" ? (
                          <Ic n="check" style={{ width: 15, height: 15 }} />
                        ) : state === "run" ? (
                          <span className="air-typing">
                            <i></i>
                            <i></i>
                            <i></i>
                          </span>
                        ) : (
                          i + 1
                        )}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s[0]}</div>
                        <div style={{ fontSize: 12, color: "var(--a-faint)" }}>{s[1]}</div>
                      </div>
                      <span
                        className="air-pill"
                        style={{
                          background: state === "done" ? "#e7f6ed" : state === "run" ? "var(--a-blue-soft)" : "#f1f3f6",
                          color: state === "done" ? "#15924c" : state === "run" ? "var(--a-blue)" : "var(--a-faint)",
                        }}
                      >
                        {state === "done" ? "Completed" : state === "run" ? "In progress" : "Pending"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === "review" && (
            <div>
              <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: 20, marginBottom: 3 }}>Review your matches</h3>
              <p style={{ fontSize: 13, color: "var(--a-grey)", marginBottom: 16 }}>
                Approve or reject each partner. This is what teaches Carmen your preferences.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {OB_PARTNERS.map((p) => {
                  const d = decn[p.name];
                  return (
                    <div
                      key={p.name}
                      className="air-card"
                      style={{
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        borderColor: d === "yes" ? "#bfe6cd" : d === "no" ? "#f3c9c9" : "var(--a-line)",
                        background: d === "yes" ? "#f4fbf6" : d === "no" ? "#fdf6f6" : "#fff",
                      }}
                    >
                      <Ava name={p.name} size={36} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                        <div
                          style={{ fontSize: 12, color: "var(--a-faint)", display: "flex", gap: 6, flexWrap: "wrap" }}
                        >
                          {p.tags.map((t) => (
                            <span key={t}>· {t}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", marginRight: 4 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            fontFamily: "var(--font-jakarta)",
                            fontSize: 16,
                            color: p.match >= 55 ? "#15924c" : "#d98318",
                          }}
                        >
                          {p.match}%
                        </div>
                        <div style={{ fontSize: 10.5, color: "var(--a-faint)" }}>Match</div>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => setDecn({ ...decn, [p.name]: "no" })}
                          title="Reject"
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 9,
                            border: "1px solid " + (d === "no" ? "#e88" : "var(--a-line)"),
                            background: d === "no" ? "#fdecec" : "#fff",
                            color: d === "no" ? "#d9484b" : "var(--a-faint)",
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Ic n="x" style={{ width: 16, height: 16 }} />
                        </button>
                        <button
                          onClick={() => setDecn({ ...decn, [p.name]: "yes" })}
                          title="Approve"
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 9,
                            border: "1px solid " + (d === "yes" ? "#7cc596" : "var(--a-line)"),
                            background: d === "yes" ? "#e7f6ed" : "#fff",
                            color: d === "yes" ? "#15924c" : "var(--a-faint)",
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Ic n="check" style={{ width: 16, height: 16 }} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 18,
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ fontSize: 12.5, color: "var(--a-grey)" }}>
                  {decided === 0 ? (
                    "Carmen learns from every decision you make."
                  ) : (
                    <>
                      <b style={{ color: "var(--a-ink)" }}>{approved} approved</b> · {decided - approved} rejected ·{" "}
                      {OB_PARTNERS.length - decided} left
                    </>
                  )}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="air-btn ghost" onClick={() => setDecn({})}>
                    Reset
                  </button>
                  <button className="air-btn pri" disabled={decided === 0} onClick={() => setStep("saved")}>
                    Save preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "saved" && (
            <div style={{ textAlign: "center", padding: "24px 10px" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 auto 16px",
                  borderRadius: 999,
                  background: "#16a34a",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  boxShadow: "0 10px 30px -8px rgba(22,163,74,0.5)",
                }}
              >
                <Ic n="check" style={{ width: 34, height: 34 }} strokeWidth={2.5} />
              </div>
              <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: 20 }}>Match preferences saved</h3>
              <p style={{ fontSize: 13.5, color: "var(--a-grey)", maxWidth: 360, margin: "6px auto 0" }}>
                Carmen is analysing the {approved || "matched"} partner{approved === 1 ? "" : "s"} you approved to
                understand your ideal profile, then sources more like them on her own.
              </p>
              <div
                className="air-card"
                style={{
                  maxWidth: 380,
                  margin: "18px auto 0",
                  padding: "11px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  textAlign: "left",
                }}
              >
                <span style={{ color: "var(--a-blue)" }}>
                  <Ic n="clock" />
                </span>
                <span style={{ fontSize: 12.5, color: "var(--a-grey)" }}>This usually takes 5 to 10 seconds.</span>
              </div>
              <button
                className="air-btn pri"
                style={{ marginTop: 18 }}
                onClick={() => {
                  setDecn({});
                  setStep("research");
                }}
              >
                <Ic n="refresh" />
                Replay the flow
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
