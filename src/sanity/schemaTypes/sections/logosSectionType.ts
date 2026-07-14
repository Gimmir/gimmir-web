import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const logosSectionType = defineType({
  name: "logosSection",
  title: "Logos / trusted by",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      initialValue: "trusted",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "logo",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "image",
              title: "Logo image",
              type: "image",
              fields: [
                defineField({ name: "alt", title: "Alt text", type: "string" }),
              ],
            }),
          ],
          preview: { select: { title: "name", media: "image" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Logos", subtitle: "Trusted-by section" };
    },
  },
});
