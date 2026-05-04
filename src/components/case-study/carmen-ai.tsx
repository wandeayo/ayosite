import { CaseCover } from "@/components/case-study/case-cover";
import { CaseHero } from "@/components/case-study/case-hero";
import { CaseImageBlock } from "@/components/case-study/case-image-block";
import { CasePullQuote } from "@/components/case-study/case-pull-quote";
import { CaseSection } from "@/components/case-study/case-section";
import { CaseStats, type CaseStat } from "@/components/case-study/case-stats";

const STATS: CaseStat[] = [
  {
    value: "3.2",
    unit: "x",
    description: "Faster review of agent activity vs the pilot baseline.",
    label: "Action review time",
  },
  {
    value: "94",
    unit: "%",
    description: "Of operators rated trust at 4 or 5 of 5 after week one.",
    label: "Operator trust score",
  },
  {
    value: "14",
    description: "Enterprise pilot accounts onboarded in Q1 2026.",
    label: "Pilot accounts",
  },
  {
    value: "0",
    description: "Reported incidents of unwanted outreach during pilot.",
    label: "Trust failures",
  },
];

const PROBLEMS = [
  {
    id: "P.01",
    title: "The trust cliff.",
    body: "One wrong outreach erodes months of trust. The interface had to make every Carmen action reviewable in under three seconds.",
  },
  {
    id: "P.02",
    title: "The legibility gap.",
    body: "Sales leaders needed to know not just what Carmen did, but why. Every action surface needed to expose its reasoning trail.",
  },
  {
    id: "P.03",
    title: "The handoff seam.",
    body: "Carmen drafts, the human refines, Carmen learns. The seam between agent and operator needed to feel like a conversation, not a form.",
  },
];

export function CarmenAICase() {
  return (
    <>
      <CaseHero
        meta={[
          { label: "Client", value: "Airstride · 2025" },
          { label: "Role", value: "Lead Product Designer" },
          { label: "Team", value: "2 designers · 5 engineers · PM" },
          { label: "Status", value: "Shipped · Production", highlight: true },
        ]}
        title={
          <>
            Carmen AI:
            <br />
            giving an <span className="accent-it">agent</span>
            <br />a face users trust.
          </>
        }
        lede={
          <>
            Carmen is an AI partner acquisition agent that researches, drafts, and follows up on
            outbound at scale. The challenge was not making her capable. It was making her legible.
            People do not trust what they cannot read.
          </>
        }
      />

      <CaseCover glyph="C" caption="Carmen AI · Hero composition" />

      <CaseSection
        step="01 / Context"
        title={
          <>
            The brief was
            <br />
            misleading.
          </>
        }
      >
        <p className="text-ink">
          Airstride asked for an AI agent dashboard. What they actually needed was a control
          surface for trust. Their pilot users were enterprise sales leaders, people who had been
          burned by overpromising AI before. If Carmen made one bad outreach in their voice, the
          relationship was over.
        </p>
        <p className="text-ink-dim">
          The first design moved 90 percent of decisions to the user. It tested poorly. Then the
          system felt like a chore. The second design moved 90 percent of decisions to Carmen. It
          tested poorly. Then it felt like a black box. The shipped version is the third one.
        </p>
      </CaseSection>

      <CaseSection
        step="02 / Problem"
        title={
          <>
            Three failures
            <br />
            I needed to design around.
          </>
        }
      >
        <ul className="list-none">
          {PROBLEMS.map((problem) => (
            <li
              key={problem.id}
              className="grid grid-cols-[80px_1fr] items-start gap-6 border-t border-line py-5 last:border-b"
            >
              <span className="font-mono text-[11px] tracking-[0.06em] text-accent">
                {problem.id}
              </span>
              <p className="text-[17px] leading-[1.55]">
                <strong className="font-medium">{problem.title}</strong> {problem.body}
              </p>
            </li>
          ))}
        </ul>
      </CaseSection>

      <CaseImageBlock
        caption="Process · System diagram, trust model, capability map"
        display={<>Trust = legibility × control</>}
        kicker="THE GUIDING EQUATION"
      />

      <CaseSection
        step="03 / Process"
        title={
          <>
            A reasoning
            <br />
            layer, not
            <br />a chat.
          </>
        }
      >
        <p className="text-ink">
          The shipped Carmen has three permanent surfaces: the queue, the reasoning panel, and the
          approval seam. Every Carmen action lives in the queue. Every queue item has an attached
          reasoning panel that exposes inputs, decisions, and confidence. Every action above a
          configurable threshold pauses for the operator.
        </p>
        <p className="text-ink">
          Confidence is the most important number on the screen. We render it with a typographic
          weight, not a percentage. High confidence is set in display serif. Medium is set in
          sans. Low is set in mono with a warm warning hue. Operators learn the visual rhythm in
          under a day.
        </p>
      </CaseSection>

      <CasePullQuote
        quote={
          <>
            Carmen finally feels like a colleague <span className="accent-it">I can read,</span>{" "}
            not a black box I have to babysit.
          </>
        }
        attribution="Director of Partnerships · Carmen pilot · Enterprise account"
      />

      <CaseSection
        step="04 / Outcome"
        title={
          <>
            What shipped,
            <br />
            and what changed.
          </>
        }
      >
        <p className="text-ink">
          Carmen launched to 14 enterprise pilot accounts in Q1 2026. The interface, not the
          model, is what closed the second-stage commitments. Pilot retention sits well above the
          category benchmark, and three accounts upgraded to multi-seat within thirty days of
          launch.
        </p>
      </CaseSection>

      <CaseStats stats={STATS} />

      <CaseSection
        step="05 / Reflection"
        title={
          <>
            What I would
            <br />
            do differently.
          </>
        }
      >
        <p className="text-ink">
          The reasoning panel is the most polished part of the product, and the part operators use
          the least once they trust it. I should have designed it to recede sooner. Trust is
          something you build, then quietly retire the scaffolding.
        </p>
        <p className="text-ink-dim">
          The next iteration will explore an ambient trust mode, where the reasoning panel
          collapses into a sidebar glance once an operator has approved a hundred of Carmen&apos;s
          actions in a category. The interface should grow with the relationship.
        </p>
      </CaseSection>
    </>
  );
}
