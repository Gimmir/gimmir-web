import { BarChartIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const processSectionType = defineType({
  name: "processSection",
  title: "How we work",
  type: "object",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      initialValue: "process",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 2 }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [defineArrayMember({ type: "processStep" })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "How we work", subtitle: "Process section" };
    },
  },
});
