import type { MetadataRoute } from "next";

import { CASES } from "@/lib/cases";
import { SITE_URL } from "@/lib/seo";

// The V2 release: the date every static page last changed.
const SITE_UPDATED = "2026-09-30";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, SITE_URL).toString();

  const pages: MetadataRoute.Sitemap = [
    {
      url: url("/"),
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: url("/operators"),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/build-your-saas"),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/contact"),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("/work"),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/how-we-work"),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("/about"),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: url("/privacy"),
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: url("/terms"),
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];

  // Case studies — driven off the same source as the routes, so the sitemap
  // stays in sync when cases are added or removed.
  const cases: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: url(`/work/${c.slug}`),
    lastModified: c.updatedAt ?? c.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...cases];
}
