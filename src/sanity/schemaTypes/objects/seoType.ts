import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO & social sharing",
  type: "object",
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description:
        "Overrides the page title in search results and the browser tab. Aim for under 60 characters.",
      validation: (rule) =>
        rule.max(60).warning("Longer titles get truncated by Google."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "The snippet shown under the title in search results.",
      validation: (rule) =>
        rule
          .max(160)
          .warning("Keep it under 160 characters so it isn't truncated."),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description: "Used for link previews. 1200×630px recommended.",
      options: { hotspot: true },
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Optional. Only set when this content's canonical home is a different URL.",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      description: "Adds a noindex directive and excludes the page from the sitemap.",
      initialValue: false,
    }),
  ],
});
