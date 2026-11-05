import { ContactSection, SiteFooter, SiteHeader } from "@/components/landing/chrome";
import { FloatingNav } from "@/components/landing/floating-nav";
import { fitStagesInline } from "@/components/landing/thumbs/fit-stages";

import { Img, type ImgSrc } from "./blocks";
import { adjacentCases, type CaseMeta, type CaseSlug } from "./cases";
import { HeroFigureClient } from "./hero-figure";
import { FIT_PROTOS_INLINE } from "./fit-protos";

import "./case.css";

/** "← All work", label, H1, lede, optional link buttons, facts. */
export function CaseHero({ hero }: { hero: CaseMeta["hero"] }) {
  return (
    <div className="cs-hero">
      <a className="cs-back mono" href="/#work">
        ← All work
      </a>
      <span className="label">{hero.label}</span>
      <h1>{hero.h1}</h1>
      <p className="cs-lede">{hero.lede}</p>
      {hero.links && (
        <div className="cs-links">
          {hero.links.map((l) => (
            <a key={l.href} className={l.primary ? "btn primary" : "btn"} href={l.href} target="_blank" rel="noopener">
              {l.label}
            </a>
          ))}
        </div>
      )}
      <dl className="cs-facts">
        {hero.facts.map(([dt, dd]) => (
          <div key={dt}>
            <dt>{dt}</dt>
            <dd>{dd}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Fig. 1: the project's animated home-page thumbnail at full column width.
 * The inline script sizes its stage before first paint, as on the home page.
 */
export function HeroFigure({ thumb, caption }: { thumb: React.ReactNode; caption: string }) {
  return (
    <>
      <HeroFigureClient thumb={thumb} caption={caption} />
      <script dangerouslySetInnerHTML={{ __html: fitStagesInline(".cs-herofig") }} />
    </>
  );
}

/** Still for each case's "Next case" card (the reference's choices). */
const NEXT_STILL: Record<CaseSlug, ImgSrc> = {
  "carmen-ai": { src: "/home/carmen-03-campaign", w: 1440, h: 1500 },
  airstride: { src: "/home/airstride-01-board", w: 1440, h: 1008 },
  "arctic-edge": { src: "/work/arctic-edge/cover", w: 800, h: 486, hi: 2 },
  "dexla-design-system": { src: "/work/dexla-design-system/atomic", w: 800, h: 761, hi: 2 },
};

/** "← Previous" + name on the left; a "Next case →" card with a still tile on the right. */
export function NextNav({ slug }: { slug: CaseSlug }) {
  const { prev, next } = adjacentCases(slug);
  return (
    <nav className="cs-next" aria-label="More case studies">
      <a className="cs-prev" href={`/work/${prev.slug}`}>
        <span className="label">← Previous</span>
        <b>{prev.name}</b>
      </a>
      <a className="cs-nextcard" href={`/work/${next.slug}`}>
        <div className="thumb still" data-tile={next.tile}>
          <div className="win">
            <div className="chrome">
              <i />
              <i />
              <i />
            </div>
            <div className="view">
              <Img {...NEXT_STILL[next.slug]} className="shot" alt="" />
            </div>
          </div>
        </div>
        <div className="cs-nextmeta">
          <span className="label">Next case →</span>
          <b>{next.name}</b>
          <span>{next.teaser}</span>
        </div>
      </a>
    </nav>
  );
}

/**
 * Shared page frame for every case study: site header, hero, the page's
 * blocks, next/previous, contact, footer and the floating nav.
 */
export function CaseLayout({ meta, className, children }: { meta: CaseMeta; className?: string; children?: React.ReactNode }) {
  return (
    <div className={className ? `wrap ${className}` : "wrap"}>
      <SiteHeader />
      {/* header and footer stay outside main, as the banner and contentinfo landmarks */}
      <main>
        <CaseHero hero={meta.hero} />
        {children}
        {/* size every prototype before first paint, so frames don't jump on hydration */}
        <script dangerouslySetInnerHTML={{ __html: FIT_PROTOS_INLINE }} />
        <NextNav slug={meta.slug} />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingNav variant="case" />
    </div>
  );
}
