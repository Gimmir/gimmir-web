import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const howWeWorkPageType = defineType({
  name: "howWeWorkPage",
  title: "How we work page",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "fears", title: "Fears", options: { collapsible: true, collapsed: true } },
    { name: "runs", title: "What working with us looks like", options: { collapsible: true, collapsed: true } },
    { name: "principles", title: "Principles", options: { collapsible: true, collapsed: true } },
    { name: "twoPerson", title: "The two-person question", options: { collapsible: true, collapsed: true } },
    { name: "pricing", title: "Pricing philosophy", options: { collapsible: true, collapsed: true } },
    { name: "finalCta", title: "Final CTA", options: { collapsible: true, collapsed: true } },
  ],
  // Hidden fields are retired: signed CTA labels and call lengths now live
  // in code (lib/booking.ts).
  fields: [
    defineField({ name: "title", title: "Internal title", type: "string", group: "content", initialValue: "How we work", validation: (r) => r.required() }),

    // Hero
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", group: "content", fieldset: "hero", validation: (r) => r.required() }),
    defineField({ name: "heroAccent", title: "Heading accent", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroSubhead", title: "Subhead", type: "text", rows: 3, group: "content", fieldset: "hero" }),
    defineField({ name: "heroCtaLabel", hidden: true, title: "CTA label", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroCtaHelper", hidden: true, title: "CTA helper", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "marquee", title: "Marquee items", type: "array", of: [defineArrayMember({ type: "string" })], group: "content", fieldset: "hero" }),

    // Fears
    defineField({ name: "fearsHeading", title: "Heading", type: "string", group: "content", fieldset: "fears" }),
    defineField({ name: "fearsAccent", title: "Heading accent", type: "string", group: "content", fieldset: "fears" }),
    defineField({ name: "fearsAnswerLabel", title: "Answer label", type: "string", group: "content", fieldset: "fears", description: 'e.g. "How we kill it".' }),
    defineField({ name: "fears", title: "Fears", type: "array", of: [defineArrayMember({ type: "fearItem" })], group: "content", fieldset: "fears" }),

    // Runs
    defineField({ name: "runsHeading", title: "Heading", type: "string", group: "content", fieldset: "runs" }),
    defineField({ name: "runsAccent", title: "Heading accent", type: "string", group: "content", fieldset: "runs" }),
    defineField({ name: "runsSteps", title: "Steps", type: "array", of: [defineArrayMember({ type: "infoCard" })], group: "content", fieldset: "runs" }),

    // Principles
    defineField({ name: "principlesHeading", title: "Heading", type: "string", group: "content", fieldset: "principles" }),
    defineField({ name: "principlesAccent", title: "Heading accent", type: "string", group: "content", fieldset: "principles" }),
    defineField({ name: "principlesItems", title: "Items", type: "array", of: [defineArrayMember({ type: "string" })], group: "content", fieldset: "principles" }),

    // Two-person question
    defineField({ name: "twoPersonHeading", title: "Heading", type: "string", group: "content", fieldset: "twoPerson" }),
    defineField({ name: "twoPersonBody", title: "Body", type: "text", rows: 6, group: "content", fieldset: "twoPerson" }),
    defineField({ name: "twoPersonBullets", title: "Bullets", type: "array", of: [defineArrayMember({ type: "string" })], group: "content", fieldset: "twoPerson" }),

    // Pricing philosophy (prices themselves live in lib/offers.ts)
    defineField({ name: "pricingHeading", title: "Heading", type: "string", group: "content", fieldset: "pricing" }),
    defineField({ name: "pricingBody", title: "Body", type: "text", rows: 3, group: "content", fieldset: "pricing" }),

    // Final CTA
    defineField({ name: "finalCtaEyebrow", title: "Eyebrow", type: "string", group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaHeading", title: "Heading", type: "string", group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaIntro", title: "Intro", type: "text", rows: 3, group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaButtonLabel", hidden: true, title: "Button label", type: "string", group: "content", fieldset: "finalCta" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "How we work page" };
    },
  },
});
