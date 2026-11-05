import localFont from "next/font/local";

/**
 * Fonts for the (site) shell: the retired /about, /contact, /writing and /work pages and the
 * global 404. Shared by app/(site)/layout.tsx and app/global-not-found.tsx, which both render
 * their own <html> because the landing page has a separate root layout.
 *
 * Self-hosted from src/fonts (see app/(home)/layout.tsx for why), declaring the same faces
 * Google's CSS did. Their metric-adjusted fallbacks are declared in globals.css with
 * next/font/google's exact values (next/font/local measures slightly differently, which
 * shifted glyphs the fonts lack, such as the → in the mono buttons). DM Sans and Plus Jakarta Sans were dropped: they only styled the old
 * Carmen demos (.air in globals.css), which nothing renders any more.
 */
const geist = localFont({
  src: [
    { path: "../fonts/geist-normal-latin.woff2", weight: "300", style: "normal" },
    { path: "../fonts/geist-normal-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/geist-normal-latin.woff2", weight: "500", style: "normal" },
    { path: "../fonts/geist-normal-latin.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-geist",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Geist Fallback"],
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
});

const instrumentSerif = localFont({
  src: [
    { path: "../fonts/instrument-serif-normal-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-italic-latin.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Instrument Serif Fallback"],
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
});

const jetbrainsMono = localFont({
  src: [
    { path: "../fonts/jetbrains-mono-normal-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/jetbrains-mono-normal-latin.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jetbrains",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["JetBrains Mono Fallback"],
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
});

export const siteFontVariables = `${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`;
