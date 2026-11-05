import localFont from "next/font/local";

import { CarmenThumb } from "@/components/landing/thumbs/thumbs";

import { Body, BrowserTile, Closing, Fig, Img, Impact, Problems, Results, Section } from "../blocks";
import { CaseLayout, HeroFigure } from "../case-layout";
import { CASES } from "../cases";
import { CAMPAIGN_HEAD, COMMAND_CENTER, RUNNING_TOAST, STAT_CARDS, TIMELINE } from "../carmen/assets";
import { ChatProto } from "../carmen/chat-proto";
import { LinkedInFigure } from "../carmen/linkedin-proto";
import { SetupProto } from "../carmen/setup-proto";
import { ProtoFrame } from "../proto-frame";

/**
 * The prototypes are product UI: always light, always Inter (handoff section 4.1).
 * Self-hosted from src/fonts (see (home)/layout.tsx for why): Google's latin faces, one per
 * weight on the variable file, and Google's metric-adjusted Arial fallback (case.css).
 */
const inter = localFont({
  src: [
    { path: "../../../fonts/inter-normal-latin.woff2", weight: "400", style: "normal" },
    { path: "../../../fonts/inter-normal-latin.woff2", weight: "500", style: "normal" },
    { path: "../../../fonts/inter-normal-latin.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  // The fallback face is declared in case.css with next/font/google's exact metrics, so
  // glyphs Inter lacks (✓ ↗ →) render exactly as before; next/font/local measures slightly differently.
  adjustFontFallback: false,
  fallback: ["Inter Fallback"],
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
});

/** Copy verbatim from waande-case-handoff/reference/carmen.html. */
export function CarmenCase() {
  return (
    <CaseLayout meta={CASES["carmen-ai"]} className={inter.variable}>
      <HeroFigure thumb={<CarmenThumb />} caption="From reviewing matches to a running campaign. Hover to inspect." />

      <Impact
        label="Impact"
        items={[
          ["3.4×", "qualified partner conversations per rep"],
          ["71%", "less time on manual sourcing"],
          ["18.9%", "average reply rate on automated outreach"],
          ["9 min", "to launch a campaign, down from days"],
        ]}
      />

      <Body
        toc={[
          { id: "context", label: "Context" },
          { id: "configure", label: "Configure" },
          { id: "command", label: "Command" },
          { id: "connect", label: "Connect" },
          { id: "outcome", label: "Outcome" },
          { id: "closing", label: "In closing" },
        ]}
      >
        <Section id="context" label="01 · Context" title="Partnerships are high-leverage and painfully manual.">
          <p>
            Partnership managers spend most of the week on the work around partnerships: finding companies that fit,
            vetting them, finding the right person, writing the first message, chasing the follow-up. Weeks pass before one
            qualified conversation happens.
          </p>
          <p>
            Airstride’s bet was to hand that whole pipeline to Carmen. My job wasn’t to design a dashboard for it. It was to
            design the moments where a person decides whether to let go of the wheel.
          </p>
          <Problems
            items={[
              [
                "The leap of faith",
                "Carmen writes in your name to companies you may one day partner with. One tone-deaf message can burn a relationship before it starts.",
              ],
              [
                "The black box",
                "An agent working around the clock is invisible by default. If you can’t see what it is doing, you can’t trust it, or stop it.",
              ],
              ["The setup wall", "Configuring an agent usually means a 40-field form. Most people quit before the agent ever runs."],
            ]}
          />
        </Section>

        <Section id="configure" label="02 · Configure" title="Setup as a dialogue. Carmen does the research; you react.">
          <p>
            Instead of asking people to describe their business, Carmen reads it first and shows back what she understood.
            The user’s only job is to react: confirm the market, then judge five sample partners one at a time, each with a
            match score and the reasons Carmen picked it. Every “good match” and “not a fit” teaches the model what good
            looks like.
          </p>
        </Section>
      </Body>

      <Fig
        n={2}
        id="fig-onb"
        caption="Prototype of the full setup: create the organisation, confirm the research, then judge five partners. Use ⤢ to open it full size."
      >
        <ProtoFrame tile="carmen" url="app.airstride.ai/onboarding" w={1440} h={1156} stageClass="fa" stageId="pa" label="Setup flow prototype">
          <SetupProto />
        </ProtoFrame>
      </Fig>

      <Body>
        <Section cont>
          <p>
            After that, configuration stays a conversation. Carmen reports what she found in a chat, and the user steers her
            in plain language instead of hunting through settings.
          </p>
        </Section>
      </Body>

      <Fig n={3} id="fig-chat" caption="Prototype. Tap a suggestion or type a reply. Carmen acknowledges it and re-steers the search.">
        <ProtoFrame tile="carmen" url="app.airstride.ai/campaigns/new" w={1440} h={1156} stageClass="fa" stageId="pb" label="Campaign chat prototype">
          <ChatProto />
        </ProtoFrame>
      </Fig>

      <Body>
        <Section cont>
          <blockquote className="cs-pull">
            Pilot users came in braced for a long form and found the homework already done. The first thing they did was
            agree. Setup went from days to minutes.
          </blockquote>
        </Section>

        <Section id="command" label="03 · Command" title="One screen to watch an agent work, and step in.">
          <p>
            The command center answers the question every partnership manager asks at 9am: what did Carmen do while I was
            away, and is it working? Three small decisions did most of the work. None of them are flashy. Trust in an agent
            comes from being able to see its work, read what it is doing, and stop it without hunting for the button.
          </p>
        </Section>
      </Body>

      <Fig n={4} caption="The command center, top to bottom. Scroll inside the frame.">
        <BrowserTile tile="carmen" url="app.airstride.ai/campaigns/q3-drive">
          <div className="ap-scroll" tabIndex={0} aria-label="Command center screen, scrollable">
            <Img
              {...COMMAND_CENTER}
              alt="Carmen command center: campaign running banner, campaign metrics, live campaign timeline, week progress and the potential partners list"
            />
          </div>
        </BrowserTile>
      </Fig>

      <div className="cs-decisions cs-wide">
        <figure>
          <div className="thumb still detail" data-tile="carmen">
            <Img {...STAT_CARDS} alt="LinkedIn connections 127 and messages sent 89 stat cards" />
          </div>
          <figcaption>
            <b>Metrics first</b>Connections, messages, replies and response rate sit at the top, so “is it working?” is
            answered before any detail.<span className="mono">Glanceable proof</span>
          </figcaption>
        </figure>
        <figure>
          <div className="thumb still detail" data-tile="carmen">
            <Img {...TIMELINE} alt="Campaign timeline: enriching partner contacts, 271 of 412 enriched" />
          </div>
          <figcaption>
            <b>Narrated timeline</b>A live feed says what Carmen is doing this minute, down to “271 of 412 contacts
            enriched”.<span className="mono">Real-time legibility</span>
          </figcaption>
        </figure>
        <figure>
          <div className="thumb still detail" data-tile="carmen">
            <div className="stack">
              <Img {...RUNNING_TOAST} alt="Campaign is running banner with Pause and See activity buttons" />
              <Img {...CAMPAIGN_HEAD} alt="Q3 Partnership Drive header with a Pause campaign button" />
            </div>
          </div>
          <figcaption>
            <b>Pause is primary</b>Stopping the agent is a primary button, never buried in a menu. People hand over more
            when they can take it back in one click.<span className="mono">Reversible by default</span>
          </figcaption>
        </figure>
      </div>

      <Body>
        <Section id="connect" label="04 · Connect" title="The riskiest handoff: your real LinkedIn account.">
          <p>
            Connecting LinkedIn hands Carmen the keys to someone’s professional identity. So the flow does the opposite of
            most sign-in screens: it slows down and over-explains. The right-hand column always answers the question of the
            moment: what you’ll need, how to turn on 2FA, and once you’re connected, exactly what Carmen can and cannot do.
            Credentials are encrypted and never stored, and disconnecting is one click.
          </p>
        </Section>
      </Body>

      <Fig n={5} caption="Prototype. Walk the flow, then switch the verification result to see the failure path.">
        <LinkedInFigure />
      </Fig>

      <Body>
        <Section cont>
          <p>
            Failure got the same care. When verification fails, the error names the three likely causes instead of a
            generic “something went wrong”, so people fix it themselves instead of opening a ticket.
          </p>
          <p>
            Naming the limits in plain words, cannot post, cannot touch your password, reassured people more than any
            security badge would have.
          </p>
        </Section>

        <Section id="outcome" label="05 · Outcome" title="The interface, not the model, moved the numbers.">
          <p>
            Carmen rolled out to design-partner workspaces through 2025. The model had been capable for months. Usage
            changed once its work was visible and setup was quick enough that partnership managers stopped checking over
            its shoulder.
          </p>
          <Results
            items={[
              ["3.4×", "More qualified partner conversations per rep each month, against the manual baseline."],
              ["71%", "Less time on manual sourcing, list-building and first-touch outreach."],
              ["18.9%", "Average reply rate across Carmen’s automated outreach, above the category norm."],
              ["9 min", "Median time to configure and launch a live campaign, down from a multi-day setup."],
            ]}
          />
        </Section>

        <Closing>
          Carmen turned partner acquisition from weeks of manual sourcing into an agent people actually hand the work to: a
          nine-minute setup that teaches it what a good partner looks like, a command center that shows its work as it
          happens, and a LinkedIn handoff that says plainly what it can and cannot do.
        </Closing>
      </Body>
    </CaseLayout>
  );
}
