export interface Role {
  date: string;
  role: string;
  company: string;
  current?: boolean;
}

export const ROLES: Role[] = [
  { date: "2025 - Now", role: "Product Designer", company: "Airstride · AI Sales", current: true },
  { date: "2024 - 2025", role: "UX Designer", company: "Dexla · No-code AI Builder" },
  { date: "2023 - 2024", role: "Product Designer", company: "Qoinpal · Crypto wallet" },
  { date: "2023", role: "Product Designer", company: "Approvam · Workflow" },
  { date: "2022 - 2023", role: "Product Designer", company: "Groflex · ERP suite" },
];

export interface BeyondInterest {
  num: string;
  title: string;
  body: string;
}

export const BEYOND: BeyondInterest[] = [
  {
    num: "01",
    title: "Saxophone",
    body: "I play the saxophone. It's the one thing in my life that has nothing to do with screens, and that's exactly why I love it.",
  },
  {
    num: "02",
    title: "Videography",
    body: "I shoot video for my church media crew. Different kind of storytelling, same obsession with getting the details right.",
  },
  {
    num: "03",
    title: "Chess",
    body: "I play chess. Probably why I think five steps ahead in design. Or maybe I just like the game. Either way.",
  },
];

export type PhotoSpan = "tall" | "wide" | "square";

export interface Photo {
  label: string;
  span: PhotoSpan;
}

export const PHOTOS: Photo[] = [
  { label: "Studio · 01", span: "tall" },
  { label: "On set · 02", span: "wide" },
  { label: "Field · 03", span: "square" },
  { label: "Portrait · 04", span: "tall" },
  { label: "Travel · 05", span: "square" },
  { label: "Crew · 06", span: "wide" },
];

export const TOOLKIT: string[] = [
  "Figma",
  "FigJam",
  "Framer",
  "ProtoPie",
  "Notion",
  "Linear",
  "Loom",
  "Webflow",
  "Cursor",
  "After Effects",
  "Principle",
  "Maze",
];
