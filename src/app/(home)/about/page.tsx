import type { Metadata } from "next";

import { Engineers } from "@/components/about/engineers";
import { ContactSection, SiteFooter, SiteHeader } from "@/components/landing/chrome";
import { LANDING } from "@/components/landing/content";
import { FloatingNav } from "@/components/landing/floating-nav";

import "@/components/about/about.css";

/*
 * About. Every string, size and alt text is from waande-about-handoff/reference/about.html.
 * It shares the landing page's root layout ((home)/layout.tsx): tokens, fonts, the pre-paint
 * theme script and home.css. Header, contact section, footer and pill are the live components.
 * The social cards use the site's default image (ABOUT.md section 4 allows it): the files next
 * to this page are copies of (home)/opengraph-image.png and twitter-image.png, because a page
 * that sets its own openGraph replaces the inherited one, image included.
 */

const TITLE = "About · Ayowande Olubo";
const DESCRIPTION =
  "Ayowande Olubo is a product designer in Abuja, Nigeria, designing and shipping AI and SaaS products for early-stage startups.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    siteName: LANDING.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const EXPERIENCE = [
  ["Airstride", "Product Designer · AI sales", "2025"],
  ["Dexla", "UX Designer · No-code AI builder", "2024 – 25"],
  ["Qoinpal", "Product Designer · Crypto wallet", "2023 – 24"],
  ["Approvam", "Product Designer · Workflow", "2023"],
  ["Groflex", "Product Designer · ERP suite", "2022 – 23"],
] as const;

/** 1x 260w / 2x 520w WebP from the originals (scripts/export-about-images.mjs); all 3:4. */
const PHOTOS = [
  { src: "about-friends", alt: "Ayo taking a selfie with friends on a rocky hilltop" },
  { src: "photo-3", alt: "A working session around a dining table, laptops open" },
  { src: "photo-7", alt: "Close-up of a saxophone mid-performance" },
  { src: "photo-5", alt: "Chess pieces with a terminal glowing behind" },
] as const;

/** The 880px column less 3 × 10px gaps is ~213px per photo; two columns under 560px. */
const PHOTO_SIZES = "(max-width: 560px) calc((100vw - 42px) / 2), (max-width: 720px) calc((100vw - 62px) / 4), 213px";

/** One column up to 720px (photo above the text); ~347px beside the text above that. */
const HERO_SIZES = "(max-width: 720px) calc(100vw - 32px), 347px";

export default function AboutPage() {
  return (
    <div className="wrap">
      <SiteHeader />

      {/* header and footer stay outside main, as the banner and contentinfo landmarks */}
      <main>
        <section className="ab-hero">
          <div className="ab-intro">
            <h1>Hi, I’m Ayo.</h1>
            <p className="ab-lead">
              I design products, then I build them. Mostly AI and SaaS, mostly for startups that move fast.
            </p>
            <div className="ab-bio">
              <p>
                I taught myself design on Adobe XD and never looked back. Five years and five teams later, I’m usually
                the first designer in the room, and these days I ship the front-end myself too.
              </p>
              <p>
                I’m a bit obsessive about clean layouts and good documentation. Ask my <Engineers />, they’ll back me
                up.
              </p>
              <p>
                When I’m not designing, I’m playing saxophone at church, shooting video for the media crew, or losing an
                argument about my FPL transfers. I also play chess. I’d say I’m pretty good; my opponents might say
                otherwise.
              </p>
            </div>
          </div>
          <figure className="ab-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/about-horse.webp"
              srcSet="/about/about-horse.webp 720w, /about/about-horse@2x.webp 1440w"
              sizes={HERO_SIZES}
              width={720}
              height={960}
              alt="Ayo on horseback at a polo field, sunglasses on his head"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        </section>

        <section className="ab-sec">
          <div className="sec-head">
            {/* An h2 for heading order; home.css renders h2.label exactly like the reference's span. */}
            <h2 className="label">Where I’ve been</h2>
          </div>
          <ul className="ab-xp">
            {EXPERIENCE.map(([company, role, years]) => (
              <li key={company}>
                <b>{company}</b>
                <span>{role}</span>
                <span className="mono">{years}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ab-sec">
          <div className="ab-photos">
            {PHOTOS.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.src}
                src={`/about/${p.src}.webp`}
                srcSet={`/about/${p.src}.webp 260w, /about/${p.src}@2x.webp 520w`}
                sizes={PHOTO_SIZES}
                width={260}
                height={347}
                alt={p.alt}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        <ContactSection
          heading="Let’s build something good."
          line="Got a project? Or just want to talk design, chess, or debate FPL transfers? I’m always open to a conversation."
        />
      </main>

      <SiteFooter />

      <FloatingNav variant="about" />
    </div>
  );
}
