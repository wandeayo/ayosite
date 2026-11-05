/**
 * The four case studies: route, metadata and the hero/next-nav copy.
 * Every string is verbatim from waande-case-handoff/reference/<case>.html
 * (curly quotes included), except the Company label and the Scope values,
 * which Ayo updated on 2026-11-05. "human‑in‑the‑loop" uses U+2011
 * non-breaking hyphens so it never splits across lines (as the home H1 does). The bodies live in ./pages.
 */

export type CaseSlug = "carmen-ai" | "airstride" | "arctic-edge" | "dexla-design-system";
export type TileKind = "carmen" | "air" | "arctic" | "dexla";

export interface CaseLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface CaseMeta {
  slug: CaseSlug;
  /** Name on the previous/next cards. */
  name: string;
  /** <title>, from the reference. */
  title: string;
  /** <meta name="description"> from the reference. */
  description: string;
  tile: TileKind;
  hero: {
    label: string;
    h1: string;
    lede: string;
    links?: CaseLink[];
    facts: ReadonlyArray<readonly [string, string]>;
  };
  /** One line under the name on the "Next case" card. */
  teaser: string;
}

export const CASES: Record<CaseSlug, CaseMeta> = {
  "carmen-ai": {
    slug: "carmen-ai",
    name: "Carmen",
    title: "Carmen · Ayowande Olubo",
    description:
      "Case study: designing Carmen, Airstride's AI partner-acquisition agent, so sceptical partnership managers would trust it.",
    tile: "carmen",
    hero: {
      label: "Case 01 · AI partner acquisition",
      h1: "Teaching a sales team to trust an agent that works while they sleep.",
      lede: "Carmen is Airstride’s AI agent for partner acquisition. It sources, qualifies and contacts partners on its own. The automation was never the hard part. Getting a sceptical partnership manager to hand over the relationship was.",
      facts: [
        ["Company", "Airstride · 2025"],
        ["Role", "Product Designer"],
        ["Scope", "0→1 agentic UX, human‑in‑the‑loop setup, AI trust and transparency"],
        ["Status", "Shipped to production"],
      ],
    },
    teaser: "Teaching a sales team to trust an agent.",
  },
  airstride: {
    slug: "airstride",
    name: "Airstride",
    title: "Airstride · Ayowande Olubo",
    description:
      "Case study: redesigning all six modules of Airstride’s partner management platform as the sole designer.",
    tile: "air",
    hero: {
      label: "Case 02 · Partner management platform",
      h1: "Redesigning the platform that was losing deals.",
      lede: "Airstride built a partner management suite, but the interface fell behind the product. Prospects were naming the UX as the reason they chose a competitor. I came in as the sole designer and rebuilt all six modules, plus a new overview, from scratch.",
      links: [
        { label: "See it live ↗", href: "https://app.airstride.ai", primary: true },
        { label: "Visit airstride.ai ↗", href: "https://airstride.ai" },
      ],
      facts: [
        ["Company", "Airstride · 2025"],
        ["Role", "UX Designer"],
        ["Scope", "End-to-end product design, AI features, coded prototypes"],
        ["Status", "Shipped to production"],
      ],
    },
    teaser: "Redesigning the platform that was losing deals.",
  },
  "arctic-edge": {
    slug: "arctic-edge",
    name: "Arctic Edge",
    title: "Arctic Edge · Ayowande Olubo",
    description: "Case study: redesigning the Arctic Edge smart ice bath app around one readable home screen.",
    tile: "arctic",
    hero: {
      label: "Case 03 · Smart hardware app",
      h1: "Redesigning the smart ice bath app, so the tub runs without thinking about the app.",
      lede: "Arctic Edge makes smart cooling tubs. Their companion app worked, but read as cluttered: competing surfaces, decorative colour, and a temperature you had to look at twice. The brief was a redesign people could operate at a glance, often with wet hands.",
      links: [{ label: "Visit Arctic Edge ↗", href: "https://www.arcticedge.me/" }],
      facts: [
        ["Company", "Arctic Edge · 2024"],
        ["Role", "UI Designer"],
        ["Scope", "Mobile product design, hardware control UX, state and safety systems"],
        ["Status", "Delivered"],
      ],
    },
    teaser: "Redesigning the smart ice bath app.",
  },
  "dexla-design-system": {
    slug: "dexla-design-system",
    name: "Dexla Design System",
    title: "Dexla · Ayowande Olubo",
    description:
      "Case study: building Dexla’s design system from a logo to tokens, components and documentation.",
    tile: "dexla",
    hero: {
      label: "Case 04 · Design system",
      h1: "Dexla: from a logo to a system.",
      lede: "Dexla is an AI-powered no-code app builder. When I joined, the brand was a logo. By the time we shipped, it was a style guide, a component library, editor components and Notion documentation written alongside engineering.",
      links: [
        {
          label: "Read the docs on Notion ↗",
          href: "https://dexlads.notion.site/Design-System-Dexla-s-18791097c89f80b09293ca85162b2fb2",
        },
      ],
      facts: [
        ["Company", "Dexla · 2024"],
        ["Role", "UX Designer"],
        ["Scope", "Design system, tokens, AI builder components"],
        ["Status", "Shipped and documented"],
      ],
    },
    teaser: "From a logo to a system.",
  },
};

/** Reading order for previous/next: Carmen → Airstride → Arctic Edge → Dexla → Carmen. */
export const CASE_ORDER: readonly CaseSlug[] = ["carmen-ai", "airstride", "arctic-edge", "dexla-design-system"];

export const isCaseSlug = (slug: string): slug is CaseSlug => (CASE_ORDER as readonly string[]).includes(slug);

export function adjacentCases(slug: CaseSlug): { prev: CaseMeta; next: CaseMeta } {
  const i = CASE_ORDER.indexOf(slug);
  const n = CASE_ORDER.length;
  return { prev: CASES[CASE_ORDER[(i - 1 + n) % n]], next: CASES[CASE_ORDER[(i + 1) % n]] };
}
