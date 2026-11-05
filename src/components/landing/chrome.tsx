/**
 * Site chrome shared by the home page and the case studies: header, contact
 * section and footer. Copy is verbatim from the approved home design; the case
 * handoff (section 2) asks for these to be identical on every page.
 */
import { SOCIALS } from "./content";
import { EmailRow } from "./email-row";
import { ThemeToggle } from "./theme-toggle";

/** On home the name jumps to the top; on case pages it links home. */
export function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <header className="top">
      <a className="brand" href={home ? "#top" : "/"} id="top">
        Ayowande Olubo
      </a>
      <ThemeToggle />
    </header>
  );
}

const CONTACT_HEADING = "Building something early and need a designer who can ship? Let’s talk.";

/**
 * Home and case pages use the default heading and no line. The About page passes its own
 * heading and a line under it (waande-about-handoff/ABOUT.md, section 1.4); the line's
 * style (.ab-cta) lives in about.css.
 */
export function ContactSection({ heading = CONTACT_HEADING, line }: { heading?: string; line?: string }) {
  return (
    <section id="contact" className="contact">
      <span className="label">Contact</span>
      <h2>{heading}</h2>
      {line && <p className="ab-cta">{line}</p>}
      <EmailRow />
      <div className="socials">
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener">
            {/* one text node, so "Label ↗" shapes as a single run like the design */}
            {`${s.label} ↗`}
          </a>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mono">
      <span>© 2026 Ayowande Olubo</span>
      <span>Built by Ayowande</span>
    </footer>
  );
}
