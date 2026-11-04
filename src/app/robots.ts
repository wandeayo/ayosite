import type { MetadataRoute } from "next";

import { LANDING } from "@/components/landing/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${LANDING.url}/sitemap.xml`,
    host: LANDING.url,
  };
}
