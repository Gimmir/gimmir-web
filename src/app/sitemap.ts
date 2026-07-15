import type { MetadataRoute } from "next";

import { caseSlugs } from "@/lib/cases";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, SITE_URL).toString();

  const pages: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/the-review"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/work"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/how-we-work"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/founders"), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Case studies — driven off the same source as the routes, so the sitemap
  // stays in sync when cases are added or removed.
  const cases: MetadataRoute.Sitemap = caseSlugs.map((slug) => ({
    url: url(`/work/${slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...cases];
}
