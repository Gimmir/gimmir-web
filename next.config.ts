import type { NextConfig } from "next";

import { fetchRedirects } from "./src/lib/redirects";

/** Common guessed URLs; Sanity-managed redirects are appended after these. */
const STATIC_REDIRECTS = [
  { source: "/founders", destination: "/about", permanent: true },
  { source: "/nazar-and-oleh", destination: "/about", permanent: true },
  { source: "/services", destination: "/how-we-work", permanent: true },
  { source: "/case-studies", destination: "/work", permanent: true },
  // Old price pages; V2 shows no prices anywhere.
  { source: "/pricing", destination: "/how-we-work#pricing", permanent: true },
  {
    source: "/the-review",
    destination: "/build-your-saas#diagnostic",
    permanent: true,
  },
  // /what-we-build repeated the home list and /work, so it went (Nazar,
  // 2026-09-30); every product it listed is on /work
  { source: "/what-we-build", destination: "/work", permanent: true },
  { source: "/health", destination: "/work", permanent: true },
];

const nextConfig: NextConfig = {
  experimental: {
    // The dev filesystem cache kept serving a stale globals.css (edits to
    // it silently never reached the browser until the cache was wiped).
    turbopackFileSystemCacheForDev: false,
  },
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
