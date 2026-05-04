export interface Post {
  slug: string;
  date: string;
  title: string;
  readTime: string;
  topic: string;
}

export const POSTS: Post[] = [
  {
    slug: "designing-for-ai-agents",
    date: "04 / 2026",
    title: "Designing for AI agents that act on your behalf",
    readTime: "7 min",
    topic: "AI · Trust",
  },
  {
    slug: "confidence-typographic-decision",
    date: "02 / 2026",
    title: "Confidence is a typographic decision",
    readTime: "4 min",
    topic: "Type · Systems",
  },
  {
    slug: "dashboard-is-dead",
    date: "11 / 2025",
    title: "The dashboard is dead. Long live the dashboard.",
    readTime: "9 min",
    topic: "SaaS · IA",
  },
  {
    slug: "shipping-no-code-builder",
    date: "08 / 2025",
    title: "What I learned shipping a no-code builder",
    readTime: "12 min",
    topic: "Reflection",
  },
  {
    slug: "notes-on-quiet-interfaces",
    date: "05 / 2025",
    title: "Notes on quiet interfaces",
    readTime: "5 min",
    topic: "Craft",
  },
  {
    slug: "ai-loading-states",
    date: "01 / 2025",
    title: "A field guide to AI loading states",
    readTime: "6 min",
    topic: "Patterns",
  },
];
