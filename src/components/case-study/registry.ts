import type { ComponentType } from "react";

import { ArcticEdgeCase } from "@/components/case-study/arctic-edge";
import { CarmenAICase } from "@/components/case-study/carmen-ai";

/**
 * Slug → case-study component. Anything not in this map renders the
 * in-progress fallback at @/components/case-study/case-in-progress.
 *
 * Two case-study templates are in use. Mirror the closest one when adding
 * a new study:
 *
 *  - **UI template** — for visual-craft / redesign stories. Sections:
 *    Context → Audit → System → Modal vocabulary → Repeating flows →
 *    Operator surface → Reflection. Heavy use of CaseFigure (flush phone
 *    grids) and CaseBeforeAfter. No CaseStats. Reference: ArcticEdgeCase.
 *
 *  - **UX template** — for problem-led product stories. Sections:
 *    Context → Problem → Process → Outcome → Reflection. Uses CaseImageBlock
 *    typographic separators, CasePullQuote (real quotes only), and CaseStats
 *    (real metrics only). Reference: CarmenAICase.
 *
 * Every CaseHero accepts an optional `cta` — point it at the live project URL.
 */
export const CASE_STUDIES: Record<string, ComponentType> = {
  "carmen-ai": CarmenAICase,
  "arctic-edge": ArcticEdgeCase,
};
