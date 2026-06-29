export interface Testimonial {
  body: string;
  name: string;
  role: string;
  company?: string;
  initials: string;
  date?: string;
  featured?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    body: "He's one of those rare people who combines strong technical ability with a real eye for user experience. He doesn't simply build what's asked — he thinks through the end user, the business goal, the flow, the design, and the long-term usability of the product.",
    name: "Hugo Rawlinson",
    role: "Co-Founder & CRO",
    company: "Airstride",
    initials: "HR",
    date: "JUN 2026",
    featured: true,
  },
  {
    body: "An outstanding UX designer who combines strong design thinking with the ability to execute quickly without compromising quality. He also designed our website — a polished, modern result that perfectly reflected our brand. Someone I'd happily recommend to any team.",
    name: "Max Edwards",
    role: "Co-Founder & CEO",
    company: "Airstride",
    initials: "ME",
    date: "JUN 2026",
    featured: true,
  },
  {
    body: "I had the pleasure of working with Ayo, and he is a standout team member. Beyond his technical abilities, Ayo is a collaborative and dependable teammate who fosters a positive work environment.",
    name: "Tom McDonough",
    role: "Co-founder & CTO",
    company: "Dexla",
    initials: "TM",
  },
  {
    body: "Working with Ayowande has been awesome. He brought so much coolness to our project. Super creative, keen attention to details, our project even looks better than we imagined.",
    name: "Ibrahim Bashir",
    role: "CEO",
    company: "Techonstack",
    initials: "IB",
  },
  {
    body: "Teaming up with Ayowande on various projects has been an easy job for my frontend development. His designs are not just visually sound but also done easy for implementation. Totally recommend.",
    name: "Williams Balogun",
    role: "Full Stack Engineer",
    company: "Airstride",
    initials: "WB",
  },
  {
    body: "Had a great time working with Ayo. His design skills spiced up our team's project. Easygoing, talented and always brought fresh ideas. He's also always available for help and clarifying things.",
    name: "Valeria Cuciniello",
    role: "Product Designer",
    initials: "VC",
  },
];
