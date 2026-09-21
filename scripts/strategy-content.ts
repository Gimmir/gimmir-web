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

type Doc = Record<string, unknown>;

type Change = {
  id: string;
  /** Fields to set; a function receives the published document. */
  set: Doc | ((published: Doc) => Doc);
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

/** Founder cards with a new role / bio per founder, keeping keys and refs. */
const withRoles = (
  cards: unknown,
  byFounder: Record<string, { role?: string; bio?: string }>,
) =>
  ((cards as Doc[] | undefined) ?? []).map((card) => {
    const ref = (card.founder as { _ref?: string } | undefined)?._ref ?? "";
    return { ...card, ...byFounder[ref] };
  });

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
  2: [
    {
      id: "homePage",
      set: (published) => ({
        heroEyebrow: "Fitness & wellness platforms, founder-led",
        heroHeading: "Fitness platforms your members love,",
        heroAccent: "and you actually own.",
        heroSubhead:
          "We’re Nazar and Oleh. We build member apps, coaching platforms and back offices for fitness and wellness businesses, then hand you the keys. Code, repos and app-store listings in your name from day one.",
        heroSecondaryCtaLabel: "See the work",
        heroSecondaryCtaHref: "/work",
        heroTrustStrip: [
          "Real apps in the App Store & Google Play",
          "Fixed prices",
          "You own everything",
        ],
        problemHeading: "Renting your platform is quietly expensive.",
        problemAccent: "",
        problemBody:
          "Most operators we meet pay every month for a platform they’ll never own, and a slice of every member payment on top. The fees scale with your success, not your costs. Product founders have the mirror-image problem: an MVP built by whoever was cheapest, that breaks the moment real users arrive. We fix both. You end up with software that’s yours, built to last.",
        proofHeading: "Two builds. Real numbers.",
        proofLinkLabel: "See all work",
        proofLinkHref: "/work",
        foundersHeading: "You talk to the people",
        foundersAccent: "who build it.",
        foundersIntro:
          "No account managers, no handoffs. Nazar scopes and sells; Oleh owns the architecture and delivery. Behind us is a small senior team we’ve shipped with before. You get the focus of a two-person studio and the depth of a team that’s done this.",
        foundersBullets: [
          "Your first call is with a founder, and so is the last.",
          "Fixed prices, agreed before we start.",
          "Code, repos, cloud and app-store accounts in your name from day one.",
          "We build in fitness and wellness every day. We know your problems before you describe them.",
        ],
        founders: withRoles(published.founders, {
          founderNazar: { role: "Founder · product & business" },
          founderOleh: { role: "CTO · architecture & delivery" },
        }),
        offersHeading: "Ways to start.",
        offersIntro:
          "Both paths begin with a free call and a fixed-price diagnostic, so you know what you’re buying before you commit to a build.",
        faqHeading: "Questions, answered straight.",
        faqItems: faqs("hq", [
          [
            "Who is Gimmir for?",
            "Fitness operators with 8+ locations who want their own platform, and funded fitness or wellness product founders who need a V1 built right the first time.",
          ],
          [
            "Do you only do fitness?",
            "Fitness is our core. We also build wellness and prevention apps, and we take on select adjacent work. We’ll always tell you honestly if something isn’t our lane.",
          ],
          [
            "Who owns the code and accounts?",
            "You do, from day one. Code, repositories, cloud accounts and app-store listings are in your name.",
          ],
          [
            "It’s just two of you?",
            "Two founders you deal with directly, plus a core team of ten senior engineers and designers we’ve shipped with before. How we handle continuity is on the How we work page.",
          ],
        ]),
        finalCtaEyebrow: "Let’s talk",
        finalCtaHeading: "Let’s talk about what you’re building.",
        finalCtaIntro:
          "No pitch deck. If we’re not the right team, we’ll tell you.",
        seo: {
          _type: "seo",
          metaTitle: "Fitness & Wellness App Development Company · Gimmir",
          metaDescription:
            "Member apps, coaching platforms and back offices for fitness operators and wellness founders. Your code and app-store listings from day one. Talk to Nazar & Oleh.",
        },
      }),
      unset: [
        "heroPrimaryCtaLabel",
        "heroPrimaryCtaLabelShort",
        "marquee",
        "whoHeading",
        "whoAccent",
        "whoIntro",
        "whoRows",
        "servicesHeading",
        "servicesAccent",
        "servicesItems",
        "servicesFootnote",
        "trustHeading",
        "trustAccent",
        "trustCards",
        "reviewCtaHeading",
        "reviewCtaAccent",
        "reviewCtaIntro",
        "reviewCtaButtonLabel",
        "finalCtaButtonLabel",
      ],
    },
    {
      id: "howWeWorkPage",
      set: {
        heroEyebrow: "How we work",
        heroHeading: "How we work, and how we de-risk",
        heroAccent: "working with two founders.",
        heroSubhead:
          "Fixed prices. Your ownership. Straight answers about what happens if one of us is unavailable.",
        runsHeading: "From first call to live platform.",
        runsAccent: "",
        runsSteps: cards("rs", [
          [
            "A call with a founder",
            "Nazar if you run fitness locations, Nazar and Oleh if you’re building a product. Free, and no pitch deck.",
          ],
          [
            "A fixed-scope diagnostic",
            "The Platform Fee Teardown or The Review: a written answer before any build is on the table.",
          ],
          [
            "A written plan and a fixed price",
            "You see the plan, the milestones and the price before you commit to anything.",
          ],
          [
            "A build in milestones you approve",
            "The founders stay involved, you talk to the engineers directly, and you see working software in regular demos, not status reports.",
          ],
          [
            "Care and roadmap once you’re live",
            "Ongoing build and maintenance with us, or a clean handover to your own team. Your call.",
          ],
        ]),
        principlesHeading: "It’s yours from day one, not at the end.",
        principlesAccent: "",
        principlesItems: [
          "Code and repositories in your name.",
          "Cloud accounts in your name.",
          "App-store listings in your name.",
          "No lock-in: you can take it to any team, any time.",
        ],
        twoPersonHeading: "“It’s just two of you. What if something happens?”",
        twoPersonBody:
          "Fair question; we’d ask it too. Here’s the honest answer. You deal with Nazar and Oleh directly, but you’re not depending on two heads. A small senior team we’ve shipped with before works on the builds. Everything lives in your accounts, not ours. We keep runbooks and documentation so any competent engineer can pick up the work. If one of us is unavailable, the other and the team keep going, and you’re never locked out of your own product.",
        twoPersonBullets: [
          "A core team you can see, not hidden behind “the studio”.",
          "IP and accounts in your name, always.",
          "Runbooks and documentation as standard, not an add-on.",
          "No single point of failure on your product.",
        ],
        pricingHeading:
          "Fixed prices, because surprises aren’t a business model.",
        pricingBody:
          "We quote a fixed price before we start. Our entry offers are productized, and money-back where we can promise an outcome. You always know what you’re paying and what you’re getting.",
        seo: {
          _type: "seo",
          metaTitle: "How We Work: Fixed Prices, Your Code from Day One",
          metaDescription:
            "How Gimmir works: fixed-price milestones, code and accounts in your name from day one, a senior team behind two founders, and runbooks so nothing lives in one head.",
        },
      },
      unset: ["heroCtaLabel", "heroCtaHelper", "finalCtaButtonLabel"],
    },
    {
      id: "foundersPage",
      // The origin story and "What we believe" stay as they are until Nazar
      // approves the fitness-and-wellness wording.
      set: (published) => ({
        heroEyebrow: "Nazar & Oleh",
        heroHeading: "Nazar & Oleh.",
        heroAccent: "You’ll work with us directly.",
        heroSubhead:
          "Two founders, one small senior team, and a rule we don’t break: the people who sell you the work are the people who build it.",
        storyBody1:
          "We built the platform behind UN1T, a London-founded boutique fitness franchise, and moved it off a white-label platform onto its own app and back office across 10+ locations. We co-founded Jimmy Coach and built it from zero into a coaching platform that reached 100+ active coaches in its first month.",
        founders: withRoles(published.founders, {
          founderNazar: {
            role: "Founder · product & business",
            bio: "I take the first call and the last. I scope what you need, price it, and make sure what we build actually moves your business. I’ve built and shipped fitness products end to end, as an owner. If you run a fitness business, you’ll deal with me.",
          },
          founderOleh: {
            role: "CTO · architecture & delivery",
            bio: "I own how it’s built and whether it lasts: architecture, code quality, delivery. I led the architecture of both the UN1T platform and Jimmy Coach. If you’re a product founder, we’ll talk CTO-to-CTO.",
          },
        }),
        studioBody:
          "Behind the two of us is a core team of senior engineers and designers we have shipped with before. We’re Ukrainian-founded and work across the EU. Gimmir LLC is registered in Delaware, USA, so you sign with a US company and work with a European team in your working hours.",
        studioTeamSizeBody:
          "Around ten senior engineers and designers we’ve shipped with before, brought onto builds as they’re needed. You get a small studio’s focus with a proven team’s depth.",
        seo: {
          _type: "seo",
          metaTitle: "Nazar & Oleh: the Founders Who Build Your Platform",
          metaDescription:
            "Meet Nazar Moroz and Oleh Palazhii, Gimmir’s founders. Nazar leads product and business, Oleh architecture and delivery. You work with both of us directly.",
        },
      }),
      unset: ["heroCtaLabel", "heroCtaHelper", "finalCtaButtonLabel"],
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

  const set =
    typeof change.set === "function" ? change.set(published) : change.set;
  const next: Record<string, unknown> = { ...strip(published), ...set };
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
