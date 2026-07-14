import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "content",
      description: "Only shown inside the Studio.",
      initialValue: "Home",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageBuilder",
      title: "Sections",
      type: "array",
      group: "content",
      description: "Compose the landing page. Drag to reorder.",
      of: [
        defineArrayMember({ type: "heroSection" }),
        defineArrayMember({ type: "logosSection" }),
        defineArrayMember({ type: "caseStudiesSection" }),
        defineArrayMember({ type: "processSection" }),
        defineArrayMember({ type: "testimonialSection" }),
        defineArrayMember({ type: "foundersSection" }),
        defineArrayMember({ type: "reviewCtaSection" }),
      ],
      options: {
        insertMenu: {
          views: [{ name: "list" }],
        },
      },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Home page", subtitle: "Landing page" };
    },
  },
});
