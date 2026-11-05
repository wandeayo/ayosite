import type { MetadataRoute } from "next";

import { CASE_ORDER } from "@/components/case/cases";
import { LANDING } from "@/components/landing/content";

// The landing page and the case studies. /about, /contact, /writing and the
// /work index are retired and deliberately left out.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: LANDING.url, changeFrequency: "monthly", priority: 1 },
    ...CASE_ORDER.map((slug) => ({
      url: `${LANDING.url}/work/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
