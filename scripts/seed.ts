/**
 * Seeds the Gimmir dataset with the live site content.
 *
 * Run with:  npm run seed
 *
 * Idempotent: documents use fixed ids and createOrReplace. Founder photos are
 * uploaded once and reused on re-runs (existing asset references are kept).
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";

// --- Minimal .env.local loader (no dotenv dependency) -----------------------
function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1];
      let value = m[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // ignore — env may be provided another way
  }
}
loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

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

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;

type ImageValue = {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
  alt: string;
};

/** Upload a founder photo once; reuse the asset on re-runs. */
async function founderPhoto(
  founderId: string,
  filename: string,
  alt: string,
): Promise<ImageValue> {
  const existing = await client.getDocument(founderId).catch(() => null);
  const existingRef = (existing as { photo?: { asset?: { _ref?: string } } })
    ?.photo?.asset?._ref;
  if (existingRef) {
    return { _type: "image", asset: { _type: "reference", _ref: existingRef }, alt };
  }
  const buffer = readFileSync(resolve(process.cwd(), "public/photo", filename));
  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt };
}

const ref = (id: string) => ({ _type: "reference" as const, _ref: id });

function founderCard(founderId: string, role: string, bio: string) {
  return { _key: key(), _type: "founderCard", founder: ref(founderId), role, bio };
}

const card = (title: string, body: string) => ({ _key: key(), _type: "infoCard", title, body });
const faq = (question: string, answer: string) => ({ _key: key(), _type: "faqItem", question, answer });
const fear = (fear: string, answer: string) => ({ _key: key(), _type: "fearItem", fear, answer });
const step = (tag: string, title: string, description: string) => ({ _key: key(), _type: "flowStep", tag, title, description });
const stat = (value: string, label: string) => ({ _key: key(), _type: "stat", value, label });

const NAZAR = "founderNazar";
const OLEH = "founderOleh";

async function main() {
  console.log(`Seeding ${projectId}/${dataset}…`);

  const nazarPhoto = await founderPhoto(NAZAR, "nazar-m.png", "Nazar Moroz");
  const olehPhoto = await founderPhoto(OLEH, "oleh-p.png", "Oleh Palazhii");

  const docs: Record<string, unknown>[] = [
    // --- Founders (shared identity) ---
    {
      _id: NAZAR,
      _type: "founder",
      name: "Nazar Moroz",
      role: "Founder",
      bio: "Leads product and business. Has built and shipped fitness products end to end, as an owner carrying the same risk a founder carries. On a Gimmir engagement, Nazar is the one who pressure-tests your product thinking and your plan.",
      linkedinUrl: "https://www.linkedin.com/in/nazarmoroze/",
      photo: nazarPhoto,
      order: 0,
    },
    {
      _id: OLEH,
      _type: "founder",
      name: "Oleh Palazhii",
      role: "CTO",
      bio: "Led the architecture of both the UN1T platform and Jimmy Coach. The person who can tell, in days, whether a product will hold up in years. On a Gimmir engagement, Oleh owns the technical judgment: how it is built, and whether it will scale.",
      linkedinUrl: "https://www.linkedin.com/in/oleh-palazh/",
      photo: olehPhoto,
      order: 1,
    },

    // --- Site settings ---
    {
      _id: "siteSettings",
      _type: "siteSettings",
      siteName: "Gimmir",
      description: "Product engineering for sport & fitness",
      contactEmail: "hello@gimmir.com",
      finalCtaCaption: "The founders, on the call",
      finalCtaHelper: "Free · 20 min · no pitch, no obligation.",
      flowSteps: [
        step(
          "Free · 20 min",
          "Founder review call",
          "Talk directly with Nazar and Oleh. We look at your product or plan and give you real input on the spot.",
        ),
        step(
          "Paid",
          "Scale Review + Roadmap",
          "We review your product, code, or plan against one question: will it survive growth. You get a clear roadmap of what to build, fix, and in what order.",
        ),
        step(
          "Build",
          "Dedicated team or turnkey build",
          "Delivered by the team the founders lead. Your review fee is credited toward the build.",
        ),
      ],
    },

    // --- Navigation ---
    {
      _id: "navigation",
      _type: "navigation",
      headerLinks: [
        { _key: key(), label: "Home", anchor: "#top" },
        { _key: key(), label: "Case studies", anchor: "/work" },
        { _key: key(), label: "How we work", anchor: "/how-we-work" },
        { _key: key(), label: "Founders", anchor: "/founders" },
        { _key: key(), label: "The Review", anchor: "/the-review" },
      ],
      headerCtaLabel: "Founder Review Call",
      footerTagline:
        "We build the apps and platforms behind sport and fitness brands that are scaling.",
      footerCtaLabel: "Book a founder review call",
      footerLinks: [
        { _key: key(), label: "Work", href: "/work" },
        { _key: key(), label: "How we work", href: "/how-we-work" },
        { _key: key(), label: "Founders", href: "/founders" },
        { _key: key(), label: "The Review", href: "/the-review" },
      ],
      footerNote: "Product engineering for sport & fitness",
    },

    // --- Home page ---
    {
      _id: "homePage",
      _type: "homePage",
      title: "Home",
      heroEyebrow: "Product engineering for sport & fitness",
      heroHeading: "Built by founders who have shipped",
      heroAccent: "real fitness platforms.",
      heroSubhead:
        "Gimmir builds the apps and platforms behind sport and fitness brands that are scaling. Start with a free review call with the founders who built UN1T’s franchise platform and co-founded Jimmy Coach.",
      heroPrimaryCtaLabel: "Book a founder review call",
      heroPrimaryCtaLabelShort: "Founder review call",
      heroSecondaryCtaLabel: "See our work",
      heroSecondaryCtaHref: "/how-we-work",
      marquee: [
        "franchise platform",
        "Jimmy Coach",
        "Member & booking systems",
        "iOS & Android apps",
        "AI in product",
      ],
      proofHeading: "Real fitness products, not promises.",
      proofLinkLabel: "All case studies",
      proofLinkHref: "/work",
      whoHeading: "Built for founders who take their product",
      whoAccent: "seriously.",
      whoIntro:
        "You are not looking for cheap hands. You want a team that understands what you are building and can be trusted with the part of your business your members actually touch.",
      whoRows: [
        card(
          "Founders shipping the real thing",
          "Sport and fitness founders building a product members depend on — not a prototype to demo.",
        ),
        card(
          "Multi-location operators",
          "Studios, gyms, and franchises where memberships, bookings, and payments simply have to work.",
        ),
        card(
          "Coaching apps that scale",
          "Coaching and creator-led products going from a handful of clients to thousands.",
        ),
      ],
      servicesHeading: "One team for the whole product, not just the easy parts.",
      servicesAccent: "",
      servicesItems: [
        card(
          "Member & booking platforms",
          "Subscriptions, payments, scheduling, and the back office that runs every location.",
        ),
        card(
          "Sport & fitness apps",
          "iOS and Android products your members open every day. Fast, and built to last.",
        ),
        card(
          "Community & social features",
          "Chat, groups, and the engagement layer that keeps athletes coming back.",
        ),
        card(
          "AI inside your product",
          "Personalized coaching, smart recommendations, and assistants built into real workflows, not bolted on.",
        ),
      ],
      servicesFootnote:
        "Delivered as a dedicated team that becomes part of yours, or as a fixed-scope build with a clear timeline and price.",
      foundersHeading: "You work with the people",
      foundersAccent: "who built it.",
      foundersIntro:
        "Most agencies put a senior on the sales call and juniors on your project. With Gimmir, the founders are in the room from the first call to delivery.",
      founders: [
        founderCard(
          NAZAR,
          "Founder",
          "Leads product and business. Has built and shipped fitness products end to end, as an owner carrying the same risk you do.",
        ),
        founderCard(
          OLEH,
          "CTO",
          "Led the architecture of both the UN1T platform and Jimmy Coach. The person who designs how your product holds up as it scales.",
        ),
      ],
      foundersFootnote:
        "Two founders who have already built what you are trying to build — plus the team behind them.",
      trustHeading: "Why founders trust us with the",
      trustAccent: "real thing.",
      trustCards: [
        card(
          "Senior from first call to delivery",
          "The founders are in every engagement. No bait and switch.",
        ),
        card("You own everything, day one", "Code, IP, and accounts. Always yours."),
        card(
          "A full team in weeks",
          "Our infrastructure spins up a ready team fast, so you do not lose a quarter hiring.",
        ),
        card(
          "We push back",
          "If a decision will hurt your product later, we say so. You pay for judgment, not just hands.",
        ),
      ],
      reviewCtaHeading: "Start with a conversation,",
      reviewCtaAccent: "not a contract.",
      reviewCtaIntro:
        "One path, three steps. You decide how far you go — and nothing is locked in.",
      reviewCtaButtonLabel: "Book a founder review call",
      finalCtaEyebrow: "Let’s talk",
      finalCtaHeading: "Let’s look at what you are building.",
      finalCtaIntro:
        "Tell us what you are working on. We will tell you honestly how we would approach it — and whether we are the right team for it.",
      finalCtaButtonLabel: "Book a founder review call",
      seo: {
        _type: "seo",
        metaTitle: "Gimmir — Product engineering for sport & fitness",
        metaDescription:
          "Gimmir builds the apps and platforms behind sport and fitness brands that are scaling. Start with a free review call with the founders who built UN1T’s franchise platform and co-founded Jimmy Coach.",
      },
    },

    // --- The Review page ---
    {
      _id: "reviewPage",
      _type: "reviewPage",
      title: "The Review",
      heroEyebrow: "For funded sport & fitness founders",
      heroHeading: "Find out if your product will survive growth,",
      heroAccent: "before it costs you.",
      heroSubhead:
        "In two weeks, the founders who built UN1T’s platform and Jimmy Coach review your product, code, or plan and hand you a clear roadmap of what holds up, what breaks at scale, and what to do about it.",
      heroCtaLabel: "Book a free review call",
      heroCtaHelper: "20-minute call with the founders. No pitch, no obligation.",
      marquee: [
        "Memberships & billing",
        "Payments at scale",
        "Booking under load",
        "Multi-location data",
        "Security & DD",
        "AI where it pays",
      ],
      problemHeading: "Most fitness products break at exactly the wrong moment.",
      problemAccent: "",
      problemBody:
        "The app works fine with 500 members. Then you scale, add locations, raise a round, and the cracks show: payments fail under load, bookings double-charge, the data model can’t handle a second franchise, and an investor’s technical due diligence finds things you did not know were there.",
      problemCallout:
        "By the time it shows, fixing it is a rewrite. The cheapest moment to find these problems is now, before they cost you members, money, or a round.",
      whatHeading: "A two-week expert review of whether your product is",
      whatAccent: "built to scale.",
      whatIntro:
        "This is not a sales call dressed up as an audit. Two founders who have shipped real fitness platforms go deep on your product against one question: will this survive growth.",
      focusLabel:
        "We look at what actually breaks sport & fitness products at scale",
      focusItems: [
        "Memberships, subscriptions & billing",
        "Payments, fees & payouts across locations",
        "Booking & scheduling under real load",
        "The data model behind multiple studios or franchises",
        "Security, access & what investor due diligence finds",
        "Where AI adds real value, and where it is a distraction",
      ],
      deliverablesHeading:
        "You walk away with a roadmap, whether or not you build with us.",
      deliverablesAccent: "",
      deliverablesIntro: "A clear document plus a live walkthrough session.",
      deliverablesItems: [
        card(
          "Scale assessment",
          "What in your product holds up, and what will break as you grow, in plain language.",
        ),
        card(
          "Risk map",
          "The specific issues that will cost you, ranked by how much damage they do and how soon.",
        ),
        card(
          "Priority build plan",
          "What to build and fix, in what order, with rough effort for each.",
        ),
        card(
          "Cost of doing nothing",
          "What each gap is likely to cost in money, members, or a stalled round.",
        ),
        card(
          "Recommended path",
          "Exactly how we would execute it, if you choose to build with us.",
        ),
      ],
      deliverablesClosing:
        "This is the same thinking that helped UN1T move off a third-party platform onto their own, and save tens of thousands of dollars a month.",
      foundersHeading: "The people who built it,",
      foundersAccent: "not a sales team.",
      founders: [
        founderCard(
          NAZAR,
          "Founder — product & business",
          "Product and business. Has built and shipped fitness products end to end, as an owner.",
        ),
        founderCard(
          OLEH,
          "CTO — architecture",
          "Led the architecture of both the UN1T platform and Jimmy Coach. The person who can tell in days whether your product will hold up in years.",
        ),
      ],
      foundersFootnote:
        "You are not paying for a report a junior wrote. You are paying for the judgment of two founders who have already built what you are building.",
      processHeading: "Three steps, low risk.",
      processAccent: "",
      pricingEyebrow: "One flat fee, credited toward your build",
      pricingPrice: "$4,500",
      pricingPriceSuffix: "fixed",
      pricingLead:
        "One to two weeks. Led by both founders. You keep the roadmap either way.",
      pricingNote:
        "If you build with us, the full fee is credited toward your first invoice. So if the review leads to a build, it effectively costs you nothing.",
      pricingButtonLabel: "Book a free review call",
      pricingIncludedLabel: "Every review includes",
      pricingIncluded: [
        "Scale assessment",
        "Risk map",
        "Priority build plan",
        "Cost of doing nothing",
        "Recommended path",
        "Live roadmap walkthrough",
      ],
      fitHeading: "This is a fit if…",
      fitChecks: [
        "You have a funded startup or a multi-location fitness brand with real revenue.",
        "You already have a product, or a serious plan and budget to build one.",
        "You care more about getting it right than getting it cheap.",
      ],
      fitNotLabel: "Honestly, not a fit if",
      fitNotBody:
        "You are at idea stage with no budget, or you are shopping purely on hourly rate. That is fine — we are just not the right team for it.",
      proofHeading: "Built by people with real products behind them.",
      proofAccent: "",
      faqHeading: "Questions, answered straight.",
      faqAccent: "",
      faqItems: [
        faq(
          "Will you just tell me to rebuild everything?",
          "No. We tell you the minimum that actually matters, in priority order. Sometimes the honest answer is “this is solid, here are the three things to watch.”",
        ),
        faq(
          "Do I have to build with you afterward?",
          "No. The roadmap is yours to keep and act on however you want. If you do build with us, the review fee is credited.",
        ),
        faq(
          "Is my code and IP safe?",
          "Yes. We sign an NDA before we see anything, and you own everything, start to finish.",
        ),
        faq(
          "Who actually does the review?",
          "The founders, Nazar and Oleh. Not a junior, not an outsourced analyst.",
        ),
        faq(
          "How long does it take?",
          "One to two weeks from kickoff to the roadmap walkthrough.",
        ),
      ],
      finalCtaEyebrow: "Find out before it costs you",
      finalCtaHeading: "Find out before it costs you.",
      finalCtaIntro:
        "The problems that sink fitness products are cheapest to fix today. Start with a free call with the founders.",
      finalCtaButtonLabel: "Book a free review call",
      seo: {
        _type: "seo",
        metaTitle: "The Review",
        metaDescription:
          "A two-week expert review of whether your sport or fitness product is built to scale. The founders behind UN1T and Jimmy Coach hand you a clear roadmap.",
      },
    },

    // --- How we work page ---
    {
      _id: "howWeWorkPage",
      _type: "howWeWorkPage",
      title: "How we work",
      heroEyebrow: "How we work",
      heroHeading: "Outsourcing, without the part",
      heroAccent: "everyone hates.",
      heroSubhead:
        "You have probably been burned, or watched a friend get burned: the senior who vanishes after the contract is signed, the juniors you never agreed to, the code you somehow cannot touch. Here is how Gimmir is different, point by point.",
      heroCtaLabel: "Book a founder review call",
      heroCtaHelper: "20-minute call with the founders. No pitch, no obligation.",
      marquee: [
        "Founders in every project",
        "IP yours from day one",
        "Direct access to seniors",
        "We push back",
        "Built to scale",
        "QA is our job",
      ],
      fearsHeading: "The fears you have are the right ones.",
      fearsAccent: "Here is how we kill each.",
      fearsAnswerLabel: "How we kill it",
      fears: [
        fear(
          "Senior on the sales call, juniors on the project.",
          "The founders, Nazar and Oleh, are in every engagement, from the first call through delivery. You meet the people who actually build, and they stay your point of contact. No bait and switch.",
        ),
        fear(
          "They delivered, then disappeared.",
          "We build products to live and grow, not to hand off and vanish. We stay through launch and scale, and we design the architecture so your next change is a change, not a rewrite.",
        ),
        fear(
          "I don’t really own what they built.",
          "Code, IP, repositories, and accounts are yours from day one. Not at the end. Not on final payment. Day one. You are never locked in to us.",
        ),
        fear(
          "I can never reach the actual developers.",
          "No manager wall, no telephone game. You talk directly to the engineers writing your code, with real overlap hours and a direct line, not a ticket that gets answered tomorrow.",
        ),
        fear(
          "We were in different timezones and lost half a day on every question.",
          "We work with deliberate overlap with your hours and treat async communication as a skill, not an excuse. You are never sitting a full day waiting on an answer.",
        ),
        fear(
          "Every sprint we fixed the same bugs and rebuilt the same things.",
          "We scope honestly and we push back. If a feature or a plan will hurt you later, we tell you before we build it. You are paying for judgment, not just hours.",
        ),
        fear(
          "QA was basically me.",
          "Quality is our job, not yours. Testing and review are part of how we ship, not a surprise you discover is missing after launch.",
        ),
      ],
      runsHeading: "What working with us looks like.",
      runsAccent: "",
      runsSteps: [
        card(
          "Review",
          "We look at your product or plan and agree on what actually matters. Often this is the Scale Review.",
        ),
        card(
          "Roadmap",
          "A clear plan: what to build, in what order, with honest effort for each piece.",
        ),
        card(
          "Team in weeks, not months",
          "Our infrastructure spins up a ready team fast, so you do not lose a quarter trying to hire.",
        ),
        card(
          "Build with direct access",
          "The founders stay involved, you talk to the engineers directly, and you see working software in regular demos, not status reports.",
        ),
        card(
          "Yours, throughout",
          "Code, IP, and accounts stay yours the whole way. Built to scale with you, never to lock you in.",
        ),
      ],
      principlesHeading: "What never changes.",
      principlesAccent: "",
      principlesItems: [
        "The founders are in every project.",
        "Direct access to the senior engineers building your product.",
        "Your IP and accounts are yours from day one.",
        "We push back when a decision will cost you later.",
        "Everything is built to survive growth.",
      ],
      finalCtaEyebrow: "Talk to the founders",
      finalCtaHeading: "Talk to the founders, not a sales team.",
      finalCtaIntro:
        "The fastest way to know if we are the right team is to talk to the people who would actually build with you.",
      finalCtaButtonLabel: "Book a founder review call",
      seo: {
        _type: "seo",
        metaTitle: "How we work",
        metaDescription:
          "Outsourcing without the part everyone hates. The founders are in every engagement, you own your code and IP from day one, and you talk directly to the engineers building your product.",
      },
    },

    // --- Founders page ---
    {
      _id: "foundersPage",
      _type: "foundersPage",
      title: "Founders",
      heroEyebrow: "About Gimmir",
      heroHeading: "We build fitness products because we have",
      heroAccent: "built our own.",
      heroSubhead:
        "Gimmir is a product studio led by two founders, Nazar Moroz and Oleh Palazhii. We have built and shipped real fitness platforms as owners, and we now do it for founders who need software that holds up as they grow.",
      heroCtaLabel: "Book a founder review call",
      heroCtaHelper: "20-minute call with the founders. No pitch, no obligation.",
      storyHeading: "Most fitness software is built by people who have",
      storyAccent: "never run a fitness business.",
      storyDifferenceLabel: "The difference",
      storyDifferenceBig: "We have.",
      storyDifferenceSub: "As owners, not contractors.",
      storyStats: [
        stat(
          "10+",
          "UN1T franchises worldwide, moved off a third-party system onto their own platform",
        ),
        stat("100+", "Jimmy Coach coaches in the first month, built from zero"),
      ],
      storyBody1:
        "We built the platform behind UN1T, a global fitness franchise, and moved it off a third-party system onto its own app and back office, across 10+ franchises worldwide. We co-founded Jimmy Coach and built it from zero into a coaching platform that reached 100+ active coaches in its first month.",
      storyBody2:
        "Building those products as owners, not contractors, taught us what actually breaks fitness software at scale, and how few teams can be trusted with it. We started Gimmir to be that team for other founders: senior, honest, and on the hook for the result, not the hours.",
      storyOriginLabel: "Founders’ origin",
      storyOriginCaption: "In Nazar & Oleh’s words",
      storyOriginBody:
        "Two to three sentences of your real origin: how you and Oleh started working together, how many years, what you did before Gimmir, and why sport and fitness specifically. This is the one paragraph only you can write, and the one that makes this page convert.",
      believeHeading: "What we believe.",
      believeAccent: "",
      believeItems: [
        card(
          "Judgment over hours.",
          "You are not buying time. You are buying decisions that hold up two years from now.",
        ),
        card(
          "We build to survive growth.",
          "Anyone can ship a demo. We build the version that still works after you scale, add locations, and raise.",
        ),
        card(
          "Specific beats generic.",
          "We build for sport and fitness, because we have shipped real products there. We would rather be the obvious choice for a few than a maybe for everyone.",
        ),
        card(
          "The truth, even when it costs us.",
          "We will tell you to cut a feature, change a plan, or not hire us, if that is the honest call.",
        ),
      ],
      believeFinaleTitle: "You own everything.",
      believeFinaleBody: "Your code, your IP, your accounts, yours from day one.",
      peopleHeading: "You work with us, directly.",
      peopleAccent: "",
      founders: [
        founderCard(
          NAZAR,
          "Founder",
          "Leads product and business. Has built and shipped fitness products end to end, as an owner carrying the same risk a founder carries. On a Gimmir engagement, Nazar is the one who pressure-tests your product thinking and your plan.",
        ),
        founderCard(
          OLEH,
          "CTO",
          "Led the architecture of both the UN1T platform and Jimmy Coach. The person who can tell, in days, whether a product will hold up in years. On a Gimmir engagement, Oleh owns the technical judgment: how it is built, and whether it will scale.",
        ),
      ],
      peopleFootnote:
        "Two founders who have already built what you are trying to build. On every engagement, one or both of us is in the room.",
      studioHeading: "Two founders, a full team behind them.",
      studioAccent: "",
      studioBody:
        "Behind the two of us is a team of senior engineers and designers, and the infrastructure to spin up a dedicated team for you in weeks, not months. We are a Ukrainian studio, and that engineering talent is a large part of why founders in the US and UK keep building with us.",
      studioTeamCaption: "Nazar & Oleh, plus the senior team behind every build.",
      studioTeamSizeBody:
        "How you want to state it, kept honest — e.g. “a team of 15+ engineers and designers.” No global offices you do not have; it is the first thing a careful buyer checks.",
      finalCtaEyebrow: "Let’s talk",
      finalCtaHeading: "Let’s look at what you are building.",
      finalCtaIntro:
        "The best way to know if we are the right team is to talk to us directly.",
      finalCtaButtonLabel: "Book a founder review call",
      seo: {
        _type: "seo",
        metaTitle: "Founders",
        metaDescription:
          "Gimmir is led by two founders, Nazar Moroz and Oleh Palazhii, who built and shipped the platforms behind UN1T and Jimmy Coach as owners. Meet the people you work with directly.",
      },
    },
  ];

  const tx = docs.reduce((t, doc) => t.createOrReplace(doc as never), client.transaction());
  await tx.commit();
  console.log(`✔ Seeded ${docs.length} documents.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
