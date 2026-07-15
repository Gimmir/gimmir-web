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
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "proof", title: "Proof / case grid", options: { collapsible: true, collapsed: true } },
    { name: "who", title: "Who we build for", options: { collapsible: true, collapsed: true } },
    { name: "services", title: "Services", options: { collapsible: true, collapsed: true } },
    { name: "foundersSection", title: "Founders", options: { collapsible: true, collapsed: true } },
    { name: "trust", title: "Trust", options: { collapsible: true, collapsed: true } },
    { name: "reviewCta", title: "Review CTA", options: { collapsible: true, collapsed: true } },
    { name: "finalCta", title: "Final CTA", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "content",
      initialValue: "Home",
      validation: (rule) => rule.required(),
    }),

    // Hero
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", group: "content", fieldset: "hero", validation: (r) => r.required() }),
    defineField({ name: "heroAccent", title: "Heading accent", type: "string", group: "content", fieldset: "hero", description: "Emphasized trailing phrase." }),
    defineField({ name: "heroSubhead", title: "Subhead", type: "text", rows: 3, group: "content", fieldset: "hero" }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Primary CTA label", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroPrimaryCtaLabelShort", title: "Primary CTA label (mobile)", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Secondary CTA label", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroSecondaryCtaHref", title: "Secondary CTA link", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "marquee", title: "Marquee items", type: "array", of: [defineArrayMember({ type: "string" })], group: "content", fieldset: "hero" }),

    // Proof
    defineField({ name: "proofHeading", title: "Heading", type: "string", group: "content", fieldset: "proof" }),
    defineField({ name: "proofLinkLabel", title: "Link label", type: "string", group: "content", fieldset: "proof" }),
    defineField({ name: "proofLinkHref", title: "Link href", type: "string", group: "content", fieldset: "proof" }),

    // Who we build for
    defineField({ name: "whoHeading", title: "Heading", type: "string", group: "content", fieldset: "who" }),
    defineField({ name: "whoAccent", title: "Heading accent", type: "string", group: "content", fieldset: "who" }),
    defineField({ name: "whoIntro", title: "Intro", type: "text", rows: 3, group: "content", fieldset: "who" }),
    defineField({ name: "whoRows", title: "Rows", type: "array", of: [defineArrayMember({ type: "infoCard" })], group: "content", fieldset: "who" }),

    // Services
    defineField({ name: "servicesHeading", title: "Heading", type: "string", group: "content", fieldset: "services" }),
    defineField({ name: "servicesAccent", title: "Heading accent", type: "string", group: "content", fieldset: "services" }),
    defineField({ name: "servicesItems", title: "Services", type: "array", of: [defineArrayMember({ type: "infoCard" })], group: "content", fieldset: "services" }),
    defineField({ name: "servicesFootnote", title: "Footnote", type: "text", rows: 2, group: "content", fieldset: "services" }),

    // Founders
    defineField({ name: "foundersHeading", title: "Heading", type: "string", group: "content", fieldset: "foundersSection" }),
    defineField({ name: "foundersAccent", title: "Heading accent", type: "string", group: "content", fieldset: "foundersSection" }),
    defineField({ name: "foundersIntro", title: "Intro", type: "text", rows: 3, group: "content", fieldset: "foundersSection" }),
    defineField({ name: "founders", title: "Founder cards", type: "array", of: [defineArrayMember({ type: "founderCard" })], group: "content", fieldset: "foundersSection", validation: (r) => r.max(3) }),
    defineField({ name: "foundersFootnote", title: "Footnote", type: "text", rows: 2, group: "content", fieldset: "foundersSection" }),

    // Trust
    defineField({ name: "trustHeading", title: "Heading", type: "string", group: "content", fieldset: "trust" }),
    defineField({ name: "trustAccent", title: "Heading accent", type: "string", group: "content", fieldset: "trust" }),
    defineField({ name: "trustCards", title: "Cards", type: "array", of: [defineArrayMember({ type: "infoCard" })], group: "content", fieldset: "trust" }),

    // Review CTA
    defineField({ name: "reviewCtaHeading", title: "Heading", type: "string", group: "content", fieldset: "reviewCta" }),
    defineField({ name: "reviewCtaAccent", title: "Heading accent", type: "string", group: "content", fieldset: "reviewCta" }),
    defineField({ name: "reviewCtaIntro", title: "Intro", type: "text", rows: 2, group: "content", fieldset: "reviewCta" }),
    defineField({ name: "reviewCtaButtonLabel", title: "Button label", type: "string", group: "content", fieldset: "reviewCta" }),

    // Final CTA
    defineField({ name: "finalCtaEyebrow", title: "Eyebrow", type: "string", group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaHeading", title: "Heading", type: "string", group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaIntro", title: "Intro", type: "text", rows: 3, group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaButtonLabel", title: "Button label", type: "string", group: "content", fieldset: "finalCta" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Home page", subtitle: "Landing page" };
    },
  },
});
