import Link from "next/link";

import { Container } from "@/components/ui/container";
import { NAV_LINKS, SITE } from "@/lib/site";

const DIRECT_LINKS = [
  { label: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Book a call", href: "https://calendly.com/ayowandeolubo" },
  { label: "Resume (PDF)", href: "https://drive.google.com/file/d/1eKx9Ip4GIbps8MWfdX-IsLJWEUvp1n2l/view?usp=sharing" },
] as const;

export function Footer() {
  return (
    <footer className="mt-[120px] border-t border-line">
      <Container className="grid grid-cols-1 gap-10 px-(--gutter) py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-[60px] md:pb-10 md:pt-20">
        <div>
          <div className="font-serif text-[40px] leading-[0.95] tracking-[-0.02em] md:text-[56px]">
            Ayowande
            <br />
            <span className="accent-it">Olubo.</span>
          </div>
          <div className="mt-3 font-mono text-[11px] tracking-[0.04em] text-ink-faint">
            {SITE.location}
            <br />
            Designing in 2026
          </div>
        </div>

        <FooterColumn title="Sitemap">
          {NAV_LINKS.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Elsewhere">
          {SITE.socials.map((s) => (
            <FooterLink key={s.label} href={s.href} external>
              {s.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Direct">
          {DIRECT_LINKS.map((d) => (
            <FooterLink key={d.label} href={d.href} external={d.href.startsWith("http")}>
              {d.label}
            </FooterLink>
          ))}
        </FooterColumn>
      </Container>

      <Container className="mt-[60px] border-t border-line px-(--gutter) py-[30px]">
        <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-[18px] font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink-faint">
        {title}
      </h4>
      <ul className="flex flex-col gap-[10px] text-[14px]">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const anchorProps = external ? { target: "_blank", rel: "noreferrer" } : {};
  const Tag = external || href.startsWith("mailto:") ? "a" : Link;
  return (
    <li>
      <Tag
        href={href}
        className="text-ink-dim transition-colors duration-200 hover:text-ink"
        {...anchorProps}
      >
        {children}
      </Tag>
    </li>
  );
}
