import { UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const foundersPageType = defineType({
  name: "foundersPage",
  title: "Founders page",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "story", title: "Story", options: { collapsible: true, collapsed: true } },
    { name: "believe", title: "What we believe", options: { collapsible: true, collapsed: true } },
    { name: "people", title: "People", options: { collapsible: true, collapsed: true } },
    { name: "studio", title: "Studio", options: { collapsible: true, collapsed: true } },
    { name: "finalCta", title: "Final CTA", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "title", title: "Internal title", type: "string", group: "content", initialValue: "Founders", validation: (r) => r.required() }),

    // Hero
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", group: "content", fieldset: "hero", validation: (r) => r.required() }),
    defineField({ name: "heroAccent", title: "Heading accent", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroSubhead", title: "Subhead", type: "text", rows: 3, group: "content", fieldset: "hero" }),
    defineField({ name: "heroCtaLabel", title: "CTA label", type: "string", group: "content", fieldset: "hero" }),
    defineField({ name: "heroCtaHelper", title: "CTA helper", type: "string", group: "content", fieldset: "hero" }),

    // Story
    defineField({ name: "storyHeading", title: "Heading", type: "string", group: "content", fieldset: "story" }),
    defineField({ name: "storyAccent", title: "Heading accent", type: "string", group: "content", fieldset: "story" }),
    defineField({ name: "storyDifferenceLabel", title: "Difference label", type: "string", group: "content", fieldset: "story", description: 'e.g. "The difference".' }),
    defineField({ name: "storyDifferenceBig", title: "Difference big text", type: "string", group: "content", fieldset: "story", description: 'e.g. "We have.".' }),
    defineField({ name: "storyDifferenceSub", title: "Difference subtext", type: "string", group: "content", fieldset: "story" }),
    defineField({ name: "storyStats", title: "Difference stats", type: "array", of: [defineArrayMember({ type: "stat" })], group: "content", fieldset: "story", validation: (r) => r.max(3) }),
    defineField({ name: "storyBody1", title: "Body paragraph 1", type: "text", rows: 4, group: "content", fieldset: "story" }),
    defineField({ name: "storyBody2", title: "Body paragraph 2", type: "text", rows: 4, group: "content", fieldset: "story" }),
    defineField({ name: "storyOriginLabel", title: "Origin label", type: "string", group: "content", fieldset: "story" }),
    defineField({ name: "storyOriginCaption", title: "Origin caption", type: "string", group: "content", fieldset: "story" }),
    defineField({ name: "storyOriginBody", title: "Origin body", type: "text", rows: 4, group: "content", fieldset: "story", description: "Replace this placeholder with your real origin story." }),

    // Believe
    defineField({ name: "believeHeading", title: "Heading", type: "string", group: "content", fieldset: "believe" }),
    defineField({ name: "believeAccent", title: "Heading accent", type: "string", group: "content", fieldset: "believe" }),
    defineField({ name: "believeItems", title: "Beliefs", type: "array", of: [defineArrayMember({ type: "infoCard" })], group: "content", fieldset: "believe" }),
    defineField({ name: "believeFinaleTitle", title: "Finale title", type: "string", group: "content", fieldset: "believe" }),
    defineField({ name: "believeFinaleBody", title: "Finale body", type: "text", rows: 2, group: "content", fieldset: "believe" }),

    // People
    defineField({ name: "peopleHeading", title: "Heading", type: "string", group: "content", fieldset: "people" }),
    defineField({ name: "peopleAccent", title: "Heading accent", type: "string", group: "content", fieldset: "people" }),
    defineField({ name: "founders", title: "Founder cards", type: "array", of: [defineArrayMember({ type: "founderCard" })], group: "content", fieldset: "people", validation: (r) => r.max(3) }),
    defineField({ name: "peopleFootnote", title: "Footnote", type: "text", rows: 3, group: "content", fieldset: "people" }),

    // Studio
    defineField({ name: "studioHeading", title: "Heading", type: "string", group: "content", fieldset: "studio" }),
    defineField({ name: "studioAccent", title: "Heading accent", type: "string", group: "content", fieldset: "studio" }),
    defineField({ name: "studioBody", title: "Body", type: "text", rows: 4, group: "content", fieldset: "studio" }),
    defineField({ name: "studioTeamCaption", title: "Team caption", type: "string", group: "content", fieldset: "studio" }),
    defineField({ name: "studioTeamSizeBody", title: "Team-size note", type: "text", rows: 3, group: "content", fieldset: "studio", description: "Replace this placeholder with the honest team-size line." }),

    // Final CTA
    defineField({ name: "finalCtaEyebrow", title: "Eyebrow", type: "string", group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaHeading", title: "Heading", type: "string", group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaIntro", title: "Intro", type: "text", rows: 3, group: "content", fieldset: "finalCta" }),
    defineField({ name: "finalCtaButtonLabel", title: "Button label", type: "string", group: "content", fieldset: "finalCta" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Founders page" };
    },
  },
});
