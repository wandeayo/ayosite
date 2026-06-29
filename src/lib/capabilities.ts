export interface Capability {
  num: string;
  title: string;
  body: string;
}

export const CAPABILITIES: Capability[] = [
  {
    num: "01 / Discipline",
    title: "AI & agentic interfaces",
    body: "Designing interfaces for systems that reason and act on their own. The job is making that legible: what the agent is doing, when to trust it, and how to stop it.",
  },
  {
    num: "02 / Discipline",
    title: "SaaS dashboards & tools",
    body: "Internal tooling and complex data products. Information architecture that scales with the product, not against it.",
  },
  {
    num: "03 / Discipline",
    title: "Design systems & tokens",
    body: "Systems that engineers actually use. Tokens, primitives, and patterns documented for the team that has to ship at midnight.",
  },
];
