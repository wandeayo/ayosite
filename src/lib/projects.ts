export type ThumbKind = "carmen" | "airstride" | "arctic" | "dexla";

export interface Project {
  slug: string;
  num: string;
  title: string;
  summary: string;
  description: string;
  /** Longer description shown on the /work archive page rows. */
  workDescription: string;
  year: string;
  role: string;
  tags: string[];
  featured?: boolean;
  /** Background gradient used in cursor previews and card media. */
  cardGradient: string;
  /** Preview image shown in cursor-tracking work list (path under /public). */
  cardImage?: string;
  /** Which animated thumbnail to render on cards. */
  thumbKind: ThumbKind;
}

export const PROJECTS: Project[] = [
  {
    slug: "carmen-ai",
    num: "01",
    title: "Carmen AI",
    summary: "AI Agent · SaaS",
    description:
      "Autonomous agent for partner acquisition. The hard part was building trust into something that sends messages while no one is watching.",
    workDescription:
      "An autonomous agent that sources, qualifies, and reaches out to partners across LinkedIn and email without anyone pushing the buttons. The interesting problem wasn't the automation. It was getting a sceptical partnership manager to hand over the relationship. Most of the design is about making the agent legible: metrics first, a live narrated timeline of what it's doing right now, and a Pause button you can always reach.",
    year: "2025",
    role: "Product Designer",
    tags: ["AI Agent", "B2B SaaS", "Trust"],
    featured: true,
    cardGradient: "linear-gradient(135deg, #1a2a1f 0%, #0f1612 100%)",
    cardImage: "/work/carmen-ai.png",
    thumbKind: "carmen",
  },
  {
    slug: "airstride",
    num: "02",
    title: "Airstride",
    summary: "Internal Web App",
    description:
      "Internal web app for partner program AI. From zero to design system. 84% conversion lift on the marketing site.",
    workDescription:
      "The platform worked, but the UX had fallen behind. Prospects were naming the interface as the reason they chose a competitor. I came in as the sole designer and redesigned all six modules from scratch: Deals, Account Mapping, Analytics, Training, Content, and Engagement. (The +84% conversion lift came from the separate marketing-site rebuild.)",
    year: "2025",
    role: "UX Designer",
    tags: ["Web App", "6 Modules", "End-to-end"],
    cardGradient: "linear-gradient(135deg, #1f1a26 0%, #0f0c14 100%)",
    cardImage: "/work/airstride.png",
    thumbKind: "airstride",
  },
  {
    slug: "arctic-edge",
    num: "03",
    title: "Arctic Edge",
    summary: "Mobile · Wellness",
    description: "Cold water therapy app. Redesigned the visual language, the IA, and the temperature dial people stare at while sitting in ice.",
    workDescription:
      "The companion app for a smart ice-bath. It worked, but read as cluttered: a temperature you had to look twice to read and no visible system state. I rebuilt the home screen around one unmissable dial whose ring colour is the state. Blue cooling, red heating, grey off.",
    year: "2024",
    role: "UI Designer",
    tags: ["Mobile", "Hardware", "IA Refresh"],
    cardGradient: "linear-gradient(135deg, #1a242a 0%, #0c1316 100%)",
    cardImage: "/work/arctic-edge.png",
    thumbKind: "arctic",
  },
  {
    slug: "dexla-design-system",
    num: "04",
    title: "Dexla Design System",
    summary: "Tokens · Components",
    description:
      "Tokens, primitives and patterns for a no-code AI builder. Documentation engineers actually used.",
    workDescription:
      "Dexla brought me in to lead their redesign from a low-code builder into a fully no-code AI product. The foundation was a design system engineers could actually live in: tokens, primitives, and patterns, documented well enough that nobody had to DM me at midnight to ship.",
    year: "2024",
    role: "UX Designer",
    tags: ["Tokens", "Components", "No-code AI"],
    cardGradient: "linear-gradient(135deg, #2a261a 0%, #16130c 100%)",
    cardImage: "/work/dexla-design-system.png",
    thumbKind: "dexla",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project; next: Project } | null {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  return { prev, next };
}
