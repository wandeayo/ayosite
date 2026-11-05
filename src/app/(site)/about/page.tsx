import type { Metadata } from "next";

import { AboutHero } from "@/components/about/about-hero";
import { BeyondTheScreen } from "@/components/about/beyond-the-screen";
import { Journey } from "@/components/about/journey";
import { PhotoMosaic } from "@/components/about/photo-mosaic";
import { Timeline } from "@/components/about/timeline";
import { Toolkit } from "@/components/about/toolkit";
import { CTAStrip } from "@/components/home/cta-strip";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ayowande Olubo. Five years designing AI and SaaS products at startups that move fast.",
};

export default function AboutPage() {
  return (
    <div className="page-anim">
      <AboutHero />
      <PhotoMosaic />
      <Journey />
      <Timeline />
      <BeyondTheScreen />
      <Toolkit />
      <CTAStrip
        lead={<>Let&apos;s build</>}
        emphasis="something good."
        description="Got a project? Or just want to talk design, chess, or debate FPL transfers? I'm always open to a conversation."
        primary={{ label: "Book a call", href: "https://calendly.com/ayowandeolubo" }}
      />
    </div>
  );
}
