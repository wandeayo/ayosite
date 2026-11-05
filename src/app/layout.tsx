import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { LANDING } from "@/components/landing/content";
import { THEME_INIT_SCRIPT } from "@/components/landing/theme";

import "./home.css";

// The one root layout: home, About, the case studies and the 404 all render inside it.
//
// Fonts are self-hosted from src/fonts (scripts/fetch-fonts.mjs): the same latin files
// next/font/google used to download at build time, so builds no longer depend on Google
// Fonts answering (a malformed answer failed the production build on 2026-11-05). Each
// family declares the faces Google's CSS did: one per weight on the variable file, limited
// to Google's latin unicode-range.
//
// adjustFontFallback is off on purpose. Geist has no → or ↗ glyphs, and the
// design draws them from the system stack in home.css (system-ui / SF Mono).
// next/font's generated fallback (metric-adjusted Arial) would sit first in
// that stack and render them in Arial instead.
const geist = localFont({
  src: [
    { path: "../fonts/geist-normal-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/geist-normal-latin.woff2", weight: "500", style: "normal" },
    { path: "../fonts/geist-normal-latin.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-geist",
  display: "swap",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
});

const geistMono = localFont({
  src: [
    { path: "../fonts/geist-mono-normal-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/geist-mono-normal-latin.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(LANDING.url),
  title: LANDING.title,
  description: LANDING.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: LANDING.name,
    title: LANDING.title,
    description: LANDING.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: LANDING.title,
    description: LANDING.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the head script may set data-theme before React hydrates.
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply a saved theme before first paint, so it never flashes the other one. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
