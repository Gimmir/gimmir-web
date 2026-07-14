import { CaseIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "story", title: "Story" },
    { name: "results", title: "Results & tech" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "overview",
      description: 'The project/case name, e.g. "UN1T".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      group: "overview",
      description: "The brand or company.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "overview",
      options: { source: "title", maxLength: 96 },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return "A slug is required";
          if (!/^[a-z0-9-]+$/.test(slug.current)) {
            return "Use lowercase letters, numbers and hyphens only";
          }
          return true;
        }),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      group: "overview",
      description: 'e.g. "Boutique fitness franchise".',
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "overview",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) =>
            rule.required().warning("Alt text is important for accessibility and SEO."),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "overview",
      description: "One- or two-sentence summary used on cards and previews.",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "problem",
      title: "The problem",
      type: "blockContent",
      group: "story",
    }),
    defineField({
      name: "solution",
      title: "The solution",
      type: "blockContent",
      group: "story",
    }),
    defineField({
      name: "result",
      title: "The result",
      type: "blockContent",
      group: "story",
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      group: "results",
      of: [defineArrayMember({ type: "metric" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      group: "results",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      group: "results",
      of: [defineArrayMember({ type: "cta" })],
      description: "External links such as the live product.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "overview",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "overview",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
});
