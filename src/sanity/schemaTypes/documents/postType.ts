import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/** The build log's tags (doc 09 §3.9); the site shows the titles. */
export const POST_TAGS = [
  { title: "Architecture", value: "architecture" },
  { title: "Planning", value: "planning" },
  { title: "What broke", value: "what-broke" },
  { title: "Jimmy", value: "jimmy" },
  { title: "UN1T", value: "un1t" },
  { title: "Migration", value: "migration" },
] as const;

/**
 * A build-log post: the kitchen, open. Written and signed by one founder
 * (names, photos and calls come from the site's FOUNDERS), expanded from
 * a LinkedIn post. Rules: no client code, data or keys; NDA projects stay
 * anonymous; no prices.
 */
export const postType = defineType({
  name: "post",
  title: "Build log post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (rule) => [
        rule.required(),
        rule.max(90).warning("Shorter titles read and rank better."),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      description: "The post's address: gimmir.com/build-log/<slug>.",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Nazar", value: "nazar" },
          { title: "Oleh", value: "oleh" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated",
      type: "datetime",
      group: "content",
      description: "Set when you change the post in a way readers should know.",
    }),
    defineField({
      name: "tags",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { list: [...POST_TAGS], layout: "grid" },
      validation: (rule) => rule.required().min(1).max(3).unique(),
    }),
    defineField({
      name: "tldr",
      title: "TL;DR",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "One or two sentences: the post's answer, shown at the top in serif. Also the search description unless SEO sets one.",
      validation: (rule) => [
        rule.required(),
        rule.max(280).warning("Keep it to one or two sentences."),
      ],
    }),
    defineField({
      name: "body",
      type: "blockContent",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn post",
      type: "url",
      group: "content",
      description: "The post this grew from, if any.",
    }),
    defineField({
      name: "seo",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", author: "author", date: "publishedAt" },
    prepare({ title, author, date }) {
      const who = author === "oleh" ? "Oleh" : author === "nazar" ? "Nazar" : "";
      const when = date ? new Date(date).toISOString().slice(0, 10) : "";
      return { title, subtitle: [who, when].filter(Boolean).join(" · ") };
    },
  },
});
