"use client";

import { useEffect, useRef, useState } from "react";

import { ProtoFrame } from "../proto-frame";

/**
 * Fig. 5: LinkedIn connection in the full app shell, 1000 × 690. Port of
 * "Prototype C" in reference/carmen.html: credentials → 2FA (paste a sample key)
 * → verifying (1.8s) → success or "Connection failed" → Try again. After
 * success the sidebar badge reads Connected, and LinkedIn in the sidebar opens
 * the connected settings (Reconnect, Disconnect → step 1).
 *
 * The email and password are display-only: never render real credential inputs.
 */

type Outcome = "ok" | "fail";
type ViewN = 1 | 2 | 3 | 4;
type Modal = null | "wait" | "fail";

const SAMPLE_KEY = "JBSW Y3DP EHPK 3PXP K7QM 2XRD";
const VERIFY_MS = 1800;

export function LinkedInFigure() {
  const [outcome, setOutcome] = useState<Outcome>("ok");
  return (
    <ProtoFrame
      tile="carmen"
      url="app.airstride.ai/settings/linkedin"
      w={1000}
      h={690}
      label="LinkedIn connection prototype"
      below={
        <div className="ax-demo" role="group" aria-label="Choose how verification ends">
          <span>Verification result</span>
          {(["ok", "fail"] as const).map((o) => (
            <button key={o} type="button" className={outcome === o ? "on" : undefined} aria-pressed={outcome === o} onClick={() => setOutcome(o)}>
              {o === "ok" ? "Succeeds" : "Fails"}
            </button>
          ))}
        </div>
      }
    >
      <LinkedInProto outcome={outcome} />
    </ProtoFrame>
  );
}

function LinkedInProto({ outcome }: { outcome: Outcome }) {
  const [view, setView] = useState<ViewN>(1);
  const [modal, setModal] = useState<Modal>(null);
  const [keyPasted, setKeyPasted] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const verifyBtn = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  /** Set when a view change should move focus to that view's first enabled button. */
  const focusNext = useRef(false);
  const outcomeRef = useRef(outcome);
  outcomeRef.current = outcome;

  useEffect(() => () => clearTimeout(timer.current), []);

  const go = (n: ViewN, focus = true) => {
    clearTimeout(timer.current);
    setModal(null);
    setView(n);
    if (n === 1) setKeyPasted(false);
    focusNext.current = focus;
  };

  useEffect(() => {
    if (!focusNext.current) return;
    focusNext.current = false;
    root.current?.querySelector<HTMLButtonElement>(`[data-view="${view}"] button:not([disabled])`)?.focus({ preventScroll: true });
  }, [view]);

  const verify = () => {
    setModal("wait");
    timer.current = setTimeout(() => (outcomeRef.current === "ok" ? go(3) : setModal("fail")), VERIFY_MS);
  };

  const connected = view >= 3;

  return (
    <div className="ap ax" id="pc" ref={root}>
      <aside className="ax-side">
        <div className="ax-org">
          <span>NS</span>
          <b>Nextron Solutions</b>
        </div>
        <div className="ax-switch">
          <small>Switch product</small>
          <b>Acquisition</b>
        </div>
        <span className="ax-gh">AI partner acquisition</span>
        <a>
          <i className="ax-plus">+</i>New Campaign
        </a>
        <a>Campaigns</a>
        <a>Outreach</a>
        <a>Partner Intelligence</a>
        <span className="ax-gh">Configuration</span>
        {/* Acts as a button (opens the connected settings once LinkedIn is connected), so it is
            one for keyboards, screen readers and crawlers too. The reference only handled clicks. */}
        <a
          className="on"
          data-nav="li"
          role="button"
          tabIndex={0}
          aria-disabled={!connected}
          onClick={() => connected && go(4)}
          onKeyDown={(e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            e.preventDefault();
            if (connected) go(4);
          }}
        >
          LinkedIn{" "}
          <em className={connected ? "ax-badge ok" : "ax-badge"} id="pc-badge">
            {connected ? "Connected" : "Not connected"}
          </em>
        </a>
        <a>Voice Profile</a>
        <span className="ax-gh">Recents</span>
        <a className="ax-rec">Wearable Health Devices</a>
        <a className="ax-rec">Blockchain for Patients</a>
        <a className="ax-rec">Virtual Reality in Therapy</a>
      </aside>
      <div className="ax-main">
        <div className="ax-top">
          <span className="ax-ic" />
          <span className="ax-ic" />
          <span className="ax-me">AO</span>
        </div>
        <div className="ax-page">
          {/* level 3 in the page outline, under the section H2; the tag stays for the prototype CSS */}
          <h4 aria-level={3}>Connect your LinkedIn account</h4>
          <p className="ap-sub">Allow Carmen AI to send automated connection requests, messages, and follow-ups on your behalf.</p>

          {/* step 1 */}
          <div className="ax-grid" data-view="1" hidden={view !== 1}>
            <section className="ax-card">
              <b className="ax-h">LinkedIn credentials</b>
              <p className="ax-s">Connect your account to enable automation.</p>
              <ol className="ap-steps sm">
                <li className="on">
                  <i>1</i>
                  <span>Connect</span>
                </li>
                <li>
                  <i>2</i>
                  <span>2FA setup</span>
                </li>
                <li>
                  <i>3</i>
                  <span>Success</span>
                </li>
              </ol>
              <p className="ax-safe">
                <span>🛡</span>Credentials encrypted. Never stored after connection.<u>Learn more</u>
              </p>
              <div className="ap-field">
                <span>LinkedIn email</span>
                <div>ayo@airstride.ai</div>
              </div>
              <div className="ap-field">
                <span>LinkedIn password</span>
                <div>••••••••••••</div>
              </div>
              <button className="ap-btn wide" type="button" onClick={() => go(2)}>
                Continue to 2FA setup
              </button>
              <p className="ax-alt">
                Signed in with Google or Apple? <u>Click here</u>
              </p>
            </section>
            <div className="ax-col">
              <section className="ax-card">
                <b className="ax-h">What you’ll need</b>
                <ul className="ax-need">
                  <li>Your LinkedIn account email address</li>
                  <li>Your LinkedIn account password</li>
                  <li>Access to your phone or authenticator app. LinkedIn will block access if you don’t have it.</li>
                </ul>
              </section>
              <section className="ax-card ax-guide">
                <b className="ax-h">
                  Full setup guide <span>⌄</span>
                </b>
                <p className="ax-s">Watch a step-by-step video walkthrough of the entire process.</p>
              </section>
              <HelpCard />
            </div>
          </div>

          {/* step 2 */}
          <div className="ax-grid" data-view="2" hidden={view !== 2}>
            <section className="ax-card">
              <button className="ax-back" type="button" onClick={() => go(1)}>
                ← Back
              </button>
              <b className="ax-h">LinkedIn credentials</b>
              <p className="ax-s">Connect your account to enable automation.</p>
              <ol className="ap-steps sm">
                <li className="done">
                  <i>1</i>
                  <span>Connect</span>
                </li>
                <li className="on">
                  <i>2</i>
                  <span>2FA setup</span>
                </li>
                <li>
                  <i>3</i>
                  <span>Success</span>
                </li>
              </ol>
              <b className="ax-h2">Enable two-factor authentication</b>
              <p className="ax-s">LinkedIn requires 2FA for secure automation. Let us know your current setup.</p>
              <div className="ax-open">
                <span className="ax-in">in</span>Open LinkedIn settings
                <button type="button" className="ax-link">
                  Open ↗
                </button>
              </div>
              <span className="ax-lbl">Paste your setup key here*</span>
              <div className="ax-eg">
                <b>Example key format</b>
                <code>JBSW Y3DP EHPK 3PXP</code>
                <small>Uppercase letters (A–Z) and numbers (2–7), usually 16–32 characters</small>
              </div>
              <div className="ax-key">
                <span id="pc-key" className={keyPasted ? undefined : "ph"}>
                  {keyPasted ? SAMPLE_KEY : "Paste the key you copied from LinkedIn"}
                </span>
                <button
                  type="button"
                  id="pc-paste"
                  onClick={() => {
                    setKeyPasted(true);
                    requestAnimationFrame(() => verifyBtn.current?.focus());
                  }}
                >
                  Paste
                </button>
              </div>
              <button className="ap-btn wide" type="button" id="pc-verify" ref={verifyBtn} disabled={!keyPasted} onClick={verify}>
                Verify
              </button>
            </section>
            <div className="ax-col">
              <section className="ax-card">
                <b className="ax-h">Visual steps</b>
                <div className="ax-vis" aria-hidden="true">
                  <div className="ax-vside">
                    <i />
                    <i />
                    <i className="hl" />
                    <i />
                    <i />
                  </div>
                  <div className="ax-vpane">
                    <i />
                    <i />
                    <span className="ax-tog" />
                  </div>
                </div>
                <p className="ax-s">
                  <b>Step 1: Find the 2FA toggle.</b> Go to Sign in &amp; security → Two-factor authentication.
                </p>
                <b className="ax-h2">Choosing an authenticator app?</b>
                <ul className="ax-apps">
                  <li>
                    <b>Google Authenticator</b>
                    <small>Simple and reliable</small>
                  </li>
                  <li>
                    <b>Microsoft Authenticator</b>
                    <small>Great if you use Microsoft</small>
                  </li>
                  <li>
                    <b>Authy</b>
                    <small>Cloud backup for your codes</small>
                  </li>
                </ul>
              </section>
            </div>
          </div>

          {/* success */}
          <div data-view="3" hidden={view !== 3}>
            <section className="ax-card ax-success">
              <span className="ax-seal" aria-hidden="true">
                ✓
              </span>
              <b className="ax-big">You’re all set!</b>
              <p className="ax-s">LinkedIn connected successfully. Carmen AI is ready to help you reach more prospects.</p>
              <Person />
              <button className="ap-btn" type="button" onClick={() => go(4)}>
                Create your first campaign →
              </button>
              <div className="ax-trust">
                <span>Secure connection</span>
                <span>Auto-refreshed</span>
                <span>Disconnect anytime</span>
              </div>
            </section>
          </div>

          {/* connected settings */}
          <div className="ax-grid" data-view="4" hidden={view !== 4}>
            <section className="ax-card">
              <b className="ax-h">LinkedIn credentials</b>
              <p className="ax-s">Connect your account to enable automation.</p>
              <p className="ax-ok">
                <span>✓</span>
                <span>
                  <b>LinkedIn account connected</b>
                  <small>Carmen AI can now automate outreach on your behalf.</small>
                </span>
              </p>
              <Person />
              <div className="ax-row">
                <button className="ap-btn ghost" type="button" onClick={() => go(2)}>
                  Reconnect account
                </button>
                <button className="ap-btn danger" type="button" onClick={() => go(1)}>
                  Disconnect account
                </button>
              </div>
            </section>
            <div className="ax-col">
              <section className="ax-card ap-ledger plain">
                <span className="ap-lh">What Carmen can do</span>
                <ul>
                  <li>Send connection requests</li>
                  <li>Send and manage messages</li>
                  <li>View profile analytics</li>
                </ul>
                <span className="ap-lh">What Carmen cannot do</span>
                <ul className="no">
                  <li>Modify your profile</li>
                  <li>Access your password</li>
                </ul>
              </section>
              <HelpCard />
            </div>
          </div>
        </div>

        {/* modals */}
        <div className="ax-scrim" id="pc-scrim" hidden={!modal}>
          <div className="ax-modal" data-modal="wait" hidden={modal !== "wait"}>
            <span className="ax-dots">
              <i />
              <i />
              <i />
            </span>
            <b className="ax-h">Verifying LinkedIn login…</b>
            <p className="ax-s">Connecting to LinkedIn securely. This usually takes a few seconds.</p>
            <button
              className="ap-btn ghost sm"
              type="button"
              onClick={() => {
                clearTimeout(timer.current);
                setModal(null);
              }}
            >
              Cancel
            </button>
          </div>
          <div className="ax-modal ax-fail" data-modal="fail" hidden={modal !== "fail"}>
            <span className="ax-warn" aria-hidden="true">
              !
            </span>
            <b className="ax-big">Connection failed</b>
            <p className="ax-s">
              We couldn’t verify your LinkedIn credentials. The email, password, or 2FA key you provided didn’t match. This
              could be because:
            </p>
            <ul>
              <li>Your LinkedIn password was entered incorrectly</li>
              <li>Your 2FA key has expired or is invalid</li>
              <li>Your LinkedIn account credentials have changed recently</li>
            </ul>
            <button
              className="ap-btn wide"
              type="button"
              onClick={() => {
                setModal(null);
                setKeyPasted(false);
                go(2);
              }}
            >
              Try again
            </button>
            <p className="ax-alt">
              Still having trouble? <u>Contact support team</u>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HelpCard() {
  return (
    <section className="ax-card ax-help">
      <span>
        <b className="ax-h">Need help?</b>
        <p className="ax-s">Our support team is available 24/7.</p>
      </span>
      <button className="ap-btn ghost sm" type="button">
        Contact support
      </button>
    </section>
  );
}

function Person() {
  return (
    <div className="ax-person">
      <span>AO</span>
      <span>
        <b>Ayowande Olubo</b>
        <small>UX Designer at Airstride</small>
      </span>
    </div>
  );
}
