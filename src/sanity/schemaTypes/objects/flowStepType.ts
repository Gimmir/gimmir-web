import { defineField, defineType } from "sanity";

/** One step in the shared "three steps, low risk" flow (home + review). */
export const flowStepType = defineType({
  name: "flowStep",
  title: "Flow step",
  type: "object",
  fields: [
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      description: 'The small pill, e.g. "Free · 20 min", "Paid", "Build".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tag" },
  },
});
