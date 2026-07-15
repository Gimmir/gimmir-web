import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const reviewPageType = defineType({
  name: "reviewPage",
  title: "The Review page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "problem", title: "Problem", options: { collapsible: true, collapsed: true } },
    { name: "whatItIs", title: "What it is", options: { collapsible: true, collapsed: true } },
    { name: "deliverables", title: "Deliverables", options: { collapsible: true, collapsed: true } },
    { name: "foundersSection", title: "Founders", options: { collapsible: true, collapsed: true } },
    { name: "process", title: "Process", options: { collapsible: true, collapsed: true } },
    { name: "pricing", title: "Pricing", options: { collapsible: true, collapsed: true } },
    { name: "fit", title: "Fit", options: { collapsible: true, collapsed: true } },
    { name: "proof", title: "Proof", options: { collapsible: true, collapsed: true } },
    { name: "faq", title: "FAQ", options: { collapsible: true, collapsed: true } },
    { name: "finalCta", title: "Final CTA", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "title", title: "Internal title", type: "string", group: "content", initialValue: "The Review", validation: (r) => r.required() }),

    // Hero
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", group: "content", fieldset: "hero", validation: (r) => r.required() }),
    defineField({ name: "heroAccent", title: "Heading accent", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroSubhead", title: "Subhead", type: "text", rows: 3, group: "content", fieldset: "hero" }),
    defineField({ name: "heroCtaLabel", title: "CTA label", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroCtaHelper", title: "CTA helper", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "marquee", title: "Marquee items", type: "array", of: [defineArrayMember({ type: "string" })], group: "content", fieldset: "hero" }),

    // Problem
    defineField({ name: "problemHeading", title: "Heading", type: "string", group: "content", fieldset: "problem" }),
    defineField({ name: "problemAccent", title: "Heading accent", type: "string", group: "content", fieldset: "problem" }),
    defineField({ name: "problemBody", title: "Body", type: "text", rows: 4, group: "content", fieldset: "problem" }),
    defineField({ name: "problemCallout", title: "Callout", type: "text", rows: 3, group: "content", fieldset: "problem" }),

    // What it is
    defineField({ name: "whatHeading", title: "Heading", type: "string", group: "content", fieldset: "whatItIs" }),
    defineField({ name: "whatAccent", title: "Heading accent", type: "string", group: "content", fieldset: "whatItIs" }),
    defineField({ name: "whatIntro", title: "Intro", type: "text", rows: 3, group: "content", fieldset: "whatItIs" }),
    defineField({ name: "focusLabel", title: "Focus label", type: "string", group: "content", fieldset: "whatItIs" }),
    defineField({ name: "focusItems", title: "Focus areas", type: "array", of: [defineArrayMember({ type: "string" })], group: "content", fieldset: "whatItIs", description: "Order maps to the illustrations in code.", validation: (r) => r.max(6) }),

    // Deliverables
    defineField({ name: "deliverablesHeading", title: "Heading", type: "string", group: "content", fieldset: "deliverables" }),
    defineField({ name: "deliverablesAccent", title: "Heading accent", type: "string", group: "content", fieldset: "deliverables" }),
    defineField({ name: "deliverablesIntro", title: "Intro", type: "text", rows: 2, group: "content", fieldset: "deliverables" }),
    defineField({ name: "deliverablesItems", title: "Items", type: "array", of: [defineArrayMember({ type: "infoCard" })], group: "content", fieldset: "deliverables" }),
    defineField({ name: "deliverablesClosing", title: "Closing line", type: "text", rows: 2, group: "content", fieldset: "deliverables" }),

    // Founders
    defineField({ name: "foundersHeading", title: "Heading", type: "string", group: "content", fieldset: "foundersSection" }),
    defineField({ name: "foundersAccent", title: "Heading accent", type: "string", group: "content", fieldset: "foundersSection" }),
    defineField({ name: "founders", title: "Founder cards", type: "array", of: [defineArrayMember({ type: "founderCard" })], group: "content", fieldset: "foundersSection", validation: (r) => r.max(3) }),
    defineField({ name: "foundersFootnote", title: "Footnote", type: "text", rows: 3, group: "content", fieldset: "foundersSection" }),

    // Process
    defineField({ name: "processHeading", title: "Heading", type: "string", group: "content", fieldset: "process" }),
    defineField({ name: "processAccent", title: "Heading accent", type: "string", group: "content", fieldset: "process" }),

    // Pricing
    defineField({ name: "pricingEyebrow", title: "Eyebrow", type: "string", group: "content", fieldset: "pricing" }),
    defineField({ name: "pricingPrice", title: "Price", type: "string", group: "content", fieldset: "pricing" }),
    defineField({ name: "pricingPriceSuffix", title: "Price suffix", type: "string", group: "content", fieldset: "pricing" }),
    defineField({ name: "pricingLead", title: "Lead paragraph", type: "text", rows: 2, group: "content", fieldset: "pricing" }),
    defineField({ name: "pricingNote", title: "Note paragraph", type: "text", rows: 3, group: "content", fieldset: "pricing" }),
    defineField({ name: "pricingButtonLabel", title: "Button label", type: "string", group: "content", fieldset: "pricing" }),
    defineField({ name: "pricingIncludedLabel", title: "Included label", type: "string", group: "content", fieldset: "pricing" }),
    defineField({ name: "pricingIncluded", title: "Included items", type: "array", of: [defineArrayMember({ type: "string" })], group: "content", fieldset: "pricing" }),

    // Fit
    defineField({ name: "fitHeading", title: "Heading", type: "string", group: "content", fieldset: "fit" }),
    defineField({ name: "fitChecks", title: "Fit checks", type: "array", of: [defineArrayMember({ type: "string" })], group: "content", fieldset: "fit" }),
    defineField({ name: "fitNotLabel", title: "Not-a-fit label", type: "string", group: "content", fieldset: "fit" }),
    defineField({ name: "fitNotBody", title: "Not-a-fit body", type: "text", rows: 3, group: "content", fieldset: "fit" }),

    // Proof
    defineField({ name: "proofHeading", title: "Heading", type: "string", group: "content", fieldset: "proof" }),
    defineField({ name: "proofAccent", title: "Heading accent", type: "string", group: "content", fieldset: "proof" }),

    // FAQ
    defineField({ name: "faqHeading", title: "Heading", type: "string", group: "content", fieldset: "faq" }),
    defineField({ name: "faqAccent", title: "Heading accent", type: "string", group: "content", fieldset: "faq" }),
    defineField({ name: "faqItems", title: "Items", type: "array", of: [defineArrayMember({ type: "faqItem" })], group: "content", fieldset: "faq" }),

    // Final CTA
    defineField({ name: "finalCtaEyebrow", title: "Eyebrow", type: "string", group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaHeading", title: "Heading", type: "string", group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaIntro", title: "Intro", type: "text", rows: 3, group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaButtonLabel", title: "Button label", type: "string", group: "content", fieldset: "finalCta" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "The Review page" };
    },
  },
});
