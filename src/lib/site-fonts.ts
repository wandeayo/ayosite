import { DM_Sans, Geist, Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

/**
 * Fonts for the (site) shell: case studies and the retired pages.
 * Shared by app/(site)/layout.tsx and app/global-not-found.tsx, which both
 * render their own <html> because the landing page has a separate root layout.
 */
const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Product-UI typefaces used only inside the Carmen case-study demos.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const siteFontVariables = `${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${dmSans.variable} ${plusJakarta.variable}`;
