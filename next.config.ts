import type { NextConfig } from "next";

import { fetchRedirects } from "./src/lib/redirects";

/** Common guessed URLs; Sanity-managed redirects are appended after these. */
const STATIC_REDIRECTS = [
  { source: "/about", destination: "/founders", permanent: true },
  { source: "/nazar-and-oleh", destination: "/founders", permanent: true },
  { source: "/services", destination: "/how-we-work", permanent: true },
  { source: "/case-studies", destination: "/work", permanent: true },
];

const nextConfig: NextConfig = {
  // Pin the workspace root (a stray lockfile lives in $HOME).
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [...STATIC_REDIRECTS, ...(await fetchRedirects())];
  },
};

export default nextConfig;
