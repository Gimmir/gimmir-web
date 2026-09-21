/**
 * Writes the founder-led strategy copy (Sept 2026) into Sanity as DRAFTS,
 * one phase at a time. Published content, and so the live site, never
 * changes from this script: drafts are reviewed in Studio / Presentation and
 * published together with the code release.
 *
 *   npx tsx scripts/strategy-content.ts --phase 1            # dry run, prints the diff
 *   npx tsx scripts/strategy-content.ts --phase 1 --write    # writes drafts.<id>
 *   npx tsx scripts/strategy-content.ts --preview /the-review
 *       # prints a one-hour draft-mode URL for local review
 *
 * Each draft is built from the published document plus the changes below,
 * so re-running is idempotent. If someone else already has a different draft
 * open, the script stops for that document unless --overwrite-drafts is set.
 *
 * Prices never go in here: they live in src/lib/offers.ts.
 */
import { createClient, type SanityDocument } from "@sanity/client";
import { createPreviewSecret } from "@sanity/preview-url-secret/create-secret";

import { loadEnv } from "./lib/env";

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

// --- helpers ------------------------------------------------------------------

type Change = {
  id: string;
  set: Record<string, unknown>;
  unset?: string[];
};

/** Keyed array members; keys are positional so re-runs produce identical drafts. */
const keyed = <T extends object>(prefix: string, type: string, items: T[]) =>
  items.map((item, i) => ({ _key: `${prefix}${i}`, _type: type, ...item }));

const cards = (prefix: string, items: Array<[title: string, body: string]>) =>
  keyed(
    prefix,
    "infoCard",
    items.map(([title, body]) => ({ title, body })),
  );

const faqs = (
  prefix: string,
  items: Array<[question: string, answer: string]>,
) =>
  keyed(
    prefix,
    "faqItem",
    items.map(([question, answer]) => ({ question, answer })),
  );

const links = (
  prefix: string,
  type: string,
  items: Array<[label: string, href: string]>,
) =>
  keyed(
    prefix,
    type,
    items.map(([label, href]) => ({ label, href })),
  );

// --- content ------------------------------------------------------------------

const PHASES: Record<number, Change[]> = {
  1: [
    {
      id: "reviewPage",
      set: {
        heroEyebrow: "For funded fitness & health founders",
        heroHeading: "Know if your product will survive",
        heroAccent: "its next 10,000 users.",
        heroSubhead:
          "I’m Oleh, Gimmir’s CTO. If you’ve raised money and you’re about to scale, or you inherited an MVP you don’t trust, I’ll review your architecture, code and plan and tell you straight what to fix, what to keep, and what to build next.",
        marquee: [
          "Architecture & data model",
          "Code quality & tests",
          "Payments & subscriptions",
          "Booking under load",
          "Health data & privacy",
          "AI where it pays",
        ],
        problemHeading: "Most MVPs aren’t built to survive success.",
        problemAccent: "",
        problemBody:
          "The version that got you funded was built for speed. That’s correct. But the same shortcuts that let you move fast become the reasons you stall at scale: brittle data models, no tests, a stack no one wants to touch.",
        problemCallout:
          "I’ve built fitness and wellness platforms that carry real users. I know where they break, and the cheapest moment to find out is before it costs you members, money or a round.",
        whatHeading: "An expert review of whether your product is",
        focusLabel:
          "We look at what actually breaks fitness and health products at scale",
        deliverablesHeading: "What you get from The Review.",
        deliverablesIntro:
          "A written report plus a live walkthrough, whether or not you build with us.",
        deliverablesItems: cards("dl", [
          [
            "Architecture review",
            "The data model, how it scales, and the decisions that will hurt later.",
          ],
          [
            "Code review",
            "Quality, tests and security: what’s safe to build on and what isn’t.",
          ],
          [
            "A plan",
            "What to fix now, what to defer and what to rebuild, in priority order.",
          ],
          ["A written report", "One you can hand to your team or your board."],
          [
            "A straight answer",
            "Whether your current team and stack can get you there.",
          ],
        ]),
        pricingLead:
          "One to two weeks. Led by both founders. You keep the report either way.",
        pricingIncluded: [
          "Architecture review",
          "Code review",
          "A prioritized plan",
          "A written report for your team or board",
          "A straight answer on team & stack",
          "Live walkthrough",
        ],
        fitHeading: "Who this is for, and who it isn’t.",
        fitChecks: [
          "You’ve raised (pre-seed to Series A) and you’re scaling a fitness or health product.",
          "You inherited a codebase you don’t fully trust.",
          "You want a CTO-level second opinion before you commit budget.",
        ],
        fitNotItems: [
          "You want the cheapest dev shop you can find.",
          "You need regulated clinical, HIPAA or medical-device software. That’s not us.",
          "You’re not ready to act on the findings.",
        ],
        proofHeading: "Jimmy Coach: two native apps and web, built to own.",
        proofAccent: "",
        proofBody:
          "We co-built and co-own Jimmy Coach with a working Hyrox and CrossFit coach who has coached 250+ clients. Client app, coach app and web dashboard: workout builder, community feed, messaging, Stripe subscriptions, courses, PRs and progress, branded apps. 100+ coaches and 300+ users in the first month. Stack: React Native (Expo), Supabase, Next.js, Stripe. We built it as owners, not by the hour, and we build yours the same way.",
        faqItems: faqs("fq", [
          [
            "What do I actually walk away with?",
            "A written report: architecture findings, code findings, and a prioritized plan you can act on with any team, not just us. Plus a live walkthrough.",
          ],
          [
            "I have a technical co-founder. Is this still useful?",
            "Especially then. It’s CTO-to-CTO. A second senior opinion before a big spend usually pays for itself.",
          ],
          [
            "What stack do you work in?",
            "React Native (Expo), TypeScript, Supabase, Next.js, Stripe. If you’re on something adjacent, I’ll tell you honestly whether we’re the right team.",
          ],
          [
            "Do you do regulated clinical or medical software?",
            "No. We build fitness and wellness or prevention products, not regulated clinical, HIPAA-covered or medical-device software. If that’s what you need, I’ll point you elsewhere.",
          ],
          [
            "What if the review says my product is fine?",
            "Then I’ll tell you that, and you’ve bought peace of mind and a roadmap. I’d rather lose the build than sell you one you don’t need.",
          ],
          [
            "Is my code and IP safe?",
            "Yes. We sign an NDA before we see anything, and you own everything, start to finish.",
          ],
          [
            "How long does it take?",
            "One to two weeks from kickoff to the walkthrough.",
          ],
          [
            "Do I have to build with you afterward?",
            "No. The report is yours to keep and act on however you want. If you do build with us, the review fee is credited.",
          ],
        ]),
        finalCtaHeading: "Know before you scale.",
        finalCtaIntro:
          "The problems that sink fitness and health products are cheapest to fix today. Start with a free call with Nazar and Oleh.",
        seo: {
          _type: "seo",
          metaTitle: "Technical Due Diligence for Fitness & Health Apps",
          metaDescription:
            "Technical due diligence for funded fitness and health apps: a CTO-level review of your architecture, code and plan. Fixed price, credited to your build.",
        },
      },
      unset: [
        "heroCtaLabel",
        "heroCtaHelper",
        "pricingPrice",
        "pricingPriceSuffix",
        "pricingButtonLabel",
        "fitNotLabel",
        "fitNotBody",
        "finalCtaButtonLabel",
      ],
    },
    {
      id: "navigation",
      set: {
        headerLinks: keyed(
          "hl",
          "navItem",
          [
            ["Work", "/work"],
            ["For operators", "/operators"],
            ["For product founders", "/the-review"],
            ["What we build", "/what-we-build"],
            ["Pricing", "/pricing"],
            ["Nazar & Oleh", "/founders"],
          ].map(([label, anchor]) => ({ label, anchor })),
        ),
        headerCtaLabel: "Book a call",
        footerTagline:
          "Built by Nazar & Oleh. Code, repos and accounts in your name from day one.",
        footerCtaLabel: "Book a call",
        footerColumns: keyed("fc", "footerColumn", [
          {
            title: "What we do",
            links: links("wd", "footerColumnLink", [
              ["For operators", "/operators"],
              ["For product founders", "/the-review"],
              ["Health & wellness", "/health"],
              ["What we build", "/what-we-build"],
              ["How we work", "/how-we-work"],
            ]),
          },
          {
            title: "Work",
            links: links("wk", "footerColumnLink", [
              ["UN1T", "/work/un1t"],
              ["Jimmy Coach", "/work/jimmy-coach"],
              ["All work", "/work"],
            ]),
          },
          {
            title: "Company",
            links: links("co", "footerColumnLink", [
              ["Nazar & Oleh", "/founders"],
              ["Pricing", "/pricing"],
              ["Book a call", "/contact"],
            ]),
          },
        ]),
        footerNote: "Product engineering for fitness & wellness",
      },
      unset: ["footerLinks"],
    },
    {
      id: "siteSettings",
      set: {
        description:
          "Founder-led product engineering for fitness and wellness platforms",
        flowSteps: keyed("fs", "flowStep", [
          {
            tag: "Free · 30 min",
            title: "Founder review call",
            description:
              "Talk directly with Nazar and Oleh. We look at your product or plan and give you real input on the spot.",
          },
          {
            tag: "Paid · 1–2 weeks",
            title: "The Review",
            description:
              "We review your product, code and plan against one question: will it survive growth. You get a written report and a plan of what to fix, keep and build, in order.",
          },
          {
            tag: "Build",
            title: "Fix Sprint or V1 build",
            description:
              "Delivered by the team the founders lead, in your name. Your review fee is credited toward the build.",
          },
        ]),
      },
      unset: ["finalCtaHelper"],
    },
  ],
};

// --- run ----------------------------------------------------------------------

const SYSTEM_KEYS = ["_rev", "_createdAt", "_updatedAt", "_system"];

function strip(doc: SanityDocument | null | undefined) {
  if (!doc) return null;
  const copy: Record<string, unknown> = { ...doc };
  for (const k of SYSTEM_KEYS) delete copy[k];
  delete copy._id;
  return copy;
}

const show = (v: unknown) => {
  const s = JSON.stringify(v);
  return s === undefined
    ? "(unset)"
    : s.length > 140
      ? `${s.slice(0, 140)}…`
      : s;
};

async function applyChange(
  change: Change,
  write: boolean,
  overwriteDrafts: boolean,
) {
  const published = await client.getDocument(change.id);
  if (!published) {
    console.error(`✗ ${change.id}: no published document, skipped`);
    return;
  }
  const draftId = `drafts.${change.id}`;
  const existing = strip(await client.getDocument(draftId));

  const next: Record<string, unknown> = { ...strip(published), ...change.set };
  for (const k of change.unset ?? []) delete next[k];

  const base = strip(published) ?? {};
  const changed = Object.keys({ ...base, ...next }).filter(
    (k) => JSON.stringify(base[k]) !== JSON.stringify(next[k]),
  );
  console.log(`\n● ${change.id}: ${changed.length} field(s) change`);
  for (const k of changed) {
    console.log(`  ${k}\n    - ${show(base[k])}\n    + ${show(next[k])}`);
  }

  if (
    existing &&
    JSON.stringify(existing) !== JSON.stringify(next) &&
    !overwriteDrafts
  ) {
    console.warn(
      `  ! ${draftId} already exists with other edits (someone may be working on it). Skipped; pass --overwrite-drafts to replace it.`,
    );
    return;
  }
  if (!write) return;
  await client.createOrReplace({
    ...next,
    _id: draftId,
    _type: published._type,
  });
  console.log(`  ✓ wrote ${draftId}`);
}

async function main() {
  const args = process.argv.slice(2);
  const previewIdx = args.indexOf("--preview");
  if (previewIdx !== -1) {
    const pathname = args[previewIdx + 1] ?? "/";
    const site = process.env.PREVIEW_ORIGIN ?? "http://localhost:3100";
    const { secret } = await createPreviewSecret(
      client,
      "strategy-content-script",
      "/studio",
    );
    const url = new URL("/api/draft-mode/enable", site);
    url.searchParams.set("sanity-preview-secret", secret);
    url.searchParams.set("sanity-preview-pathname", pathname);
    console.log(url.toString());
    return;
  }

  const phase = Number(args[args.indexOf("--phase") + 1]);
  const changes = PHASES[phase];
  if (!changes) {
    console.error(
      `Unknown phase. Available: ${Object.keys(PHASES).join(", ")}`,
    );
    process.exit(1);
  }
  const write = args.includes("--write");
  const overwriteDrafts = args.includes("--overwrite-drafts");
  console.log(
    `Phase ${phase}: ${write ? "WRITING drafts" : "dry run (pass --write to write drafts)"}`,
  );
  for (const change of changes)
    await applyChange(change, write, overwriteDrafts);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
