/**
 * /contact, V2 (doc 09 §3.11): two big doors with faces, Nazar for
 * fitness brands, Oleh (with Nazar) for founders building a SaaS. The
 * doors' titles, details and calls are the site-wide BOOK_DOORS; the lines
 * here are the page's own.
 */
import type { HeadlineToken } from "@/components/blocks/inline-headline";

export const contact = {
  hero: {
    headline: [
      "Book a call. Talk to",
      { faces: ["nazar", "oleh"], sr: "Nazar and Oleh," },
      "the people who’ll build it.",
    ] satisfies HeadlineToken[],
    sub: "Twenty to thirty minutes. No pitch deck. If we're not the right team, we'll say so.",
  },

  // who each door is for (doc 09 §0, buyers A and B)
  doors: {
    operators: { anchor: "operators", note: "Best fit: 8+ locations." },
    saas: {
      anchor: "founders",
      note: "For founders building or owning a SaaS.",
    },
  },

  faq: { title: "Before you book." },
} as const;
