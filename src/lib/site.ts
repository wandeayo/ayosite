export const SITE = {
  name: "Ayowande Olubo",
  shortName: "Ayowande",
  role: "Senior Product Designer",
  description:
    "Ayowande Olubo. Senior Product Designer working at the seam where AI capability meets human reasoning. Selected work, writing, and a short field guide.",
  url: "https://waande.com",
  email: "hello@waande.com",
  location: "Lagos · Remote · UTC+1",
  edition: "Edition 05 / 2026",
  availability: "Available Q3 2026",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/ayowandeolubo" },
    { label: "Twitter / X", href: "https://x.com/ayowandeolubo" },
    { label: "Read.cv", href: "https://read.cv/ayowande" },
    { label: "Dribbble", href: "https://dribbble.com/ayowande" },
  ],
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Index", match: (p: string) => p === "/" },
  { href: "/work", label: "Work", match: (p: string) => p.startsWith("/work") },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
  { href: "/writing", label: "Writing", match: (p: string) => p.startsWith("/writing") },
] as const;
