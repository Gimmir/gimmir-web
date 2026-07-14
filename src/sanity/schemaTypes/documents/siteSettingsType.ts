import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact & social" },
    { name: "seo", title: "Default SEO" },
    { name: "analytics", title: "Analytics" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      group: "general",
      initialValue: "Gimmir",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "general",
      description: "Default meta description fallback and overall positioning line.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "general",
      description: "Optional. A wordmark falls back to the site name when empty.",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Contact phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "contact",
      description: 'e.g. "London · New York".',
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      group: "contact",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
      description:
        "Site-wide defaults. Individual pages can override the title, description and share image.",
    }),
    defineField({
      name: "analytics",
      title: "Analytics",
      type: "object",
      group: "analytics",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "provider",
          title: "Provider",
          type: "string",
          options: {
            list: [
              { title: "None", value: "none" },
              { title: "Plausible", value: "plausible" },
              { title: "Google Analytics 4", value: "ga4" },
            ],
            layout: "radio",
          },
          initialValue: "none",
        }),
        defineField({
          name: "plausibleDomain",
          title: "Plausible domain",
          type: "string",
          description: 'e.g. "gimmir.com".',
          hidden: ({ parent }) => parent?.provider !== "plausible",
        }),
        defineField({
          name: "gaMeasurementId",
          title: "GA4 measurement ID",
          type: "string",
          description: 'e.g. "G-XXXXXXXXXX".',
          hidden: ({ parent }) => parent?.provider !== "ga4",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
