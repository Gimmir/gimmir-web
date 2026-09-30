/**
 * /about, "About us" (doc 09 §3.10, the founders page renamed). Facts from
 * Nazar (2026-09-30): Oleh led UN1T's architecture; Nazar co-founded Jimmy
 * Coach with Quentin, on his own money (Oleh had no part in Jimmy). The
 * team and company lines are the live founders page's approved wording.
 * Everything marked DRAFT is for Nazar to edit. Copy matches doc 09: two
 * founders who build SaaS as owners, fitness where they go deepest.
 */
import type { HeadlineToken } from "@/components/blocks/inline-headline";
import type { FounderId } from "@/lib/founders";

export const about = {
  meta: {
    title: "About Us: Nazar & Oleh, the Founders Behind Gimmir",
    description:
      "Gimmir is two founders who build SaaS as owners, not by the hour. Nine products shipped, four in fitness, one we co-own. Meet Nazar and Oleh.",
  },

  // Nazar's pick o3 (2026-09-30): ink, two big portraits, a lime "&"
  hero: {
    label: "About us",
    title: "Nazar & Oleh.",
    // DRAFT
    lede: "Two founders who build SaaS as owners, not by the hour. Fitness is where we go deepest.",
    people: ["nazar", "oleh"] satisfies FounderId[],
  },

  // doc 09: 9 products shipped · 4 in fitness · 1 we co-own
  numbers: {
    label: "What we’ve built",
    items: [
      { value: "9", line: "products shipped." },
      { value: "4", line: "of them in fitness." },
      { value: "1", line: "we co-own: Jimmy Coach." },
    ],
  },

  // DRAFT, from the approved bios and Nazar's facts. Roles sit in the
  // header (FOUNDERS); each cell leads with its key phrase (`b`).
  who: {
    title: "Who does what.",
    rows: [
      {
        label: "Owns",
        nazar: {
          b: "Product and business",
          rest: ": your plan, your roadmap, what to build first.",
        },
        oleh: {
          b: "Architecture and delivery",
          rest: ": how it’s built, and whether it will scale.",
        },
      },
      {
        label: "Built",
        nazar: {
          b: "Jimmy Coach",
          rest: ", co-founded with Quentin on his own money.",
        },
        oleh: {
          b: "UN1T’s platform",
          rest: ": its architecture, across 10+ locations.",
        },
      },
      {
        label: "Leads",
        nazar: {
          b: "The Review",
          rest: ", and the first call with brands.",
        },
        oleh: { b: "The build", rest: ", from the first commit to launch." },
      },
    ],
    // the last row is a call with each of them
    talk: {
      nazar: { label: "Talk to Nazar", booking: "costCheck" },
      oleh: { label: "Talk to Oleh", booking: "founderReview" },
    },
  },

  // DRAFT: facts only (agency years, the two products, what they taught us)
  origin: {
    label: "How we got here",
    title: [
      "We build like owners because we’ve been",
      { mark: "owners", after: "." },
    ] satisfies HeadlineToken[],
    body: [
      "We’ve built software together for years, first as a general-purpose agency: nine products shipped, four of them in fitness.",
      "Two of them changed how we work. Oleh led the architecture that took UN1T, a 10+ location franchise, off a rented platform and onto its own. Nazar co-founded Jimmy Coach with Quentin, on his own money, and it reached 200+ coaches two months after launch.",
      "Carrying the result, not the hours, is what we bring to every build now. Your SaaS, built as if it were ours, and yours from the first commit.",
    ],
  },

  // the live founders page's five beliefs; 03 rewritten to match doc 09
  // (DRAFT), the rest as approved
  believe: {
    title: "What we believe.",
    items: [
      {
        title: "Judgment over hours.",
        body: "You are not buying time. You are buying decisions that hold up two years from now.",
      },
      {
        title: "We build to survive growth.",
        body: "Anyone can ship a demo. We build the version that still works after you scale, add locations, and raise.",
      },
      {
        title: "Deep beats wide.",
        body: "Fitness is where we go deepest, because we have shipped real products there. Anywhere else, we tell you plainly if we are not the right team.",
      },
      {
        title: "The truth, even when it costs us.",
        body: "We will tell you to cut a feature, change a plan, or not hire us, if that is the honest call.",
      },
      {
        title: "You own everything.",
        body: "Your code, your IP, your accounts, yours from day one.",
      },
    ],
  },

  // the live founders page's approved wording
  team: {
    title: "Two founders, a full team behind them.",
    items: [
      {
        value: "10",
        label: "Senior engineers and designers",
        body: "A core team we have shipped with before. No bench of juniors: the team is assembled around your build.",
      },
      {
        value: "LLC",
        label: "Gimmir LLC, Delaware",
        body: "You contract with a US company. We are a Ukrainian-founded studio.",
      },
      {
        value: "EU",
        label: "Your working hours",
        body: "The team works from the EU, in your working hours.",
      },
    ],
  },
} as const;
