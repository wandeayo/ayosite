import { CaseCover } from "@/components/case-study/case-cover";
import { CaseFigure } from "@/components/case-study/case-figure";
import { CaseHero } from "@/components/case-study/case-hero";
import { CaseImageBlock } from "@/components/case-study/case-image-block";
import { CaseSection } from "@/components/case-study/case-section";

const PROBLEMS = [
  {
    id: "P.01",
    title: "No shared vocabulary.",
    body: "Designers, engineers, and stakeholders argued in fragments. There was no canonical button, no agreed spacing scale, no named tokens. Every cycle re-litigated the same decisions, and cycles got longer for it.",
  },
  {
    id: "P.02",
    title: "The brand was a logo.",
    body: "Beyond the mark, nothing was defined. Type, colour, spacing, motion: all of it lived in whichever file shipped last. Recognition slipped from one release to the next.",
  },
  {
    id: "P.03",
    title: "The builder propagated drift.",
    body: "Dexla is a no-code app builder, so any drift at the system layer multiplied through every app a customer shipped. The system had to hold for our product and for the apps built on top of it.",
  },
];

/**
 * Dexla Design System: UX case study.
 *
 * Drafted from the project's existing Notion writeup. Source did not include
 * verifiable metrics, attributed quotes, or rejected-alternative process
 * artefacts, so the case study omits CaseStats and CasePullQuote and keeps
 * the outcome section grounded in what was visibly delivered.
 */
export function DexlaDesignSystemCase() {
  return (
    <>
      <CaseHero
        meta={[
          { label: "Client", value: "Dexla · 2024" },
          { label: "Role", value: "UX Designer" },
          { label: "Team", value: "2 designers (with Toba)" },
          { label: "Status", value: "Shipped · Documented", highlight: true },
        ]}
        title={
          <>
            Dexla:
            <br />
            from a logo
            <br />
            to a <span className="accent-it">system</span>.
          </>
        }
        lede={
          <>
            Dexla is an AI-powered no-code app builder for technical and non-technical users. When
            I joined, the brand was a logo. By the time we shipped, it was a style guide, a
            component library, and Notion documentation we wrote alongside engineering.
          </>
        }
        cta={{
          label: "Read the original on Notion",
          href: "https://dexlads.notion.site/Design-System-Dexla-s-18791097c89f80b09293ca85162b2fb2",
        }}
      />

      <CaseCover glyph="D" caption="Dexla design system · Cover" />

      <CaseSection
        step="01 / Context"
        title={
          <>
            Day one
            <br />
            was a logo.
          </>
        }
      >
        <p className="text-ink">
          Dexla was scaling fast. New features shipped each cycle, and consistency was being
          argued from scratch every time. The only piece of brand that existed was the logo. The
          rest (typography, colour, spacing, controls) was case-by-case.
        </p>
        <p className="text-ink-dim">
          Toba joined during the early weeks and we built the system together. The challenge was
          less about visuals and more about agreement. With no shared vocabulary, every new screen
          meant a fresh debate. Cycles grew, repetition crept in, and the brand started feeling
          thinner each release.
        </p>
      </CaseSection>

      <CaseSection
        step="02 / Problem"
        title={
          <>
            Three things
            <br />
            the system had
            <br />
            to fix.
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
        caption="Process · Style guide, primitives, components, patterns"
        display={<>Atomic Design</>}
        kicker="METHODOLOGY"
      />

      <CaseSection
        step="03 / Process"
        title={
          <>
            What we built,
            <br />
            and in what order.
          </>
        }
      >
        <p className="text-ink">
          We started with a competitive read of Material, Atlassian, and Wise. Useful for
          principles. Less useful for the question we actually had, which was how to build a
          system from scratch while the product was shipping new features each week. Published
          systems describe the rules they ended up with, not the order they arrived at them.
        </p>
        <p className="text-ink">
          The style guide came first. Type ramp, colour, spacing scale, named tokens. Things that
          could be agreed in a room and then referenced in a comment thread. Atomic Design gave us
          the structure to grow into: primitives at the bottom, components in the middle, patterns
          at the top. Whatever we added later had a place to land.
        </p>
        <p className="text-ink">
          The component library followed. Buttons, input fields, modals, navigation bars, cards,
          in that order. The choice was not aesthetic, it was frequency of use across the product.
          A button decision touches more screens than a tooltip decision.
        </p>
        <p className="text-ink">
          The no-code editor needed its own pass. Customers were building apps with Dexla, which
          meant components had to expose customisation surfaces (colour, copy, layout) without
          losing the constraints that kept the output recognisable. The same control had to behave
          in two contexts: ours, where the system was authoritative, and theirs, where the system
          was a starting point.
        </p>
        <p className="text-ink-dim">
          Documentation came last and lived where engineering already worked. In Notion. Each
          component got a page. Each token got a name and a reason.
        </p>
      </CaseSection>

      <CaseFigure
        surface="tile"
        images={[
          {
            src: "/work/dexla-design-system.png",
            alt: "Dexla design system documentation cover",
            width: 1600,
            height: 1000,
          },
        ]}
        caption="Documentation cover · Dexla design system in Notion"
        kicker="DELIVERABLE"
      />

      <CaseSection
        step="04 / Outcome"
        title={
          <>
            What shipped.
          </>
        }
      >
        <p className="text-ink">
          The system landed as a style guide, a component library, no-code editor components, and
          a Notion site. Each piece linked to the next: component pages referenced the token
          names, token names referenced the style guide. The documentation lived where engineering
          already worked, which kept the system close to the people consuming it.
        </p>
      </CaseSection>

      <CaseSection
        step="05 / Reflection"
        title={
          <>
            What I would
            <br />
            revisit.
          </>
        }
      >
        <p className="text-ink">
          The system was built while the product was shipping. That meant some primitives went out
          before their state coverage was complete. If I did this again I would treat
          documentation as part of a component&rsquo;s release, not a sweep done afterwards.
        </p>
        <p className="text-ink-dim">
          The no-code editor pass is the part I would want to spend more time on. Customising a
          component without breaking the brand is its own design problem, and one round was the
          budget we had.
        </p>
      </CaseSection>
    </>
  );
}
