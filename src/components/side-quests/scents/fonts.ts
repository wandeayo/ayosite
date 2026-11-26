import localFont from "next/font/local";

/**
 * The shop's own typefaces, used only inside figures that show her product (see
 * src/fonts/README.md). Jost's latin-ext file is a separate family in the stack, so it
 * downloads only when a ₦ is on screen; adjustFontFallback is off so Georgia and the system
 * sans fall back as they do on the reference.
 */
// next/font needs literal options, so the unicode-ranges are written out in each call:
// Google's latin and latin-ext ranges, as the shop's Fontsource CSS declares them.

export const cormorant = localFont({
  src: [
    { path: "../../../fonts/cormorant-garamond-500-normal-latin.woff2", weight: "500", style: "normal" },
    { path: "../../../fonts/cormorant-garamond-500-italic-latin.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
});

export const jost = localFont({
  src: [{ path: "../../../fonts/jost-normal-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-jost",
  display: "swap",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
});

export const jostExt = localFont({
  src: [{ path: "../../../fonts/jost-normal-latin-ext.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-jost-ext",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF" }],
});
