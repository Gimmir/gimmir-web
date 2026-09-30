/**
 * /work, V2 (doc 09 §3.4). The NDA lines are Portfolio v4 ("file 08",
 * ~/.claude/linkedin/voice.md), verbatim and anonymous: no names, logos,
 * screenshots, numbers or links, nothing more specific than "European" or
 * "US". Portfolio v4 is marked NOT FINAL; the two lines marked DRAFT are
 * "scope unconfirmed" there too. Counts only where true: 9 shipped, 4 in
 * fitness, 2 public, 7 under NDA.
 */
import type { HeadlineToken } from "@/components/blocks/inline-headline";

export const work = {
  hero: {
    // Nazar's pick o2 (2026-09-30): the four fitness products inside the
    // sentence, the two we can show and the two under NDA (padlocked)
    headline: [
      "Nine products shipped. Four in",
      { apps: ["un1t", "jimmy"], locked: 2 },
      { mark: "fitness", after: "." },
    ] satisfies HeadlineToken[],
  },

  nda: {
    id: "nda",
    title: ["Under NDA.", "Details on a call."],
    groups: [
      {
        name: "Fitness",
        items: [
          {
            region: "European",
            label: "Connected fitness",
            text: "A European connected-fitness hardware brand. We built their companion app from scratch for iOS and Android: device connectivity, interactive game-based workouts and a content library.",
          },
          {
            label: "Fitness web platform",
            // DRAFT: scope unconfirmed in Portfolio v4
            text: "A fitness startup. We built their web platform in React.",
          },
        ],
      },
      {
        name: "Marketplaces & SaaS",
        items: [
          {
            region: "European",
            label: "Marketplace ecosystem",
            text: "A European services marketplace and its business tools. We built the ecosystem from scratch: a two-sided marketplace plus connected products for invoicing, time tracking, hiring and an operating system for small companies, all on shared data.",
          },
          {
            label: "Omni-channel SaaS",
            // DRAFT: scope unconfirmed in Portfolio v4
            text: "An AI startup: omni-channel-as-a-service platform, web app and backend in React and Node.js.",
          },
        ],
      },
      {
        name: "Community & engagement",
        items: [
          {
            region: "US",
            label: "Fan engagement",
            text: "A US entertainment-tech startup. We built their gamified fan-engagement platform from scratch, turning existing content into interactive campaigns.",
          },
          {
            region: "US",
            label: "Artist community",
            text: "A US music-tech startup: a community app connecting independent artists with each other and their local scenes.",
          },
        ],
      },
      {
        name: "Enterprise",
        items: [
          {
            region: "European",
            label: "E-commerce",
            text: "A major European retailer: web development on their e-commerce platform, alongside their in-house engineering team.",
          },
        ],
      },
    ] as const satisfies readonly {
      name: string;
      items: readonly { region?: string; label: string; text: string }[];
    }[],
    // doc 09's honesty note, in serif, beside the way in
    note: "Seven of the nine are under NDA. We describe them, never show them.",
    cta: { label: "Details on a call", href: "/contact" },
  },

  also: {
    label: "Also built",
    text: "the GAMMA5 marketing site and its CMS.",
    href: "https://gamma5media.com",
  },
} as const;
