import { AirstrideThumb } from "@/components/landing/thumbs/thumbs";

import { ModuleExplorer } from "../airstride/module-explorer";
import { Body, Closing, Fig, Impact, Problems, Section } from "../blocks";
import { CaseLayout, HeroFigure } from "../case-layout";
import { CASES } from "../cases";

/** Copy verbatim from waande-case-handoff/reference/airstride.html. */
export function AirstrideCase() {
  return (
    <CaseLayout meta={CASES.airstride}>
      <HeroFigure thumb={<AirstrideThumb />} caption="Deals board to AI deal summary. Hover to inspect." />

      <Impact
        label="Impact"
        items={[
          ["6", "modules redesigned end to end, plus a new overview"],
          ["1", "designer across every module"],
          ["84%", "conversion lift on the redesigned marketing site"],
          ["Preferred", "by paying customers, who said they’d recommend the UX"],
        ]}
      />

      <Body
        toc={[
          { id: "context", label: "Context" },
          { id: "problems", label: "Problems" },
          { id: "modules", label: "The modules" },
          { id: "closing", label: "In closing" },
        ]}
      >
        <Section id="context" label="01 · Context" title="UX was showing up on sales calls as a named objection.">
          <p>
            Airstride’s platform covered deals, CRM account mapping, partner training, content and engagement. The
            capability was real. What was failing was the surface: prospects evaluated it, then went with a rival and named
            the interface as the tipping point.
          </p>
        </Section>

        <Section id="problems" label="02 · Problems" title="Three problems. Only one of them was on screen.">
          <p>Fixing the screens without addressing the other two would have meant designing everything twice.</p>
          <Problems
            items={[
              ["The deal-loser", "Prospects named the interface as the reason they picked a competitor. UX had become a line item on the sales call."],
              ["The revision spiral", "Stakeholder churn sent finished screens back for variations. Design time went to decisions that would not stay made."],
              [
                "The implementation gap",
                "Builds drifted from the designs. The Mantine UI library gave developers choices that diverged from intent, with no close review to catch it.",
              ],
            ]}
          />
        </Section>

        <Section id="modules" label="03 · The modules" title="Each module answers one question at a glance.">
          <p>
            I worked module by module, starting from the question a partnership manager brings to it, then designing every
            state around that answer: empty, first run, in progress, done.
          </p>
        </Section>
      </Body>

      <Fig n={2} caption="Seven modules, one designer. Each frame opens the auto-playing prototype I built for that module.">
        <ModuleExplorer />
      </Fig>

      <Body>
        <Section cont>
          <p>
            Two decisions carried across every module. Detail opens as an overlay rather than a new page, so people never
            lose their place in a list. And every flow that touches sensitive data, CRM access or partner permissions, says
            what it needs before it asks.
          </p>
        </Section>

        <Closing>
          Airstride’s interface went from the reason prospects walked away to something paying customers said they’d
          recommend. Six modules and a new overview now share one system, each built around the question a partnership
          manager brings to it, and the marketing site I redesigned alongside it lifted conversion by 84%.
        </Closing>
      </Body>
    </CaseLayout>
  );
}
