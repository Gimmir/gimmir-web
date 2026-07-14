import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Author name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorRole",
      title: "Author role",
      type: "string",
    }),
    defineField({
      name: "authorCompany",
      title: "Author company",
      type: "string",
    }),
    defineField({
      name: "authorPhoto",
      title: "Author photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "relatedCaseStudy",
      title: "Related case study",
      type: "reference",
      to: [{ type: "caseStudy" }],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "authorCompany", media: "authorPhoto" },
  },
});
