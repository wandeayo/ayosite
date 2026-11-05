import { ContactSection, SiteFooter, SiteHeader } from "@/components/landing/chrome";
import { FloatingNav } from "@/components/landing/floating-nav";

import type { CaseMeta } from "./cases";

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

/** Shared page frame for every case study: site header, hero, body, contact, footer, pill. */
export function CaseLayout({ meta, children }: { meta: CaseMeta; children?: React.ReactNode }) {
  return (
    <div className="wrap">
      <SiteHeader />
      {/* header and footer stay outside main, as the banner and contentinfo landmarks */}
      <main>
        <CaseHero hero={meta.hero} />
        {children}
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingNav variant="case" />
    </div>
  );
}
