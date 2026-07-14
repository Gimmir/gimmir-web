import { defineLocations } from "sanity/presentation";
import type { PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    homePage: defineLocations({
      message: "This document is used for the landing page",
      tone: "positive",
      locations: [{ title: "Home", href: "/" }],
    }),
    siteSettings: defineLocations({
      message: "Used across every page (header, footer, metadata)",
      tone: "caution",
      locations: [{ title: "Home", href: "/" }],
    }),
    navigation: defineLocations({
      message: "Used across every page (header, footer)",
      tone: "caution",
      locations: [{ title: "Home", href: "/" }],
    }),
    caseStudy: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled case study",
            href: `/work/${doc?.slug}`,
          },
          { title: "Case studies", href: "/#work" },
        ],
      }),
    }),
    founder: defineLocations({
      select: { name: "name" },
      resolve: (doc) => ({
        locations: [{ title: doc?.name || "Founder", href: "/#founders" }],
      }),
    }),
    testimonial: defineLocations({
      select: { name: "authorName" },
      resolve: (doc) => ({
        locations: [{ title: doc?.name || "Testimonial", href: "/" }],
      }),
    }),
  },
};
