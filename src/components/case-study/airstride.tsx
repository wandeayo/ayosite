"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/site/reveal";

const META: [string, string, boolean?][] = [
  ["Client", "Airstride · 2025"],
  ["Role", "UX Designer"],
  ["Scope", "6 modules · end-to-end"],
  ["Status", "Shipped · Production", true],
];

const PROBLEMS = [
  {
    id: "P.01",
    title: "The deal-loser.",
    body: "Prospects were naming the interface directly as the reason they chose a competitor. UX had become a line item on the sales call.",
  },
  {
    id: "P.02",
    title: "The revision spiral.",
    body: "Stakeholder churn meant finished screens kept cycling back for variation requests. Design time was consumed by decisions that would not stay made.",
  },
  {
    id: "P.03",
    title: "The implementation gap.",
    body: "Designs were not being built faithfully. The Mantine UI library gave developers choices that diverged from intent, and there was no close review process to catch the drift.",
  },
];

const MODULES = [
  { id: "overview", label: "Overview" },
  { id: "deals-management", label: "Deals" },
  { id: "account-mapping", label: "Account Mapping" },
  { id: "analytics", label: "Analytics" },
  { id: "partner-training", label: "Partner Training" },
  { id: "content-library", label: "Content Library" },
  { id: "engagement", label: "Engagement" },
];

/* ------------------------------------------------------------------
   Interactive module demos.
   The demo HTML files are fixed 1440px desktop apps. The iframe always
   scales to fit the container width so the frame keeps the exact
   desktop proportions at every size — on a phone it reads as a living
   thumbnail of the app. Below INTERACT_SCALE the UI is too small to
   tap meaningfully, so pointer events switch off (the demo autoplays
   anyway) and the caption offers the full-tab version instead.
------------------------------------------------------------------- */
const DEMO_W = 1440;
const DEMO_H = 760;
const INTERACT_SCALE = 0.5;

function DemoEmbed({ slug, label }: { slug: string; label: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const update = () => setWidth(node.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const scale = width ? width / DEMO_W : 0.65;
  const compact = scale < INTERACT_SCALE;
  const src = `/work/airstride/${slug}/index.html`;

  return (
    <Reveal>
      <Container as="figure" className="my-20">
        <div className="overflow-hidden rounded-lg border border-line bg-bg-elev">
          <div ref={wrapRef} style={{ height: `${DEMO_H * scale}px`, position: "relative", overflow: "hidden" }}>
            <iframe
              src={src}
              title={`${label} interactive demo`}
              loading="lazy"
              style={{
                width: `${DEMO_W}px`,
                height: `${DEMO_H}px`,
                border: "none",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: compact ? "none" : "auto",
              }}
            />
          </div>
        </div>
        <figcaption className="mt-6 flex flex-col gap-1 text-center md:flex-row md:items-baseline md:justify-center md:gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{label}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            {compact ? "Auto-playing demo" : "Interactive prototype · auto-playing demo"}
          </span>
          {compact && (
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent underline underline-offset-4"
            >
              Open full demo ↗
            </a>
          )}
        </figcaption>
      </Container>
    </Reveal>
  );
}

const NAV_H = 72;   // fixed site nav height (matches pt-[72px] on <main>)
const TAB_H = 48;   // approximate height of this tab bar

function ModuleNav() {
  const [active, setActive] = useState<string>(MODULES[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    MODULES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: `-${NAV_H + TAB_H}px 0px -50% 0px` }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - (NAV_H + TAB_H);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="sticky top-[72px] z-20 border-b border-line bg-bg">
      <Container>
        <nav className="flex overflow-x-auto">
          {MODULES.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(id);
              }}
              className={[
                "relative shrink-0 px-5 py-4 font-mono text-[12px] uppercase tracking-[0.1em] transition-colors",
                active === id
                  ? "text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-accent"
                  : "text-ink-faint hover:text-ink",
              ].join(" ")}
            >
              {label}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}

export function AirstrideCase() {
  return (
    <div className="csx">
      {/* ===== HERO ===== */}
      <Container as="section" className="csx-hero">
        <div className="csx-kicker">Case 02 · Partner Management Platform</div>
        <div className="meta-grid">
          {META.map(([l, v, a]) => (
            <div key={l}>
              <span className="label">{l}</span>
              <span className={`val ${a ? "accent" : ""}`}>{v}</span>
            </div>
          ))}
        </div>
        <h1>
          Redesigning the platform that was <span className="it">losing deals.</span>
        </h1>
        <p className="lede">
          Airstride built a partner management suite, but the UX fell behind the product. Prospects were citing the
          interface as the reason they chose a competitor. I came in as the sole designer to redesign all six modules
          from scratch.
        </p>
        <div className="csx-hero-cta">
          <Button
            variant="primary"
            href="https://app.airstride.ai"
            trailingArrow
            target="_blank"
            rel="noopener noreferrer"
          >
            See it live
          </Button>
        </div>
      </Container>

      {/* ===== 01 CONTEXT ===== */}
      <section className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">01 / Context</div>
              <div className="tick"></div>
              <div className="aside-note">UX was showing up on sales calls as a named objection.</div>
            </aside>
            <div className="csx-body">
              <h2>
                The product worked. The <span className="it">interface</span> was losing the evaluation.
              </h2>
              <p>
                Airstride had a functioning partner management platform: tools for tracking deals, mapping accounts to a
                CRM, training partners, managing content, and measuring engagement. The underlying capability was real.
                What was failing was the surface.
              </p>
              <p className="dim">
                Sales calls were surfacing a pattern. Prospects evaluated the product and then went with a rival, citing
                the UX as the tipping point. Six modules, each with their own flows and edge cases, all needed
                redesigning at once, with one designer.
              </p>
            </div>
          </Container>
        </Reveal>
      </section>

      {/* ===== 02 PROBLEMS ===== */}
      <section className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">02 / Problems</div>
              <div className="tick"></div>
              <div className="aside-note">Three problems. Only one of them was on screen.</div>
            </aside>
            <div className="csx-body">
              <h2>
                The design problem was also an <span className="it">organisation</span> problem.
              </h2>
              <p>
                The visual gaps were obvious. But two other problems were slowing down any solution: stakeholder
                decisions that kept reversing, and a build process that did not faithfully reproduce what was designed.
                Fixing the screens without addressing either of those would have meant designing the same things twice.
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

      {/* ===== STICKY MODULE NAV ===== */}
      <ModuleNav />

      {/* ===== MODULE 00: OVERVIEW ===== */}
      <section id="overview" className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">Module 00</div>
              <div className="tick"></div>
              <div className="aside-note">Overview</div>
            </aside>
            <div className="csx-body">
              <h2>
                One surface to answer the question every vendor asks on <span className="it">Monday morning.</span>
              </h2>
              <p>
                Before a vendor opens a single module, they need to know whether the program is healthy. The
                Overview redesign started there: what does a partnership manager actually need to see the moment
                they log in? The answer was not a dashboard full of charts. It was a short list of decisions
                that needed making today, and the context to make them.
              </p>
              <p className="dim">
                The getting-started flow is a first-class part of the design, not an afterthought. New vendors
                see a five-step quickstart with a progress ring, locked previews of the screens they are building
                toward, and a setup call option that surfaces a named partner success manager rather than a
                generic support link. Once the program is live, the overview becomes a configurable scorecard,
                an attention queue for approvals and stalled deals, and an AI briefing that surfaces the three
                most actionable things in the data that day. The customise panel lets each user choose which
                four metrics they want on their scorecard, without changing what anyone else sees.
              </p>
            </div>
          </Container>
        </Reveal>
        <DemoEmbed slug="overview-demo" label="Overview" />
      </section>

      {/* ===== MODULE 01: DEALS MANAGEMENT ===== */}
      <section id="deals-management" className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">Module 01</div>
              <div className="tick"></div>
              <div className="aside-note">Deals Management</div>
            </aside>
            <div className="csx-body">
              <h2>
                Every deal&rsquo;s status, <span className="it">scannable</span> without opening it.
              </h2>
              <p>
                The deals module had to answer a practical question at a glance: which deals need attention right now?
                The previous design required opening each record to understand its state. The redesign introduced a
                clear set of deal states, default, management, and completed, so partnership managers could scan the
                list without drilling in.
              </p>
              <p className="dim">
                A filter component with a warning indicator surfaces deals that need action without badge hunting.
                The primary and tertiary button hierarchy keeps the most common action prominent without cluttering the
                interface with equal-weight options. Partner detail panels open as overlays rather than routing to a
                separate page, so the list context stays intact while the user is working inside a record.
              </p>
            </div>
          </Container>
        </Reveal>
        <DemoEmbed slug="deals-demo" label="Deals Management" />
      </section>

      {/* ===== MODULE 02: ACCOUNT MAPPING ===== */}
      <section id="account-mapping" className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">Module 02</div>
              <div className="tick"></div>
              <div className="aside-note">Account Mapping</div>
            </aside>
            <div className="csx-body">
              <h2>
                Name what you need <span className="it">before</span> you ask for it.
              </h2>
              <p>
                Connecting a CRM is the moment a user hands over access to sensitive business data. The flow had to
                make the scope of that access legible before it happened. The copy that precedes the authorisation
                redirect names it plainly: <em>we only access what is needed to map your accounts.</em> That sentence
                sits above the button, not buried in a permissions modal.
              </p>
              <p className="dim">
                The connection journey uses step badges to track progress through a multi-stage flow. Each state has a
                distinct visual treatment: Not connected, Connected but not yet selected, Selected, Pending, and
                Success. A verification badge confirms a successful link. Users who abandon mid-flow re-enter and see
                exactly where they left off, without losing progress.
              </p>
            </div>
          </Container>
        </Reveal>
        <DemoEmbed slug="account-mapping-demo" label="Account Mapping" />
      </section>

      {/* ===== MODULE 03: ANALYTICS ===== */}
      <section id="analytics" className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">Module 03</div>
              <div className="tick"></div>
              <div className="aside-note">Analytics</div>
            </aside>
            <div className="csx-body">
              <h2>
                Give everyone a different <span className="it">view</span> of the same data.
              </h2>
              <p>
                Analytics dashboards for B2B platforms face a familiar tension: the metrics a vendor cares about are
                not the same ones a partner manager cares about. A single fixed layout satisfies nobody. The solution
                was a customise view overlay that lets users control which data surfaces they see and how they are
                arranged, without changing the underlying dataset.
              </p>
              <p className="dim">
                The base dashboard ships with a sensible default. The customisation modal is accessible directly from
                the top bar and applies changes immediately. Features on the roadmap but not yet shipped are kept as
                hidden sections in the Figma file, holding the design work without surfacing it in the live product
                until the engineering work catches up.
              </p>
            </div>
          </Container>
        </Reveal>
        <DemoEmbed slug="analytics-demo" label="Analytics" />
      </section>

      {/* ===== MODULE 04: PARTNER TRAINING ===== */}
      <section id="partner-training" className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">Module 04</div>
              <div className="tick"></div>
              <div className="aside-note">Partner Training</div>
            </aside>
            <div className="csx-body">
              <h2>
                The same module, three <span className="it">different</span> jobs.
              </h2>
              <p>
                Training content in a partner platform serves three separate audiences at once. The Vendor builds and
                publishes modules. The Partner Admin deploys them to their team. The Partner User completes them. Each
                role needed its own view of the same underlying structure, without tripling the management overhead
                behind it.
              </p>
              <p className="dim">
                Content creation offered two paths: upload existing material and have the system structure it into a
                module, or build from scratch manually. Both lead to the same module dashboard. Certification states,
                certified, not yet certified, and partner-certified, gave vendors a legible read on completion across
                their partner base without opening individual records. Empty states were designed for the onboarding
                moment, when a vendor logs in for the first time and the module list is blank.
              </p>
            </div>
          </Container>
        </Reveal>
        <DemoEmbed slug="partner-training-demo" label="Partner Training" />
      </section>

      {/* ===== MODULE 05: CONTENT LIBRARY ===== */}
      <section id="content-library" className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">Module 05</div>
              <div className="tick"></div>
              <div className="aside-note">Content Library</div>
            </aside>
            <div className="csx-body">
              <h2>
                Content access is a <span className="it">permissions</span> problem first.
              </h2>
              <p>
                A content library in a partner platform is not just a file system. The wrong partner seeing draft
                materials, pricing documents, or unreleased product content is a real business risk. The design
                organised content into folders with per-folder access control: who can view it, who can edit it, set
                at creation and adjustable after.
              </p>
              <p className="dim">
                Three role views, Vendor User, Partner Admin, and Partner User, gave each audience the right level of
                control without surfacing settings they could not act on. Three folder creation paths covered the main
                use cases: build manually, generate structure using AI, or mirror from an existing external source.
                The mirroring flow included a review step where vendors inspect what will be pulled in before
                confirming, reducing the risk of accidentally surfacing content from an unreviewed source.
              </p>
            </div>
          </Container>
        </Reveal>
        <DemoEmbed slug="content-library-demo" label="Content Library" />
      </section>

      {/* ===== MODULE 06: ENGAGEMENT ===== */}
      <section id="engagement" className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">Module 06</div>
              <div className="tick"></div>
              <div className="aside-note">Engagement</div>
            </aside>
            <div className="csx-body">
              <h2>
                Which partners are <span className="it">drifting,</span> and which need a nudge.
              </h2>
              <p>
                Vendors managing dozens of partner relationships cannot check in manually. The engagement module
                answers the question a vendor asks at the start of the week: who has gone quiet, and who is active?
                Activity data, logins, content consumed, training completed, deal movement, rolls up into a surface
                that flags disengaged partners without requiring a deep dive into individual records.
              </p>
              <p className="dim">
                The design prioritises signal over noise. Rather than surfacing every data point, the engagement view
                surfaces the partners who have crossed an activity threshold in either direction, so a vendor can act
                quickly on the ones that matter without wading through a full audit log.
              </p>
            </div>
          </Container>
        </Reveal>
        <DemoEmbed slug="engagement-demo" label="Engagement" />
      </section>

      {/* ===== REFLECTION ===== */}
      <section className="csx-sec">
        <Reveal>
          <Container className="csx-sec-grid">
            <aside className="csx-sec-aside">
              <div className="csx-sec-num">Reflection</div>
              <div className="tick"></div>
            </aside>
            <div className="csx-body">
              <h2>
                What I would do with more <span className="it">time.</span>
              </h2>
              <p>
                The thing I would change is where I started. I began in the interface, working from the existing
                product and conversations with stakeholders. What I did not do first was spend meaningful time inside
                the partner ecosystem industry itself: talking to partnership managers at other companies,
                understanding how they think about vendor relationships, where the real friction lives day-to-day.
              </p>
              <p className="dim">
                That research would have sharpened the problem framing earlier, and likely changed some of the
                decisions made in the first few modules. The stakeholder revision problem would also have benefited
                from an explicit alignment session before the first design was shown, not after. Getting
                decision-makers to agree on criteria before seeing options is harder to arrange than it sounds, but it
                would have saved significant design cycles.
              </p>
              <p className="dim">
                The outcome that mattered: paying customers who saw the new designs said they preferred it, and that
                they would recommend Airstride&rsquo;s UX to other companies. The opportunity cost sits in the
                industry research that did not happen, the depth that might have made the six modules sharper from
                the start.
              </p>
            </div>
          </Container>
        </Reveal>
      </section>
    </div>
  );
}
