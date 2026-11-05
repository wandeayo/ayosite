/**
 * Landing page copy and links. All copy is verbatim from the approved design
 * (waande-handoff/reference/index.html), including typographic characters:
 * U+2011 non-breaking hyphen in the H1, curly quotes, em dashes in quotes.
 */

export const LANDING = {
  name: "Ayowande Olubo",
  url: "https://waande.com",
  title: "Ayowande Olubo · Product designer",
  description: "Product designer for early-stage AI and SaaS teams. I design it, then I ship it.",
  email: "ayowandeolubo@gmail.com",
} as const;

export const LINKS = {
  calendly: "https://calendly.com/ayowandeolubo",
  resume: "https://drive.google.com/file/d/1eKx9Ip4GIbps8MWfdX-IsLJWEUvp1n2l/view?usp=sharing",
  github: "https://github.com/wandeayo",
  linkedin: "https://linkedin.com/in/ayowandeolubo",
  x: "https://x.com/ayowandde",
  dribbble: "https://dribbble.com/ayowande",
  instagram: "https://instagram.com/ayowandde",
} as const;

export const SOCIALS = [
  { label: "LinkedIn", href: LINKS.linkedin },
  { label: "GitHub", href: LINKS.github },
  { label: "X", href: LINKS.x },
  { label: "Dribbble", href: LINKS.dribbble },
  { label: "Instagram", href: LINKS.instagram },
] as const;

export const SERVICES = [
  {
    title: "AI and agentic interfaces",
    body: "Making agent behaviour legible: what it is doing, when to trust it, how to stop it.",
  },
  {
    title: "SaaS tools and dashboards",
    body: "Internal tooling and data-heavy products with information architecture that scales.",
  },
  {
    title: "Design engineering",
    body: "I build what I design: production front-end, tokens and components in code, and the interaction details that get lost in handoff.",
  },
  {
    title: "Websites and SEO",
    body: "Marketing sites that convert and get found, from structure and copy to technical SEO.",
  },
] as const;

export interface KindWord {
  name: string;
  role: string;
  quote: string;
}

export const KIND_WORDS: readonly KindWord[] = [
  {
    name: "Max Edwards",
    role: "Co-founder & CEO · Airstride",
    quote:
      "“An outstanding UX designer who combines strong design thinking with the ability to execute quickly without compromising quality. He also designed our website — a polished, modern result that perfectly reflected our brand. Someone I’d happily recommend to any team.”",
  },
  {
    name: "Hugo Rawlinson",
    role: "Co-founder & CRO · Airstride",
    quote:
      "“He’s one of those rare people who combines strong technical ability with a real eye for user experience. He doesn’t simply build what’s asked — he thinks through the end user, the business goal, the flow, the design, and the long-term usability of the product.”",
  },
  {
    name: "Tom McDonough",
    role: "Co-founder & CTO · Dexla",
    quote:
      "“I had the pleasure of working with Ayo, and he is a standout team member. Beyond his technical abilities, Ayo is a collaborative and dependable teammate who fosters a positive work environment.”",
  },
  {
    name: "Ibrahim Bashir",
    role: "CEO · Techonstack",
    quote:
      "“Working with Ayowande has been awesome. He brought so much coolness to our project. Super creative, keen attention to details, our project even looks better than we imagined.”",
  },
  {
    name: "Williams Balogun",
    role: "Full Stack Engineer · Airstride",
    quote:
      "“Teaming up with Ayowande on various projects has been an easy job for my frontend development. His designs are not just visually sound but also done easy for implementation. Totally recommend.”",
  },
  {
    name: "Valeria Cuciniello",
    role: "Product Designer",
    quote:
      "“Had a great time working with Ayo. His design skills spiced up our team’s project. Easygoing, talented and always brought fresh ideas. He’s also always available for help and clarifying things.”",
  },
];

/** JSON-LD Person for the landing page (handoff section 8). */
/** Stable id, so the case studies' CreativeWork `author` points at this same Person. */
export const PERSON_ID = `${LANDING.url}/#person`;

export const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: LANDING.name,
  url: LANDING.url,
  jobTitle: "Product Designer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abuja",
    addressCountry: "NG",
  },
  sameAs: [LINKS.linkedin, LINKS.github, LINKS.x, LINKS.dribbble],
} as const;
