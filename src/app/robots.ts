import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

// AI crawlers we explicitly welcome (GEO): retrieval and answer engines for
// ChatGPT, Claude, Perplexity, and Gemini. Listed by name so an edge/CDN rule
// or a future wildcard change can't silently block them.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/studio", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
