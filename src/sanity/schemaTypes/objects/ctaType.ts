import { defineField, defineType } from "sanity";

export const ctaType = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description:
        'An on-page anchor like "#start", a path like "/work/un1t", or a full URL.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
