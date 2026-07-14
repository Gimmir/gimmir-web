import { MenuIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const navigationType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: MenuIcon,
  groups: [
    { name: "header", title: "Header", default: true },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "headerLinks",
      title: "Header links",
      type: "array",
      group: "header",
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "anchor",
              title: "Anchor",
              type: "string",
              description: 'An on-page anchor like "#work" or a path like "/work/un1t".',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "anchor" } },
        }),
      ],
    }),
    defineField({
      name: "headerCta",
      title: "Header CTA",
      type: "cta",
      group: "header",
      description: "The button shown at the end of the header.",
    }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "text",
      rows: 2,
      group: "footer",
    }),
    defineField({
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      group: "footer",
      of: [
        defineArrayMember({
          type: "object",
          name: "footerLink",
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
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "footerNote",
      title: "Footer note",
      type: "string",
      group: "footer",
      description: 'Small print, e.g. "© Gimmir Ltd.". The year is added automatically.',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});
