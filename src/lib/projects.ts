export type ProjectCategory = "ai" | "saas" | "mobile";

export interface Project {
  slug: string;
  num: string;
  title: string;
  summary: string;
  description: string;
  year: string;
  role: string;
  tags: string[];
  category: ProjectCategory;
  featured?: boolean;
  /** Background gradient used in cursor previews and card media. */
  cardGradient: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "carmen-ai",
    num: "01",
    title: "Carmen AI",
    summary: "AI Agent · SaaS",
    description:
      "AI partner acquisition agent. Trust-first interface for autonomous outreach.",
    year: "2025",
    role: "Lead Designer",
    tags: ["AI Agent", "B2B SaaS"],
    category: "ai",
    featured: true,
    cardGradient: "linear-gradient(135deg, #1a2a1f 0%, #0f1612 100%)",
  },
  {
    slug: "airstride",
    num: "02",
    title: "Airstride",
    summary: "Internal Web App",
    description:
      "Internal web app for partner program AI. From zero to design system. 84% conversion lift on the marketing site.",
    year: "2025",
    role: "UX Designer",
    tags: ["Web App", "Internal"],
    category: "saas",
    cardGradient: "linear-gradient(135deg, #1f1a26 0%, #0f0c14 100%)",
  },
  {
    slug: "arctic-edge",
    num: "03",
    title: "Arctic Edge",
    summary: "Mobile · Wellness",
    description: "Health and wellness mobile platform. Full visual and IA refresh.",
    year: "2024",
    role: "Design Lead",
    tags: ["Mobile", "Wellness"],
    category: "mobile",
    cardGradient: "linear-gradient(135deg, #1a242a 0%, #0c1316 100%)",
  },
  {
    slug: "dexla-design-system",
    num: "04",
    title: "Dexla Design System",
    summary: "Tokens · Components",
    description:
      "Tokens, primitives and patterns for a no-code AI builder. Documentation engineers actually used.",
    year: "2024",
    role: "UX Designer",
    tags: ["Design System", "Tokens"],
    category: "saas",
    cardGradient: "linear-gradient(135deg, #2a261a 0%, #16130c 100%)",
  },
];

export const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "saas", label: "SaaS" },
  { id: "mobile", label: "Mobile" },
] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number]["id"];

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
