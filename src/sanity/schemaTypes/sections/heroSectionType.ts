import { RocketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      description: "Used for in-page navigation, e.g. the header 'Home' link.",
      initialValue: "top",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "The lead part of the hero statement.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accent",
      title: "Accent",
      type: "string",
      description: "Highlighted continuation of the headline (rendered in the accent colour).",
    }),
    defineField({
      name: "subhead",
      title: "Subhead",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "cta" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "cta" }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [defineArrayMember({ type: "stat" })],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    select: { title: "headline" },
    prepare({ title }) {
      return { title: title || "Hero", subtitle: "Hero section" };
    },
  },
});
