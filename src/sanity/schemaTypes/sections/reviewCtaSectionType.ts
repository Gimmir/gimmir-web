import { CalendarIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const reviewCtaSectionType = defineType({
  name: "reviewCtaSection",
  title: "The Review (CTA + lead form)",
  type: "object",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      initialValue: "start",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({
      name: "bullets",
      title: "What you get",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Short bullet points listed next to the form.",
    }),
    defineField({
      name: "formHeading",
      title: "Form heading",
      type: "string",
      initialValue: "Request your founder review",
    }),
    defineField({
      name: "formNote",
      title: "Form note",
      type: "text",
      rows: 2,
      description: "Small print under the form (e.g. privacy reassurance).",
    }),
    defineField({
      name: "submitLabel",
      title: "Submit button label",
      type: "string",
      initialValue: "Request review",
    }),
    defineField({
      name: "successHeading",
      title: "Success heading",
      type: "string",
      initialValue: "Thanks — we'll be in touch.",
    }),
    defineField({
      name: "successMessage",
      title: "Success message",
      type: "text",
      rows: 2,
      initialValue:
        "We review every request personally and reply within two business days.",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "The Review", subtitle: "CTA + lead form section" };
    },
  },
});
