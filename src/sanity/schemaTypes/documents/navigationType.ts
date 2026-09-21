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
              description:
                'An on-page anchor like "#work" or a path like "/work/un1t".',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "anchor" } },
        }),
      ],
    }),
    defineField({
      name: "headerCtaLabel",
      title: "Header CTA label",
      type: "string",
      group: "header",
      description:
        "The header button on pages that serve both audiences; it links to /contact. Operator and founder pages show their own signed booking button.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "text",
      rows: 2,
      group: "footer",
    }),
    defineField({
      name: "footerCtaLabel",
      title: "Footer CTA label",
      type: "string",
      group: "footer",
      description:
        "The footer button on pages that serve both audiences; it links to /contact. Operator and founder pages show their own signed booking button.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "footerColumns",
      title: "Footer columns",
      type: "array",
      group: "footer",
      description:
        "Link columns in the footer. The legal & contact column is added in code.",
      of: [
        defineArrayMember({
          type: "object",
          name: "footerColumn",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "footerColumnLink",
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
          ],
          preview: { select: { title: "title" } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      group: "footer",
      // Retired: replaced by footerColumns.
      hidden: true,
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
      description:
        'Small print, e.g. "© Gimmir Ltd.". The year is added automatically.',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});
