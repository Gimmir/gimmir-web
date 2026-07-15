import { defineField, defineType } from "sanity";

/** A fear/objection paired with how Gimmir answers it (How we work page). */
export const fearItemType = defineType({
  name: "fearItem",
  title: "Fear",
  type: "object",
  fields: [
    defineField({
      name: "fear",
      title: "Fear",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "fear", subtitle: "answer" },
  },
});
