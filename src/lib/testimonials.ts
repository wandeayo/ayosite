export interface Testimonial {
  body: string;
  name: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    body: "I had the pleasure of working with Ayo, and he is a standout team member. Beyond his technical abilities, Ayo is a collaborative and dependable teammate who fosters a positive work environment.",
    name: "Tom McDonough",
    role: "Co-founder & CTO",
    company: "Dexla",
  },
  {
    body: "Working with Ayowande has been awesome. He brought so much coolness to our project. Super creative, keen attention to details, our project even looks better than we imagined.",
    name: "Ibrahim Bashir",
    role: "CEO",
    company: "Techonstack",
  },
  {
    body: "Teaming up with Ayowande on various projects has been an easy job for my frontend development. His designs are not just visually sound but also done easy for implementation. Totally recommend.",
    name: "Williams Balogun",
    role: "Full Stack Engineer",
    company: "Airstride",
  },
  {
    body: "Had a great time working with Ayo. His design skills spiced up our team's project. Easygoing, talented and always brought fresh ideas. He's also always available for help and clarifying things.",
    name: "Valeria Cuciniello",
    role: "Product Designer",
    company: "Independent",
  },
];
