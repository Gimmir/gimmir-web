/**
 * Seeds the Gimmir dataset with sample (placeholder) content.
 *
 * Run with:  npm run seed
 *
 * All copy and people are illustrative and meant to be replaced by the
 * content team in the Studio. Re-running is safe (createOrReplace).
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

/** Build a Portable Text body from an array of paragraph strings. */
function pt(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  }));
}

async function uploadImage(
  url: string,
  filename: string,
  alt: string,
): Promise<Record<string, unknown> | undefined> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, { filename });
    console.log(`  ✓ uploaded ${filename}`);
    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt,
    };
  } catch (err) {
    console.warn(`  ⚠ image ${filename} skipped: ${(err as Error).message}`);
    return undefined;
  }
}

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

async function seed() {
  console.log(`Seeding ${projectId}/${dataset}…`);

  console.log("Uploading images…");
  const [un1tCover, jimmyCover, danielPhoto, sofiaPhoto, avatar1, avatar2] =
    await Promise.all([
      uploadImage(U("1534438327276-14e5300c3a48"), "un1t-cover.jpg", "UN1T studio floor"),
      uploadImage(U("1517836357463-d25dfeac3438"), "jimmy-cover.jpg", "Athlete training with a coaching app"),
      uploadImage(U("1507003211169-0a1dd7228f2d", 800), "daniel.jpg", "Daniel Okoye"),
      uploadImage(U("1438761681033-6461ffad8d80", 800), "sofia.jpg", "Sofia Almeida"),
      uploadImage(U("1500648767791-00dcc994a43e", 400), "alex.jpg", "Alex Carter"),
      uploadImage(U("1544005313-94ddf0286df2", 400), "jordan.jpg", "Jordan Hale"),
    ]);

  console.log("Writing documents…");

  // --- Founders ---
  await client.createOrReplace({
    _id: "founderDaniel",
    _type: "founder",
    name: "Daniel Okoye",
    role: "Co-founder · Product & Strategy",
    bio: "Daniel has led product at two venture-backed health businesses through Series A and B. He pressure-tests scope so founders build the right thing first.",
    ...(danielPhoto ? { photo: danielPhoto } : {}),
    order: 0,
    socials: [
      { _key: key(), platform: "linkedin", url: "https://www.linkedin.com/in/example-daniel" },
      { _key: key(), platform: "x", url: "https://x.com/example_daniel" },
    ],
  });

  await client.createOrReplace({
    _id: "founderSofia",
    _type: "founder",
    name: "Sofia Almeida",
    role: "Co-founder · Engineering",
    bio: "Sofia has built and handed over systems that passed technical due diligence at acquisition. She cares as much about the next engineer's first read as today's release.",
    ...(sofiaPhoto ? { photo: sofiaPhoto } : {}),
    order: 1,
    socials: [
      { _key: key(), platform: "linkedin", url: "https://www.linkedin.com/in/example-sofia" },
      { _key: key(), platform: "github", url: "https://github.com/example-sofia" },
    ],
  });

  // --- Case studies ---
  await client.createOrReplace({
    _id: "un1t",
    _type: "caseStudy",
    title: "UN1T",
    client: "UN1T",
    slug: { _type: "slug", current: "un1t" },
    industry: "Boutique fitness franchise",
    ...(un1tCover ? { coverImage: un1tCover } : {}),
    excerpt:
      "A booking and membership platform that scaled UN1T from a single London studio to a multi-location franchise — without re-platforming.",
    problem: pt([
      "UN1T had product-market fit and a waiting list of franchisees, but the business ran on a patchwork of off-the-shelf tools that couldn't talk to each other. Every new location multiplied the operational drag.",
      "They needed a single platform to launch studios fast, manage memberships and class bookings, and give HQ real visibility — built to survive the scrutiny of franchise partners and future investors.",
    ]),
    solution: pt([
      "We embedded with the UN1T team and shipped a unified booking and membership platform in six weeks, then iterated weekly alongside real studios.",
      "A multi-tenant architecture lets HQ spin up a new location in minutes, with Stripe-powered billing, class scheduling, and a member app that feels native to the brand.",
    ]),
    result: pt([
      "UN1T scaled past 40 studios on the same codebase, with member retention up 3.2× versus their previous tooling and 99.98% uptime through peak booking windows.",
      "When investors ran technical due diligence, the platform was flagged as a strength — not a risk.",
    ]),
    metrics: [
      { _key: key(), value: "3.2×", label: "Member retention" },
      { _key: key(), value: "40+", label: "Studios live" },
      { _key: key(), value: "99.98%", label: "Uptime" },
      { _key: key(), value: "6 wk", label: "To launch" },
    ],
    technologies: ["Next.js", "TypeScript", "Sanity", "Stripe", "PostgreSQL", "Vercel"],
    links: [{ _key: key(), label: "Visit UN1T", href: "https://un1t.com" }],
    publishedAt: "2026-03-12T09:00:00.000Z",
    featured: true,
    seo: {
      metaTitle: "UN1T — scaling a boutique fitness franchise · Gimmir",
      metaDescription:
        "How Gimmir built the booking and membership platform that scaled UN1T from one studio to a 40+ location franchise.",
      noIndex: false,
    },
  });

  await client.createOrReplace({
    _id: "jimmyCoach",
    _type: "caseStudy",
    title: "Jimmy Coach",
    client: "Jimmy",
    slug: { _type: "slug", current: "jimmy-coach" },
    industry: "Coaching platform",
    ...(jimmyCover ? { coverImage: jimmyCover } : {}),
    excerpt:
      "A coaching app that turns one coach's method into a scalable product — programmes, payments and retention in one place.",
    problem: pt([
      "Jimmy had built a devoted following but hit the ceiling of what one coach can deliver by hand. Spreadsheets, DMs and manual invoices capped both revenue and quality.",
      "He needed to productise his method without losing the personal feel his members paid for.",
    ]),
    solution: pt([
      "We designed and built a cross-platform coaching app: structured programmes, habit tracking, in-app messaging and frictionless subscriptions.",
      "Content lives in a CMS Jimmy controls, so he ships new programmes himself — no developer in the loop.",
    ]),
    result: pt([
      "Jimmy grew to 12,000 active members with revenue up 148%, a 4.9-star rating, and hours of his week handed back from admin to coaching.",
    ]),
    metrics: [
      { _key: key(), value: "+148%", label: "Coach revenue" },
      { _key: key(), value: "12k", label: "Active members" },
      { _key: key(), value: "4.9★", label: "App rating" },
    ],
    technologies: ["React Native", "Next.js", "Sanity", "Stripe", "Supabase"],
    links: [{ _key: key(), label: "Visit Jimmy", href: "https://jimmycoach.com" }],
    publishedAt: "2026-05-20T09:00:00.000Z",
    featured: true,
    seo: {
      metaTitle: "Jimmy Coach — productising a coaching method · Gimmir",
      metaDescription:
        "How Gimmir turned one coach's method into a scalable app: +148% revenue and 12k active members.",
      noIndex: false,
    },
  });

  // --- Testimonials ---
  await client.createOrReplace({
    _id: "testimonialUn1t",
    _type: "testimonial",
    quote:
      "Gimmir built the platform our whole franchise runs on. When investors did technical due diligence, it didn't just pass — it was called out as a strength.",
    authorName: "Alex Carter",
    authorRole: "Co-founder & CEO",
    authorCompany: "UN1T",
    ...(avatar1 ? { authorPhoto: avatar1 } : {}),
    relatedCaseStudy: { _type: "reference", _ref: "un1t" },
    order: 0,
  });

  await client.createOrReplace({
    _id: "testimonialJimmy",
    _type: "testimonial",
    quote:
      "They turned my coaching method into a real product in weeks. Revenue is up, and I finally have software I'm not embarrassed to show a CTO.",
    authorName: "Jordan Hale",
    authorRole: "Founder",
    authorCompany: "Jimmy Coach",
    ...(avatar2 ? { authorPhoto: avatar2 } : {}),
    relatedCaseStudy: { _type: "reference", _ref: "jimmyCoach" },
    order: 1,
  });

  // --- Site settings ---
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Gimmir",
    description:
      "Gimmir is a product engineering studio building software for sport, fitness, wellness and coaching brands — engineered to scale through growth and survive due diligence.",
    location: "London · New York",
    contactEmail: "hello@gimmir.com",
    socials: [
      { _key: key(), platform: "linkedin", url: "https://www.linkedin.com/company/gimmir" },
      { _key: key(), platform: "x", url: "https://x.com/gimmir" },
    ],
    seo: {
      metaTitle: "Gimmir — Software that survives growth and due diligence",
      metaDescription:
        "Product engineering studio for sport, fitness, wellness and coaching brands. We build software that scales through growth and stands up to due diligence.",
      noIndex: false,
    },
    analytics: { provider: "none" },
  });

  // --- Navigation ---
  await client.createOrReplace({
    _id: "navigation",
    _type: "navigation",
    headerLinks: [
      { _key: key(), label: "Work", anchor: "#work" },
      { _key: key(), label: "How we work", anchor: "#process" },
      { _key: key(), label: "Founders", anchor: "#founders" },
    ],
    headerCta: { _type: "cta", label: "Book a review", href: "#start" },
    footerTagline: "Product engineering for brands that intend to scale.",
    footerLinks: [
      { _key: key(), label: "Work", href: "#work" },
      { _key: key(), label: "How we work", href: "#process" },
      { _key: key(), label: "Founders", href: "#founders" },
      { _key: key(), label: "Studio", href: "/studio" },
    ],
    footerNote: "© Gimmir Ltd.",
  });

  // --- Home page (page builder) ---
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    title: "Home",
    pageBuilder: [
      {
        _type: "heroSection",
        _key: key(),
        anchorId: "top",
        eyebrow: "Product engineering studio",
        headline: "Software that survives growth and",
        accent: "due diligence.",
        subhead:
          "We design and build the products that funded fitness, wellness and coaching brands stake their growth on — engineered to scale through hypergrowth and stand up to investor scrutiny.",
        primaryCta: { _type: "cta", label: "Book a founder review", href: "#start" },
        secondaryCta: { _type: "cta", label: "See our work", href: "#work" },
        stats: [
          { _key: key(), value: "3.2×", label: "Avg. retention lift" },
          { _key: key(), value: "<2 wk", label: "To first release" },
          { _key: key(), value: "100%", label: "Due-diligence pass rate" },
          { _key: key(), value: "2", label: "Products in market" },
        ],
      },
      {
        _type: "caseStudiesSection",
        _key: key(),
        anchorId: "work",
        eyebrow: "Selected work",
        heading: "Proof, not promises.",
        intro:
          "The clearest signal of how we work is what we've shipped. Two products, built to carry real businesses.",
        items: [
          { _type: "reference", _key: key(), _ref: "un1t" },
          { _type: "reference", _key: key(), _ref: "jimmyCoach" },
        ],
      },
      {
        _type: "processSection",
        _key: key(),
        anchorId: "process",
        eyebrow: "How we work",
        heading: "A short path from idea to durable product.",
        intro:
          "We embed like a founding team, ship in weeks, and leave you with software your future CTO and your investors' technical advisors will respect.",
        steps: [
          {
            _key: key(),
            title: "Founder review",
            description:
              "We pressure-test your product thesis, scope and technical risk in a focused working session — free, no pitch.",
          },
          {
            _key: key(),
            title: "Architecture & plan",
            description:
              "A pragmatic architecture and roadmap designed for the scale you're actually heading toward, not vanity scale.",
          },
          {
            _key: key(),
            title: "Build in the open",
            description:
              "A small senior team, weekly releases, your stakeholders in the loop. You see progress, not status decks.",
          },
          {
            _key: key(),
            title: "Handover that holds",
            description:
              "Documented, tested and owned by you — code that passes due diligence and the next engineer's first read.",
          },
        ],
      },
      {
        _type: "testimonialSection",
        _key: key(),
        anchorId: "voices",
        eyebrow: "What founders say",
        heading: "Trusted where it counts.",
        testimonials: [
          { _type: "reference", _key: key(), _ref: "testimonialUn1t" },
          { _type: "reference", _key: key(), _ref: "testimonialJimmy" },
        ],
      },
      {
        _type: "foundersSection",
        _key: key(),
        anchorId: "founders",
        eyebrow: "Founders",
        heading: "Built by people who've shipped and scaled.",
        intro:
          "Gimmir is a small senior studio. You work directly with the people writing the code and making the calls.",
        founders: [
          { _type: "reference", _key: key(), _ref: "founderDaniel" },
          { _type: "reference", _key: key(), _ref: "founderSofia" },
        ],
      },
      {
        _type: "reviewCtaSection",
        _key: key(),
        anchorId: "start",
        eyebrow: "The Review",
        heading: "Get a free founder review.",
        body: "A focused 45-minute session where we pressure-test your product, scope and technical risk — and tell you the truth, whether or not we end up working together.",
        bullets: [
          "An honest read on your biggest product and technical risks",
          "A pragmatic build-vs-buy and architecture recommendation",
          "A rough scope and timeline to your next milestone",
          "No pitch, no obligation",
        ],
        formHeading: "Request your founder review",
        formNote:
          "We reply within two business days. Your details stay between us — we never share or sell them.",
        submitLabel: "Request review",
        successHeading: "Thanks — we'll be in touch.",
        successMessage:
          "We review every request personally and reply within two business days.",
      },
    ],
    seo: {
      metaTitle: "Gimmir — Software that survives growth and due diligence",
      metaDescription:
        "Product engineering studio for sport, fitness, wellness and coaching brands. We build software that scales through growth and stands up to due diligence.",
      noIndex: false,
    },
  });

  console.log("✓ Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
