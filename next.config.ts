import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Needed for app/global-not-found.tsx: the landing page and the rest of
    // the site use separate root layouts, so there is no shared one for 404s.
    globalNotFound: true,
  },
};

export default config;
