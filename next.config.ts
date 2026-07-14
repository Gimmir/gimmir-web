import type { NextConfig } from "next";

import { fetchRedirects } from "./src/lib/redirects";

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
    return fetchRedirects();
  },
};

export default nextConfig;
