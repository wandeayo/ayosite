export const SITE = {
  name: "Ayowande Olubo",
  shortName: "Ayowande",
  role: "Senior Product Designer",
  description:
    "Ayowande Olubo. Senior Product Designer working at the seam where AI capability meets human reasoning. Selected work, writing, and a short field guide.",
  url: "https://waande.com",
  email: "ayowandeolubo@gmail.com",
  location: "Lagos · Remote · UTC+1",
  socials: [
    { label: "X / Twitter", href: "https://x.com/ayowandde" },
    { label: "LinkedIn", href: "https://linkedin.com/in/ayowandeolubo" },
    { label: "Instagram", href: "https://instagram.com/ayowandde" },
    { label: "Dribbble", href: "https://dribbble.com/ayowande" },
  ],
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Index", match: (p: string) => p === "/" },
  { href: "/work", label: "Work", match: (p: string) => p.startsWith("/work") },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
  { href: "/contact", label: "Contact", match: (p: string) => p === "/contact" },
] as const;
