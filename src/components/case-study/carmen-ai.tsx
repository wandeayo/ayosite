import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/site/reveal";
import { AirWindow } from "@/components/case-study/carmen/air-ui";
import { CampaignDemo } from "@/components/case-study/carmen/campaign-demo";
import { CarmenChatDemo } from "@/components/case-study/carmen/carmen-chat-demo";
import { Ic, type IconName } from "@/components/case-study/carmen/icons";
import { LinkedInDemo } from "@/components/case-study/carmen/linkedin-demo";
import { OnboardingDemo } from "@/components/case-study/carmen/onboarding-demo";

const META: [string, string, boolean?][] = [
  ["Client", "Airstride · 2025"],
  ["Role", "Product Designer"],
  ["Scope", "Onboarding · Campaign UI · Automation"],
  ["Status", "Shipped · Production", true],
];

const IMPACT: [string, string, string][] = [
  ["3.4", "×", "Qualified partner conversations / rep"],
  ["18.9", "%", "Avg. reply rate on automated outreach"],
  ["9", "min", "From multi-day setup to live campaign"],
];

const PROBLEMS = [
  {
    id: "P.01",
    title: "The leap of faith.",
    body: "Carmen sends messages in your name, to companies you might one day partner with. One tone-deaf outreach can burn a relationship before it starts.",
  },
  {
    id: "P.02",
    title: "The black-box problem.",
    body: "An agent working around the clock is invisible by default. If you cannot see what it is doing right now, you cannot trust it, or stop it.",
  },
  {
    id: "P.03",
    title: "The setup wall.",
    body: "Configuring an AI agent usually means a 40-field form. Most users abandon it before the agent ever runs.",
  },
];

const CALLOUTS: { icon: IconName; title: string; body: string; tag: string }[] = [
  {
    icon: "trend",
    title: "Metrics first",
    body: "Connections, messages, replies and response rate sit at the very top, answering whether it is working before any detail does.",
    tag: "Glanceable proof",
  },
  {
    icon: "clock",
    title: "Narrated timeline",
    body: "A live feed names what Carmen is doing this minute, down to enriching 271 of 412 contacts, so the agent's work is never invisible.",
    tag: "Real-time legibility",
  },
  {
    icon: "pause",
    title: "Pause is primary",
    body: "Stopping the agent is a primary button, never tucked inside a menu. People hand over more when they know they can take it back in one click.",
    tag: "Reversible by default",
  },
];

const STATS: { n: string; u: string; d: string; l: string }[] = [
  {
    n: "3.4",
    u: "×",
    d: "More qualified partner conversations per rep each month against the manual baseline.",
    l: "Conversation volume",
  },
  {
    n: "71",
    u: "%",
    d: "Less time spent on manual sourcing, list-building, and first-touch outreach.",
    l: "Operator time saved",
  },
  {
    n: "18.9",
    u: "%",
    d: "Average reply rate across Carmen's automated outreach, above the category norm.",
    l: "Outreach reply rate",
  },
  {
    n: "9",
    u: "",
    d: "Median minutes to configure and launch a live campaign, down from a multi-day setup.",
    l: "Time to first campaign",
  },
];

function ImpactStrip() {
  return (
    <div className="csx-impact">
      {IMPACT.map(([n, u, l]) => (
        <div className="it-cell" key={l}>
          <div className="it-n">
            {n}
            <span className="u">{u}</span>
          </div>
          <div className="it-l">{l}</div>
        </div>
      ))}
    </div>
  );
}

function DemoBlock({
  tag,
  title,
  caption,
  children,
}: {
  tag: string;
  title: React.ReactNode;
  caption: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="csx-demo csx-wide">
      <div className="csx-demo-head">
        <div className="h">{title}</div>
        <span className="csx-demo-tag">
          <span className="blip"></span>
          {tag}
        </span>
      </div>
      {children}
      <div className="csx-demo-cap">
        <span className="k">↳ Interactive</span> · {caption}
      </div>
    </div>
  );
}

export function CarmenAICase() {
  return (
    <div className="csx">
      {/* ===== HERO (editorial) ===== */}
      <Container as="section" className="csx-hero">
        <div className="csx-kicker">Case 01 · AI Partner Acquisition</div>
        <div className="meta-grid">
          {META.map(([l, v, a]) => (
            <div key={l}>
              <span className="label">{l}</span>
              <span className={`val ${a ? "accent" : ""}`}>{v}</span>
            </div>
          ))}
        </div>
        <h1>
          Teaching a sales team to <span className="it">trust</span> an agent that works while they sleep.
        </h1>
        <p className="lede">
          Carmen is an AI partner-acquisition agent that sources, qualifies, and reaches out to partners on autopilot.
          The hard part was never the automation. It was getting a sceptical partnership manager to <em>hand over the
          relationship</em>.
        </p>
        <ImpactStrip />
        <div className="csx-hero-cta">
          <Button variant="primary" href="https://app.airstride.ai" trailingArrow target="_blank" rel="noopener noreferrer">
            See Carmen live
          </Button>
        </div>
      </Container>

      {/* ===== PRODUCT HERO: lead with the work ===== */}
      <Container as="section">
        <div className="csx-wide">
          <div className="csx-hero-cap">
            <div className="l">
              Where it all lands: the <span className="it">command center.</span>
            </div>
            <span className="csx-demo-tag">
              <span className="blip"></span>Live · interact below
            </span>
          </div>
          <AirWindow url="app.airstride.ai/campaigns/q3-drive">
            <CampaignDemo />
          </AirWindow>
          <div className="csx-demo-cap">
            <span className="k">↳ Interactive</span> · switch tabs, open a partner to see why Carmen picked them.
            Metrics tick as the campaign runs.
          </div>
        </div>
      </Container>

      {/* ===== 01 CONTEXT ===== */}
      <section className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">01 / Context</div>
              <div className="tick"></div>
              <div className="aside-note">Partnerships are high-leverage and painfully manual.</div>
            </aside>
            <div className="csx-body">
              <h2>
                Partner sourcing is mostly <span className="it">unglamorous</span> grunt work.
              </h2>
              <p>
                Partnership managers spend most of their week not on partnerships, but on the work <em>around</em> them:
                hunting for companies that fit, vetting whether they&rsquo;re worth a conversation, finding the right
                person, writing the first message, and chasing the follow-up. By the time a single qualified
                conversation happens, weeks have gone.
              </p>
              <p className="dim">
                Airstride&rsquo;s bet was to give that entire pipeline to an autonomous agent, Carmen, who sources
                partners against your ideal profile, runs the outreach across LinkedIn and email, and books the meeting.
                My job wasn&rsquo;t to design a dashboard for it. It was to design the moments where a person decides
                whether to let go of the wheel.
              </p>
              <ul className="csx-list">
                {PROBLEMS.map((p) => (
                  <li key={p.id}>
                    <span className="li-num">{p.id}</span>
                    <div className="li-text">
                      <strong>{p.title}</strong> {p.body}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Reveal>
      </section>

      {/* ===== 02 CONFIGURE ===== */}
      <section className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid mb-10">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">02 / Configure</div>
              <div className="tick"></div>
              <div className="aside-note">Setup as a dialogue. Carmen does the research; you just react.</div>
            </aside>
            <div className="csx-body">
              <h2>
                Setup should feel like a <span className="it">conversation.</span>
              </h2>
              <p>
                Instead of asking the user to describe their business, Carmen reads it first, then shows back what she
                understood and asks for a nod. The user&rsquo;s only job is to react: confirm the market, then approve or
                reject five sample partners. Every yes and no quietly teaches the matching model what good looks like.
              </p>
              <p>
                From there, configuration <em>stays</em> a conversation. Carmen reports what she found in a chat, and the
                user steers her in plain language: focus on EMEA, find more like these, rather than hunting through
                settings.
              </p>
              <p className="dim">
                Pilot users kept describing the same surprise. They came in braced for another long form, and found
                Carmen had already done the homework. The first thing they did was agree, not fill in fields. Turning
                setup into a five-tap review and a short chat collapsed a multi-day configuration into minutes.
              </p>
            </div>
          </Container>
        </Reveal>
        <Container>
          <DemoBlock
            tag="Try it"
            title={
              <>
                Confirm the research, then <span className="it">teach</span> the match
              </>
            }
            caption="approve or reject the sample partners. The counter shows Carmen learning. Save to finish."
          >
            <Reveal>
              <AirWindow url="app.airstride.ai/onboarding">
                <OnboardingDemo />
              </AirWindow>
            </Reveal>
          </DemoBlock>
        </Container>
        <Container as="div" className="mt-14">
          <DemoBlock
            tag="Try it"
            title={
              <>
                Then just <span className="it">talk</span> to her
              </>
            }
            caption="reply to Carmen or tap a suggestion. She acknowledges and re-steers the search live."
          >
            <Reveal>
              <AirWindow url="app.airstride.ai/campaigns/new">
                <CarmenChatDemo />
              </AirWindow>
            </Reveal>
          </DemoBlock>
        </Container>
      </section>

      {/* ===== 03 COMMAND ===== */}
      <section className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid mb-11">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">03 / Command</div>
              <div className="tick"></div>
              <div className="aside-note">One screen to watch an autonomous agent work, and intervene.</div>
            </aside>
            <div className="csx-body">
              <h2>
                Make autonomous work <span className="it">legible.</span>
              </h2>
              <p>
                The command center at the top of this page answers the question every partnership manager asks at 9am:{" "}
                <em>what has Carmen done while I was away, and is it working?</em> Three decisions did most of the heavy
                lifting.
              </p>
              <p className="dim">
                None of them are flashy. The things that make someone trust an agent are mostly small: being able to
                see its work, read what it is doing, and stop it without hunting for the button.
              </p>
            </div>
          </Container>
        </Reveal>
        <Container className="csx-wide">
          <div className="csx-callouts">
            {CALLOUTS.map((c) => (
              <div className="csx-callout" key={c.title}>
                <span className="co-ic">
                  <Ic n={c.icon} />
                </span>
                <div className="co-t">{c.title}</div>
                <div className="co-d">{c.body}</div>
                <div className="co-tag">{c.tag}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== 04 CONNECT ===== */}
      <section className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid mb-10">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">04 / Connect</div>
              <div className="tick"></div>
              <div className="aside-note">The riskiest handoff in the product: your real LinkedIn account.</div>
            </aside>
            <div className="csx-body">
              <h2>
                The trust seam, made <span className="it">explicit.</span>
              </h2>
              <p>
                Connecting LinkedIn is the moment a user hands Carmen the keys to their professional identity. So the
                flow does the opposite of what most OAuth screens do: it slows down and over-communicates. A
                plain-language ledger of <strong>what Carmen can and cannot do</strong> sits beside the form the whole
                way through. Credentials are encrypted and never stored. Disconnecting is always one click.
              </p>
              <p className="dim">
                Naming the limits in plain words, cannot post, cannot touch your password, reassured people more than any
                security badge would have.
              </p>
            </div>
          </Container>
        </Reveal>
        <Container>
          <DemoBlock
            tag="Step through"
            title={
              <>
                Connect LinkedIn <span className="it">without</span> the fear
              </>
            }
            caption="walk the three steps. The can / cannot do ledger stays visible the whole way through."
          >
            <Reveal>
              <AirWindow url="app.airstride.ai/settings/linkedin">
                <LinkedInDemo />
              </AirWindow>
            </Reveal>
          </DemoBlock>
        </Container>
      </section>

      {/* ===== 05 OUTCOME ===== */}
      <section className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">05 / Outcome</div>
              <div className="tick"></div>
              <div className="aside-note">The interface, not the model, is what moved the numbers.</div>
            </aside>
            <div className="csx-body">
              <h2>
                What shipped, and what <span className="it">changed.</span>
              </h2>
              <p>
                Carmen rolled out to design-partner workspaces through 2025. The model had been capable for months. What
                changed usage was making its work visible and its setup quick enough that partnership managers stopped checking over
                its shoulder.
              </p>
            </div>
          </Container>
        </Reveal>
        <Reveal>
          <Container as="div" className="mt-2">
            <div className="csx-stats">
              {STATS.map((s) => (
                <div key={s.l} className="csx-stat">
                  <div className="num">
                    {s.n}
                    <span className="it">{s.u}</span>
                  </div>
                  <div className="desc">{s.d}</div>
                  <div className="label">{s.l}</div>
                </div>
              ))}
            </div>
          </Container>
        </Reveal>
      </section>

      {/* ===== 06 REFLECTION ===== */}
      <section className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">06 / Reflection</div>
              <div className="tick"></div>
            </aside>
            <div className="csx-body">
              <h2>
                What I&rsquo;d let <span className="it">recede.</span>
              </h2>
              <p>
                The legibility surfaces are the most polished part of the product, and the part heavy users touch least
                once they trust Carmen. I&rsquo;d design them to recede on purpose. As a partnership manager approves their
                hundredth action in a category, the reasoning should quietly collapse into a glance.
              </p>
              <p className="dim">
                Scaffolding like this is meant to come down. The next version should show less of its reasoning the
                longer you have worked with her, as checking becomes a habit you no longer need.
              </p>
            </div>
          </Container>
        </Reveal>
      </section>
    </div>
  );
}
