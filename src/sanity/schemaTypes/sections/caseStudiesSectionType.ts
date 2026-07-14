import { CaseIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const caseStudiesSectionType = defineType({
  name: "caseStudiesSection",
  title: "Case studies",
  type: "object",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      initialValue: "work",
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
      name: "items",
      title: "Featured case studies",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "caseStudy" }],
        }),
      ],
      validation: (rule) => rule.min(1).unique(),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Case studies", subtitle: "Case studies section" };
    },
  },
});
