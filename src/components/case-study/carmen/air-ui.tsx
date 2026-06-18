"use client";

import { useEffect, useRef, useState } from "react";

import { Ic } from "@/components/case-study/carmen/icons";

/* ---- deterministic soft avatar colour ---- */
const AIR_AVA = ["#6b8cff", "#f1719a", "#43b59a", "#f0a44a", "#9b6bf2", "#4aa3f0", "#e2657a", "#5bb85b"];

export function avaColor(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return AIR_AVA[Math.abs(h) % AIR_AVA.length];
}

export function initials(s: string): string {
  return s
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Ava({ name, size = 34, cls = "air-pava" }: { name: string; size?: number; cls?: string }) {
  return (
    <div className={cls} style={{ background: avaColor(name), width: size, height: size, fontSize: size * 0.36 }}>
      {initials(name)}
    </div>
  );
}

/* Browser-window chrome around a light product surface */
export function AirWindow({ url = "app.airstride.ai", children }: { url?: string; children: React.ReactNode }) {
  return (
    <div className="air-frame">
      <div className="air-bar">
        <div className="dots">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div className="url">
          <Ic n="lock" style={{ width: 11, height: 11 }} />
          <span>{url}</span>
        </div>
        <div style={{ width: 44 }}></div>
      </div>
      {children}
    </div>
  );
}

/* Reusable left sidebar (campaign + linkedin demos) */
const SIDEBAR_RECENTS = [
  "Wearable Health Devices",
  "Blockchain for Patients",
  "Virtual Reality in Therapy",
  "AI-Powered Assistants",
  "Secure Transactions",
];

export function AirSidebar({
  active,
  linkedinConnected = false,
}: {
  active?: string;
  linkedinConnected?: boolean;
}) {
  return (
    <aside className="air-side">
      <div className="air-brand">
        <span className="ring"></span>
        <b>Airstride</b>
      </div>
      <div className="air-switch">
        <span className="ic">
          <Ic n="building" />
        </span>
        <div>
          <div className="t">Workspace</div>
          <div className="n">Nextron Solutions</div>
        </div>
        <span className="chev">
          <Ic n="swap" />
        </span>
      </div>
      <div>
        <div className="air-navgroup">AI Partner Acquisition</div>
        <nav className="air-nav">
          <a>
            <span style={{ color: "var(--a-blue)" }}>
              <Ic n="plus" />
            </span>
            New Campaign
          </a>
          <a className={active === "campaigns" ? "on" : ""}>
            <Ic n="campaign" />
            Campaigns
          </a>
          <a className={active === "outreach" ? "on" : ""}>
            <Ic n="outreach" />
            Outreach
          </a>
          <a className={active === "intel" ? "on" : ""}>
            <Ic n="bulb" />
            Partner Intelligence
          </a>
        </nav>
      </div>
      <div>
        <div className="air-navgroup">Configuration</div>
        <nav className="air-nav">
          <a className={active === "linkedin" ? "on" : ""}>
            <Ic n="linkedin" />
            LinkedIn
            <span className={`badge ${linkedinConnected ? "green" : "red"}`}>
              {linkedinConnected ? "Connected" : "Not connected"}
            </span>
          </a>
          <a>
            <Ic n="mic" />
            Voice Profile
          </a>
        </nav>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div className="air-navgroup">Recents</div>
        <nav className="air-nav">
          {SIDEBAR_RECENTS.map((r) => (
            <a key={r} style={{ fontSize: 12.5, color: "var(--a-grey)" }}>
              <Ic n="campaign" style={{ opacity: 0.6 }} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export function AirTopbar({ crumb }: { crumb: React.ReactNode }) {
  return (
    <div className="air-topbar">
      {crumb}
      <div className="sp"></div>
      <div className="air-iconbtn" style={{ position: "relative" }}>
        <Ic n="msg" />
      </div>
      <div className="air-iconbtn">
        <Ic n="bell" />
      </div>
      <Ava name="Ayowande Olubo" size={30} cls="air-ava" />
    </div>
  );
}

/** Fires once when the element first scrolls into view. Drives the demos' "live" animations. */
export function useInView(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const node = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}
