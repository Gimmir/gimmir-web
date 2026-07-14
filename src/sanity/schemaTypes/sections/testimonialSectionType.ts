import { CommentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const testimonialSectionType = defineType({
  name: "testimonialSection",
  title: "Testimonials",
  type: "object",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      initialValue: "voices",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "testimonial" }],
        }),
      ],
      validation: (rule) => rule.min(1).unique(),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Testimonials", subtitle: "Testimonials section" };
    },
  },
});
