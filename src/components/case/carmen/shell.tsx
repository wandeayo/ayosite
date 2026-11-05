/**
 * The Campaign Creator app shell (sidebar, top bar, chat panel header), shared
 * by Fig. 2's saving step and Fig. 3. Markup verbatim from reference/carmen.html.
 */
import type { ReactNode } from "react";

import { Img } from "../blocks";
import { AVATAR } from "./assets";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="fs">
      <aside className="fs-side">
        <div className="fs-logo">
          <i />
          Airstride
          <span className="fs-pt" />
        </div>
        <div className="fs-org">
          <span className="fs-oi" />
          Nextron Solutions<span>⌃⌄</span>
        </div>
        <div className="fs-seg">
          <span>Platform</span>
          <span className="on">✦ Agent</span>
        </div>
        <span className="fs-gh">AI Partner Acquisition</span>
        <a>
          <i className="fs-plus">+</i>New Campaign
        </a>
        <a className="on">Campaigns</a>
        <div className="fs-empty">
          <span className="fs-box" />
          <b>No campaign</b>
          <small>Your recent campaign will show over here</small>
        </div>
      </aside>
      <div className="fs-top">
        <span className="fs-ic c">130</span>
        <span className="fs-ic" />
        <span className="fs-ic" />
        <span className="fs-me">AO</span>
      </div>
      <section className="fs-chat">
        <header>
          <Img {...AVATAR} alt="" />
          <span>
            <b>Campaign Creator</b>
            <small>Carmen-AI</small>
          </span>
          <em className="fs-li">Connect LinkedIn</em>
          <em className="fs-em">✓ Email</em>
        </header>
        {children}
      </section>
    </div>
  );
}

/** The chat's opening: Carmen's reply, the feedback summary and the next-step question. */
export function FeedbackOpening() {
  return (
    <>
      <div className="fs-msg">
        Got it, this helps a lot. I now have a clearer signal of what you’re looking for. I’ll expand the search and find
        more partners that match these patterns.
      </div>
      <div className="fs-fb">
        <b>
          <span className="fs-ok">✓</span>Feedback summary
        </b>
        <p>
          Here is a summary of your match review. I have carried over your preferences so we can pick up right from where
          you left off.
        </p>
        <div className="fs-stats">
          <span>
            <b>5</b>Partners reviewed
          </span>
          <span>
            <b>3</b>Matched
          </span>
          <span>
            <b>2</b>No match
          </span>
        </div>
        <div className="fs-tags">
          <span>CloudBridge Solutions</span>
          <span>GreenWave Technologies</span>
          <span>NextGen Systems</span>
        </div>
      </div>
      <div className="fs-msg">Next up: I’ll search for more partner contacts and companies that fit your top matches. Is that okay?</div>
    </>
  );
}
