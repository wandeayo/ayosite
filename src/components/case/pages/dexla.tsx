import { DexlaThumb } from "@/components/landing/thumbs/thumbs";

import { Body, Closing, Fig, Impact, Pair, PairFig, Problems, Section, WideImage } from "../blocks";
import { CaseLayout, HeroFigure } from "../case-layout";
import { CASES } from "../cases";

/**
 * Dexla figures, built by scripts/export-case-images.mjs. The originals cap the
 * density: brand is 1.38x, docs has no 2x (the source is the 1x capture's size).
 */
const DX = "/work/dexla-design-system";
const BRAND = { src: `${DX}/brand`, w: 800, h: 410, hi: 1107 / 800 };
const ATOMIC = { src: `${DX}/atomic`, w: 800, h: 761, hi: 2 };
const EDITOR = { src: `${DX}/editor`, w: 800, h: 450, hi: 2 };
const COMPONENTS = { src: `${DX}/components`, w: 800, h: 704, hi: 2 };
const DOCS = { src: `${DX}/docs`, w: 734, h: 774 };

/** Copy verbatim from waande-case-handoff/reference/dexla.html. */
export function DexlaCase() {
  return (
    <CaseLayout meta={CASES["dexla-design-system"]}>
      <HeroFigure thumb={<DexlaThumb />} caption="One token change updating every component, in light and dark. Hover to inspect." />

      <Impact
        label="Deliverables"
        items={[
          ["1 → 4", "from a logo to style guide, library, editor kit and docs"],
          ["2", "designers, building while the product shipped weekly"],
          ["Every", "component page linked to its named tokens"],
          ["Notion", "docs kept where engineering already worked"],
        ]}
      />

      <Body
        toc={[
          { id: "context", label: "Context" },
          { id: "problems", label: "Problems" },
          { id: "process", label: "Process" },
          { id: "closing", label: "In closing" },
        ]}
      >
        <Section id="context" label="01 · Context" title="Day one was a logo.">
          <p>
            Dexla was scaling fast and every new screen restarted the same debates. Typography, colour, spacing and controls
            were decided case by case. Toba and I built the system together, and the hard part was less the visuals than
            getting agreement.
          </p>
        </Section>
      </Body>

      <Fig n={2} caption="Starting point: the brand assets at day one. A logo lockup and nothing else.">
        <WideImage tile="dexla" img={BRAND} alt="Dexla brand assets at day one: icon, wordmark and combination mark" />
      </Fig>

      <Body>
        <Section id="problems" label="02 · Problems" title="Three things the system had to fix.">
          <Problems
            items={[
              ["No shared vocabulary", "No canonical button, no spacing scale, no named tokens. Every cycle re-argued the same decisions."],
              ["The brand was a logo", "Beyond the mark, type, colour and spacing lived in whichever file shipped last."],
              ["The builder multiplied drift", "Dexla builds apps, so any drift at the system layer spread into every app a customer shipped."],
            ]}
          />
        </Section>

        <Section id="process" label="03 · Process" title="What we built, and in what order.">
          <p>
            The style guide came first: a type ramp, colour, spacing and named tokens, things that could be agreed in a room
            and referenced in a comment thread. Atomic Design gave us the structure to grow into.
          </p>
        </Section>
      </Body>

      <Fig n={3} caption="The Atomic Design map: atoms, molecules, organisms and templates.">
        <WideImage
          tile="dexla"
          dark
          img={ATOMIC}
          alt="Atomic Design map: atoms, molecules, organisms and templates built from Dexla components"
        />
      </Fig>

      <Body>
        <Section cont>
          <p>
            The component library followed, ordered by frequency of use rather than taste: buttons, inputs, modals,
            navigation, cards. A button decision touches more screens than a tooltip decision.
          </p>
          <p>
            The no-code editor needed its own pass. The same control had to behave in two contexts: ours, where the system
            is authoritative, and the customer’s, where it is a starting point they can customise without losing what makes
            the output recognisable.
          </p>
        </Section>
      </Body>

      <Fig n={4} caption="The no-code editor: modifier panels, alignment, the component drawer.">
        <WideImage
          tile="dexla"
          img={EDITOR}
          alt="No-code editor surfaces: action modifiers, alignment controls, language switcher and component drawer"
        />
      </Fig>

      <Body>
        <Section cont>
          <p>Documentation lived where engineering already worked. Each component got a Notion page, and each token a name and a reason.</p>
        </Section>
      </Body>

      <Pair>
        <PairFig n={5} caption="Component pages.">
          <WideImage tile="dexla" img={COMPONENTS} alt="Component documentation pages for alerts, avatars, search, inputs, accordion and modal" />
        </PairFig>
        <PairFig n={6} caption="Usage, placement and content rules.">
          <WideImage tile="dexla" img={DOCS} alt="Alert documentation covering usage guidelines, placement and content" />
        </PairFig>
      </Pair>

      <Body>
        <Closing>
          Dexla went from a logo to a working system: a style guide, a component library, editor components that let
          customers customise without breaking the brand, and Notion documentation where every component page points to its
          named tokens. Design and engineering finally argued from the same vocabulary.
        </Closing>
      </Body>
    </CaseLayout>
  );
}
