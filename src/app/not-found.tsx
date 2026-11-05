import type { Metadata } from "next";

import { ContactSection, SiteFooter, SiteHeader } from "@/components/landing/chrome";
import { FloatingNav } from "@/components/landing/floating-nav";

/*
 * 404 for every unmatched URL, in the home page's design: its header, intro block, buttons,
 * contact section, footer and pill, all styled by home.css. Next.js marks it noindex.
 */

export const metadata: Metadata = {
  title: { absolute: "Not found · Ayowande Olubo" },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="wrap">
      <SiteHeader />

      <main>
        <div className="intro">
          <h1>
            This page doesn’t exist. <span>It may have moved.</span>
          </h1>
          <p>The link might be broken, or it pointed at a page from the old site. Everything I’ve made is on the home page.</p>
          <div className="cta">
            <a className="btn primary" href="/">
              Back home
            </a>
            <a className="btn" href="/#work">
              See the work
            </a>
          </div>
        </div>

        <ContactSection />
      </main>

      <SiteFooter />

      <FloatingNav variant="page" />
    </div>
  );
}
