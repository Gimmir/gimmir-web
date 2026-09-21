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
    { name: "problem", title: "Problem", options: { collapsible: true, collapsed: true } },
    { name: "proof", title: "Proof / case grid", options: { collapsible: true, collapsed: true } },
    { name: "who", title: "Who we build for", options: { collapsible: true, collapsed: true } },
    { name: "services", title: "Services", options: { collapsible: true, collapsed: true } },
    { name: "foundersSection", title: "Founders", options: { collapsible: true, collapsed: true } },
    { name: "trust", title: "Trust", options: { collapsible: true, collapsed: true } },
    { name: "reviewCta", title: "Review CTA", options: { collapsible: true, collapsed: true } },
    { name: "offers", title: "Ways to start", options: { collapsible: true, collapsed: true } },
    { name: "faq", title: "FAQ", options: { collapsible: true, collapsed: true } },
    { name: "finalCta", title: "Final CTA", options: { collapsible: true, collapsed: true } },
  ],
  // Hidden fields are retired: signed CTA labels and call lengths now live
  // in code (lib/booking.ts), and retired sections no longer render.
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
    defineField({ name: "heroPrimaryCtaLabel", hidden: true, title: "Primary CTA label", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroPrimaryCtaLabelShort", hidden: true, title: "Primary CTA label (mobile)", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Secondary CTA label", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroSecondaryCtaHref", title: "Secondary CTA link", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "marquee", hidden: true, title: "Marquee items", type: "array", of: [defineArrayMember({ type: "string" })], group: "content", fieldset: "hero" }),
    defineField({ name: "heroTrustStrip", title: "Trust strip", type: "array", of: [defineArrayMember({ type: "string" })], group: "content", fieldset: "hero", description: "Short proof points under the hero buttons.", validation: (r) => r.max(4) }),

    // Problem
    defineField({ name: "problemHeading", title: "Heading", type: "string", group: "content", fieldset: "problem" }),
    defineField({ name: "problemAccent", title: "Heading accent", type: "string", group: "content", fieldset: "problem" }),
    defineField({ name: "problemBody", title: "Body", type: "text", rows: 5, group: "content", fieldset: "problem" }),

    // Proof
    defineField({ name: "proofHeading", title: "Heading", type: "string", group: "content", fieldset: "proof" }),
    defineField({ name: "proofLinkLabel", title: "Link label", type: "string", group: "content", fieldset: "proof" }),
    defineField({ name: "proofLinkHref", title: "Link href", type: "string", group: "content", fieldset: "proof" }),

    // Who we build for
    defineField({ name: "whoHeading", hidden: true, title: "Heading", type: "string", group: "content", fieldset: "who" }),
    defineField({ name: "whoAccent", hidden: true, title: "Heading accent", type: "string", group: "content", fieldset: "who" }),
    defineField({ name: "whoIntro", hidden: true, title: "Intro", type: "text", rows: 3, group: "content", fieldset: "who" }),
    defineField({ name: "whoRows", hidden: true, title: "Rows", type: "array", of: [defineArrayMember({ type: "infoCard" })], group: "content", fieldset: "who" }),

    // Services
    defineField({ name: "servicesHeading", hidden: true, title: "Heading", type: "string", group: "content", fieldset: "services" }),
    defineField({ name: "servicesAccent", hidden: true, title: "Heading accent", type: "string", group: "content", fieldset: "services" }),
    defineField({ name: "servicesItems", hidden: true, title: "Services", type: "array", of: [defineArrayMember({ type: "infoCard" })], group: "content", fieldset: "services" }),
    defineField({ name: "servicesFootnote", hidden: true, title: "Footnote", type: "text", rows: 2, group: "content", fieldset: "services" }),

    // Founders
    defineField({ name: "foundersHeading", title: "Heading", type: "string", group: "content", fieldset: "foundersSection" }),
    defineField({ name: "foundersAccent", title: "Heading accent", type: "string", group: "content", fieldset: "foundersSection" }),
    defineField({ name: "foundersIntro", title: "Intro", type: "text", rows: 3, group: "content", fieldset: "foundersSection" }),
    defineField({ name: "founders", title: "Founder cards", type: "array", of: [defineArrayMember({ type: "founderCard" })], group: "content", fieldset: "foundersSection", validation: (r) => r.max(3) }),
    defineField({ name: "foundersBullets", title: "Bullets", type: "array", of: [defineArrayMember({ type: "string" })], group: "content", fieldset: "foundersSection" }),
    defineField({ name: "foundersFootnote", title: "Footnote", type: "text", rows: 2, group: "content", fieldset: "foundersSection" }),

    // Trust
    defineField({ name: "trustHeading", hidden: true, title: "Heading", type: "string", group: "content", fieldset: "trust" }),
    defineField({ name: "trustAccent", hidden: true, title: "Heading accent", type: "string", group: "content", fieldset: "trust" }),
    defineField({ name: "trustCards", hidden: true, title: "Cards", type: "array", of: [defineArrayMember({ type: "infoCard" })], group: "content", fieldset: "trust" }),

    // Review CTA
    defineField({ name: "reviewCtaHeading", hidden: true, title: "Heading", type: "string", group: "content", fieldset: "reviewCta" }),
    defineField({ name: "reviewCtaAccent", hidden: true, title: "Heading accent", type: "string", group: "content", fieldset: "reviewCta" }),
    defineField({ name: "reviewCtaIntro", hidden: true, title: "Intro", type: "text", rows: 2, group: "content", fieldset: "reviewCta" }),
    defineField({ name: "reviewCtaButtonLabel", hidden: true, title: "Button label", type: "string", group: "content", fieldset: "reviewCta" }),

    // Ways to start (the offers themselves come from lib/offers.ts)
    defineField({ name: "offersHeading", title: "Heading", type: "string", group: "content", fieldset: "offers" }),
    defineField({ name: "offersIntro", title: "Intro", type: "text", rows: 2, group: "content", fieldset: "offers" }),

    // FAQ
    defineField({ name: "faqHeading", title: "Heading", type: "string", group: "content", fieldset: "faq" }),
    defineField({ name: "faqItems", title: "Items", type: "array", of: [defineArrayMember({ type: "faqItem" })], group: "content", fieldset: "faq" }),

    // Final CTA
    defineField({ name: "finalCtaEyebrow", title: "Eyebrow", type: "string", group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaHeading", title: "Heading", type: "string", group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaIntro", title: "Intro", type: "text", rows: 3, group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaButtonLabel", hidden: true, title: "Button label", type: "string", group: "content", fieldset: "finalCta" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Home page", subtitle: "Landing page" };
    },
  },
});
