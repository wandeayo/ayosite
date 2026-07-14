"use client";

import { Fragment, useState } from "react";

import { AirSidebar, AirTopbar, Ava } from "@/components/case-study/carmen/air-ui";
import { Ic } from "@/components/case-study/carmen/icons";

/* ============================================================
   Connect LinkedIn (trust seam)
   ============================================================ */

const STEPS = ["Connect", "2FA Setup", "Success"];

export function LinkedInDemo() {
  const [step, setStep] = useState(0); // 0 connect, 1 2fa, 2 success
  const connected = step === 2;

  return (
    <div className="air">
      <AirSidebar active="linkedin" linkedinConnected={connected} />
      <div className="air-main">
        <AirTopbar
          crumb={
            <div className="crumb">
              Configuration / <b>LinkedIn</b>
            </div>
          }
        />
        <div className="air-content">
          <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: 20 }}>Connect Your LinkedIn Account</h3>
          <p style={{ fontSize: 13, color: "var(--a-grey)", marginBottom: 20 }}>
            Allow Carmen AI to send connection requests, messages, and follow-ups on your behalf.
          </p>

          {!connected && (
            <div className="air-cols" style={{ ["--cols" as string]: "1.15fr 1fr", gap: 18, alignItems: "start" }}>
              <div className="air-card" style={{ padding: 20 }}>
                <div className="air-stepper" style={{ marginBottom: 20 }}>
                  {STEPS.map((s, i) => (
                    <Fragment key={s}>
                      <div className={`st ${i < step ? "done" : ""} ${i === step ? "on" : ""}`}>
                        <span className="n">{i < step ? <Ic n="check" style={{ width: 14, height: 14 }} /> : i + 1}</span>
                        <span className="lb">{s}</span>
                      </div>
                      {i < 2 && <div className={`bar ${i < step ? "fill" : ""}`}></div>}
                    </Fragment>
                  ))}
                </div>

                {step === 0 && (
                  <>
                    <div
                      style={{
                        background: "#f4f7fb",
                        border: "1px solid #e3ebf5",
                        borderRadius: 9,
                        padding: "11px 13px",
                        display: "flex",
                        gap: 9,
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <span style={{ color: "var(--a-blue)" }}>
                        <Ic n="shield" />
                      </span>
                      <span style={{ fontSize: 12, color: "var(--a-grey)" }}>
                        Credentials are encrypted and never stored after connection.{" "}
                        <a style={{ color: "var(--a-blue)", fontWeight: 600 }}>Learn more</a>
                      </span>
                    </div>
                    <label style={{ fontSize: 12.5, fontWeight: 600 }}>LinkedIn Email</label>
                    <div className="air-chat-input" style={{ margin: "6px 0 14px" }}>
                      <input value="ayowande@nextron.io" readOnly />
                    </div>
                    <label style={{ fontSize: 12.5, fontWeight: 600 }}>LinkedIn Password</label>
                    <div className="air-chat-input" style={{ margin: "6px 0 18px" }}>
                      <input type="password" value="************" readOnly />
                      <Ic n="lock" style={{ width: 15, height: 15, color: "var(--a-faint)" }} />
                    </div>
                    <button
                      className="air-btn pri"
                      style={{ width: "100%", justifyContent: "center" }}
                      onClick={() => setStep(1)}
                    >
                      Continue to 2FA Setup
                      <Ic n="arrowR" />
                    </button>
                    <p style={{ fontSize: 12, color: "var(--a-faint)", textAlign: "center", marginTop: 10 }}>
                      Signed in with Google / Apple? <a style={{ color: "var(--a-blue)" }}>Click here</a>
                    </p>
                  </>
                )}

                {step === 1 && (
                  <>
                    <button
                      className="air-btn ghost"
                      style={{ marginBottom: 12, padding: "6px 12px" }}
                      onClick={() => setStep(0)}
                    >
                      <Ic n="chevL" />
                      Back
                    </button>
                    <h4 style={{ fontSize: 15, marginBottom: 4 }}>Enable Two-Factor Authentication</h4>
                    <p style={{ fontSize: 12.5, color: "var(--a-grey)", marginBottom: 14 }}>
                      LinkedIn requires 2FA for secure connections. Let us know your current setup.
                    </p>
                    <div
                      className="air-card"
                      style={{ padding: "11px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}
                    >
                      <span style={{ color: "var(--a-blue)" }}>
                        <Ic n="linkedin" />
                      </span>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>Open LinkedIn Settings</span>
                      <a className="air-btn ghost" style={{ padding: "6px 12px" }}>
                        Open
                        <Ic n="ext" />
                      </a>
                    </div>
                    <label style={{ fontSize: 12.5, fontWeight: 600 }}>Paste your setup key here</label>
                    <div
                      style={{
                        background: "#fef8e7",
                        border: "1px solid #f5e3a8",
                        borderRadius: 9,
                        padding: "10px 13px",
                        margin: "7px 0 10px",
                      }}
                    >
                      <div style={{ fontSize: 11, color: "#9a7d1e", fontWeight: 600, marginBottom: 3 }}>
                        Example key format
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1, color: "#7a6516" }}>
                        XXN4 L17S 4ZPM 3J7O P7V6
                      </div>
                    </div>
                    <div className="air-chat-input" style={{ marginBottom: 18 }}>
                      <input placeholder="Paste the key you copied from LinkedIn" readOnly />
                      <button className="air-btn ghost" style={{ padding: "5px 11px" }}>
                        Paste
                      </button>
                    </div>
                    <button
                      className="air-btn pri"
                      style={{ width: "100%", justifyContent: "center" }}
                      onClick={() => setStep(2)}
                    >
                      Verify &amp; connect
                      <Ic n="check" />
                    </button>
                  </>
                )}
              </div>

              {/* trust seam */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="air-card" style={{ padding: 16 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>What Carmen can do</div>
                  {["Send connection requests", "Send and manage messages", "View profile analytics"].map((t) => (
                    <div
                      key={t}
                      style={{
                        display: "flex",
                        gap: 9,
                        alignItems: "center",
                        fontSize: 12.5,
                        color: "var(--a-grey)",
                        padding: "5px 0",
                      }}
                    >
                      <span style={{ color: "#15924c" }}>
                        <Ic n="check" style={{ width: 16, height: 16 }} />
                      </span>
                      {t}
                    </div>
                  ))}
                  <div className="air-divider" style={{ margin: "12px 0" }}></div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>What Carmen cannot do</div>
                  {["Post or modify your profile", "Access or store your password"].map((t) => (
                    <div
                      key={t}
                      style={{
                        display: "flex",
                        gap: 9,
                        alignItems: "center",
                        fontSize: 12.5,
                        color: "var(--a-grey)",
                        padding: "5px 0",
                      }}
                    >
                      <span style={{ color: "#d9484b" }}>
                        <Ic n="x" style={{ width: 16, height: 16 }} />
                      </span>
                      {t}
                    </div>
                  ))}
                </div>
                <div className="air-card" style={{ padding: 14, display: "flex", gap: 11, alignItems: "center" }}>
                  <span style={{ color: "var(--a-blue)" }}>
                    <Ic n="bulb" />
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Need help?</div>
                    <div style={{ fontSize: 12, color: "var(--a-faint)" }}>Our support team is available 24/7.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {connected && (
            <div className="air-card" style={{ maxWidth: 460, padding: "32px 28px", textAlign: "center", margin: "6px auto" }}>
              <div
                style={{
                  width: 66,
                  height: 66,
                  margin: "0 auto 16px",
                  borderRadius: 999,
                  background: "#16a34a",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  boxShadow: "0 12px 30px -8px rgba(22,163,74,0.5)",
                }}
              >
                <Ic n="check" style={{ width: 36, height: 36 }} strokeWidth={2.5} />
              </div>
              <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: 21 }}>You&rsquo;re all set!</h3>
              <p style={{ fontSize: 13.5, color: "var(--a-grey)", maxWidth: 320, margin: "6px auto 18px" }}>
                LinkedIn connected successfully. Carmen AI is ready to help you reach more prospects.
              </p>
              <div
                className="air-card"
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  gap: 11,
                  alignItems: "center",
                  textAlign: "left",
                  marginBottom: 16,
                }}
              >
                <Ava name="Ayowande Olubo" size={38} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Ayowande Olubo</div>
                  <div style={{ fontSize: 12, color: "var(--a-faint)" }}>UX Designer at Airstride</div>
                </div>
                <span className="air-pill green" style={{ marginLeft: "auto" }}>
                  <span className="d"></span>Connected
                </span>
              </div>
              <button className="air-btn pri" style={{ width: "100%", justifyContent: "center", marginBottom: 14 }}>
                <Ic n="plus" />
                Create your first campaign
              </button>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                {([
                  ["shield", "Secure connection"],
                  ["clock", "Auto rate-limited"],
                  ["link", "Disconnect anytime"],
                ] as const).map(([ic, t]) => (
                  <span
                    key={t}
                    style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--a-faint)" }}
                  >
                    <Ic n={ic} style={{ width: 14, height: 14 }} />
                    {t}
                  </span>
                ))}
              </div>
              <button className="air-btn ghost" style={{ marginTop: 18 }} onClick={() => setStep(0)}>
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
