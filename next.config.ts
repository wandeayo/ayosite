import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The old site's pages, retired with its dark design: send visitors and search engines
  // (308, permanent) to where that content lives now. /work/<slug> case studies are untouched.
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/writing", destination: "/", permanent: true },
      { source: "/writing/:path*", destination: "/", permanent: true },
    ];
  },
};

export default config;
