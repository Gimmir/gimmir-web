import { defineField, defineType } from "sanity";

export const metricType = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'The headline figure, e.g. "3.2×" or "+148%".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'What the figure measures, e.g. "Member retention".',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
