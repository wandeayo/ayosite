import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { LANDING } from "@/components/landing/content";

import "./home.css";

// The landing page is its own root layout so none of the (site) shell
// (globals.css, Tailwind preflight, nav, footer, cursor) reaches it.
//
// adjustFontFallback is off on purpose. Geist has no → or ↗ glyphs, and the
// design draws them from the system stack in home.css (system-ui / SF Mono).
// next/font's generated fallback (metric-adjusted Arial) would sit first in
// that stack and render them in Arial instead.
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
  adjustFontFallback: false,
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

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
