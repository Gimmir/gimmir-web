import { defineDocuments, defineLocations } from "sanity/presentation";
import type { PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  // opening a post's page in Presentation opens that post for editing
  mainDocuments: defineDocuments([
    {
      route: "/build-log/:slug",
      filter: `_type == "post" && slug.current == $slug`,
    },
  ]),
  locations: {
    post: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled post",
            href: `/build-log/${doc?.slug}`,
          },
          { title: "Build log", href: "/build-log" },
        ],
      }),
    }),
  },
};
