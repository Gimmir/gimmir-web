import { UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const foundersSectionType = defineType({
  name: "foundersSection",
  title: "Founders",
  type: "object",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      initialValue: "founders",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({
      name: "founders",
      title: "Founders",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "founder" }],
        }),
      ],
      validation: (rule) => rule.min(1).unique(),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Founders", subtitle: "Founders section" };
    },
  },
});
