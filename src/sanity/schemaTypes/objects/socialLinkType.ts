import { defineField, defineType } from "sanity";

export const socialLinkType = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "LinkedIn", value: "linkedin" },
          { title: "X / Twitter", value: "x" },
          { title: "Instagram", value: "instagram" },
          { title: "GitHub", value: "github" },
          { title: "YouTube", value: "youtube" },
          { title: "Email", value: "email" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["http", "https", "mailto"], allowRelative: false }),
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "url" },
  },
});
