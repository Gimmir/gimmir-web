import { defineField, defineType } from "sanity";

/** A generic title + body card, reused across most page sections. */
export const infoCardType = defineType({
  name: "infoCard",
  title: "Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
  },
});
