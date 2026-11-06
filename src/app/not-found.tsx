import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "@/components/landing/chrome";
import { NotShipped } from "@/components/not-found/not-shipped";
import { PATH_INIT_SCRIPT } from "@/components/not-found/path";

import "@/components/not-found/not-found.css";

/*
 * 404 for every unmatched URL (and every notFound()), from waande-404-handoff/reference/404.html.
 * The site's live header, theme toggle and footer; no floating pill, since the terminal's links
 * do its job (404.md, section 1). Next.js serves it with a 404 status and marks it noindex.
 */

export const metadata: Metadata = {
  title: { absolute: "Not Shipped · Ayowande Olubo" },
  description: "404: this page was designed, but never shipped.",
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="wrap nf-page">
      <SiteHeader />

      {/* header and footer stay outside main, as the banner and contentinfo landmarks */}
      <main>
        <NotShipped />
        {/* The page is prerendered, so the real path is written in before first paint (path.ts). */}
        <script dangerouslySetInnerHTML={{ __html: PATH_INIT_SCRIPT }} />
      </main>

      <SiteFooter />
    </div>
  );
}
