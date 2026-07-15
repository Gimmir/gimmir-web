import { defineField, defineType } from "sanity";

/**
 * A founder as shown in a page's founders section. References the shared
 * founder document (name, photo, LinkedIn) and overrides role + bio, which
 * differ from page to page.
 */
export const founderCardType = defineType({
  name: "founderCard",
  title: "Founder card",
  type: "object",
  fields: [
    defineField({
      name: "founder",
      title: "Founder",
      type: "reference",
      to: [{ type: "founder" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role (on this page)",
      type: "string",
      description: "Overrides the founder's default role for this section.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio (on this page)",
      type: "text",
      rows: 4,
      description: "Overrides the founder's default bio for this section.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "founder.name", subtitle: "role", media: "founder.photo" },
  },
});
