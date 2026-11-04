import type { Metadata, Viewport } from "next";

import NotFound from "@/app/(site)/not-found";
import { SiteShell } from "@/components/site/site-shell";

import "./globals.css";

// The app has two root layouts ((home) and (site)), so unmatched URLs need a
// global 404. It renders the same page and shell as (site)/not-found.
export const metadata: Metadata = {
  title: "Not found · Ayowande Olubo",
};

export const viewport: Viewport = {
  themeColor: "#0b0c0f",
  colorScheme: "dark",
};

export default function GlobalNotFound() {
  return (
    <SiteShell>
      <NotFound />
    </SiteShell>
  );
}
