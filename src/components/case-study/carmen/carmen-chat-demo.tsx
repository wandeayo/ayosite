"use client";

import { useEffect, useRef, useState } from "react";

import { AirSidebar } from "@/components/case-study/carmen/air-ui";
import { Ic } from "@/components/case-study/carmen/icons";

/* ============================================================
   Carmen chat. How vendors configure and steer the agent
   ============================================================ */

const CHAT_SUGG = ["Yes, find more like these", "Focus on EMEA only", "Prioritise cloud infrastructure"];

const CHAT_REPLIES: Record<string, string> = {
  "Yes, find more like these":
    "On it. I'm expanding your shortlist now using the patterns from your three matches. New high-fit partners will surface in your campaign as I find them.",
  "Focus on EMEA only":
    "Got it. I'll narrow sourcing to EMEA and re-rank your pipeline. You'll see the updated matches in a moment.",
  "Prioritise cloud infrastructure":
    "Understood. I'll weight cloud-infrastructure partners higher and surface the strongest fits first.",
  _default: "Understood. I've noted that, and I'll factor it into how I source and rank your next partners.",
};

interface ChatMsg {
  who: "me" | "bot";
  t: string;
}

const FEEDBACK_STATS: [string, string][] = [
  ["5", "Partners reviewed"],
  ["3", "Matched partners"],
  ["2", "No match"],
];

const MATCHED = ["CloudBridge Solutions", "GreenWave Technologies", "NextGen Systems"];

function CarmenAva() {
  return (
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: 999,
        flex: "none",
        background: "linear-gradient(135deg,#2367f1,#f124b3)",
        display: "grid",
        placeItems: "center",
        color: "#fff",
      }}
    >
      <Ic n="spark" style={{ width: 16, height: 16 }} fill />
    </span>
  );
}

export function CarmenChatDemo() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const send = (val?: string) => {
    const v = (val ?? text).trim();
    if (!v || typing) return;
    setMsgs((m) => [...m, { who: "me", t: v }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { who: "bot", t: CHAT_REPLIES[v] || CHAT_REPLIES._default }]);
    }, 1300);
  };

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing]);

  return (
    <div className="air">
      <AirSidebar active="campaigns" linkedinConnected />
      <div className="air-main" style={{ overflow: "hidden" }}>
        <div className="air-topbar">
          <CarmenAva />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--font-jakarta)" }}>Campaign Creator</div>
            <div style={{ fontSize: 11.5, color: "var(--a-faint)" }}>Carmen&nbsp;AI · online</div>
          </div>
          <div className="sp"></div>
          <button className="air-btn" style={{ borderColor: "#f1c98a", color: "#c2820f", background: "#fffaf0" }}>
            <Ic n="linkedin" />
            Connect LinkedIn
          </button>
          <button className="air-btn" style={{ borderColor: "#a9d8bb", color: "#15924c", background: "#f3fbf6" }}>
            <Ic n="check" />
            Email
          </button>
        </div>

        <div
          ref={bodyRef}
          style={{
            flex: 1,
            overflow: "auto",
            padding: "20px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div className="air-chat-msg bot">
            Got it, this helps a lot. I now have a clearer signal of what you&rsquo;re looking for. I&rsquo;ll expand the
            search and find more partners that match these patterns.
          </div>

          {/* feedback summary card */}
          <div className="air-card" style={{ padding: 16, maxWidth: 560 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  background: "#16a34a",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                }}
              >
                <Ic n="check" style={{ width: 13, height: 13 }} strokeWidth={3} />
              </span>
              <b style={{ fontSize: 14 }}>Feedback summary</b>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--a-grey)", marginBottom: 12 }}>
              Here&rsquo;s a summary of your match review. I&rsquo;ve carried over your preferences so we can pick up
              where you left off.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: 10,
                marginBottom: 14,
              }}
            >
              {FEEDBACK_STATS.map(([n, l]) => (
                <div key={l} className="air-card" style={{ padding: "12px 8px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 700, fontSize: 22 }}>{n}</div>
                  <div style={{ fontSize: 11, color: "var(--a-faint)" }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--a-grey)", marginBottom: 7 }}>
              Matched partners
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {MATCHED.map((t) => (
                <span key={t} className="air-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="air-chat-msg bot">
            Next up: I&rsquo;ll search for more partner contacts and companies that fit your top matches. Is that okay?
          </div>

          {msgs.map((m, i) =>
            m.who === "me" ? (
              <div key={i} className="air-chat-msg me">
                {m.t}
              </div>
            ) : (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <CarmenAva />
                <div className="air-chat-msg bot" style={{ paddingTop: 4 }}>
                  {m.t}
                </div>
              </div>
            ),
          )}
          {typing && (
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <CarmenAva />
              <span className="air-typing" style={{ padding: "6px 0" }}>
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>
          )}
        </div>

        {/* suggestions + input */}
        <div style={{ padding: "12px 26px 18px", borderTop: "1px solid var(--a-line)", background: "#fff" }}>
          {msgs.length === 0 && (
            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              {CHAT_SUGG.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    fontFamily: "inherit",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: "var(--a-blue)",
                    background: "var(--a-blue-soft)",
                    border: "1px solid #d6e4ff",
                    borderRadius: 999,
                    padding: "7px 13px",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="air-chat-input">
            <Ic n="plus" style={{ width: 17, height: 17, color: "var(--a-faint)" }} />
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Reply to Carmen, or steer the search…"
            />
            <span className="air-send" onClick={() => send()}>
              <Ic n="arrowU" style={{ width: 17, height: 17 }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
