import type { MetadataRoute } from "next";

import { LANDING } from "@/components/landing/content";
import { PROJECTS } from "@/lib/projects";

// The landing page and the case studies. /about, /contact, /writing and the
// /work index are retired and deliberately left out.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: LANDING.url, changeFrequency: "monthly", priority: 1 },
    ...PROJECTS.map((p) => ({
      url: `${LANDING.url}/work/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
