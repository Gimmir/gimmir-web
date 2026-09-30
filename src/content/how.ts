/**
 * /how-we-work, V2 (doc 09 §3.8). The process names match the rest of the
 * site (Nazar, 2026-09-30): the diagnostic is The Review (a platform check
 * for fitness brands), and the Blueprint is the plan it produces. No prices
 * or ranges anywhere. Everything marked DRAFT is for Nazar to edit; the
 * straight answers are the approved ones in `src/lib/trust-answers.ts`.
 */
export const how = {
  meta: {
    title: "How We Work: Fixed Price, Your Code from Day One",
    description:
      "No black box: how a Gimmir build runs from The Review to launch and care, how we price it by milestone with no hourly billing, and why everything is yours from day one.",
  },

  // Nazar's pick o1 (2026-09-30): the open box, the process under it
  hero: {
    label: "How we work",
    title: "No black box.",
    // DRAFT
    lede: "How a build runs, how we price it, and what stays yours. Nothing happens where you can’t see it.",
    // what flies out of the open box
    contents: ["Plan", "Price", "Docs", "Code"],
  },

  // doc 09: Diagnostic → Blueprint → Build in milestones → Launch → Care.
  // DRAFT: bodies and the "You see" lines
  process: {
    label: "How a build runs",
    steps: [
      {
        name: "The Review",
        body: "We look at your product or plan and agree on what actually matters.",
        see: "A written report",
      },
      {
        name: "Blueprint",
        body: "What to build, in what order, and a fixed price for each milestone.",
        see: "The plan and the price",
      },
      {
        name: "Build in milestones",
        body: "A senior team we’ve shipped with before builds it, milestone by milestone.",
        see: "Working demos",
      },
      {
        name: "Launch",
        body: "Live on the App Store, Google Play and the web, in your accounts.",
        see: "Your store listings",
      },
      {
        name: "Care",
        body: "Ongoing build and maintenance once you’re live.",
        see: "A monthly changelog",
      },
    ],
  },

  // doc 09 `#pricing`, no numbers, drawn as a track of what you pay for
  // (Nazar's pick o1, 2026-09-30). DRAFT: lede, track tags, note, bodies
  pricing: {
    id: "pricing",
    title: "How we price.",
    lede: "No numbers here, on purpose: a price before the diagnostic would be a guess.",
    track: [
      { name: "The Review", tag: "The diagnostic" },
      { name: "Milestone 1", tag: "Fixed price" },
      { name: "Milestone 2", tag: "Fixed price" },
      { name: "Milestone 3", tag: "Fixed price" },
      { name: "Launch, then Care", tag: "Care, monthly" },
    ],
    credit: "credited to the build",
    hourly: "no hourly billing",
    note: "The exact proposal comes out of The Review.",
    rules: [
      {
        title: "Fixed price per milestone.",
        body: "Priced and delivered against milestones you approve.",
      },
      {
        title: "Diagnostic first, then an exact proposal.",
        body: "The Review tells us what your build really is, so the proposal isn’t a guess.",
      },
      {
        title: "The diagnostic is credited to the build.",
        body: "If you build with us, what you paid for The Review comes off the build.",
      },
      {
        title: "No hourly billing.",
        body: "You are not buying time. You are buying results, milestone by milestone.",
      },
    ],
  },

  // doc 09: code, IP, accounts, docs, yours from day one. The section is
  // /build-your-saas "What you own" (Nazar's pick o3, 2026-09-30) under
  // this title, so the two pages never drift apart.
  own: {
    title: "Yours from day one.",
  },

  // doc 09, verbatim but for the dash; no client named
  // each gate drawn as a slice of the real thing (Nazar's pick o3); the
  // line and the three bodies confirmed true by Nazar (2026-09-30)
  standards: {
    title: "Big-team standards, founders on the build.",
    line: "We’ve shipped inside a major European retailer’s engineering team, and every build of ours clears the same three gates.",
    items: [
      {
        id: "review",
        title: "Code review",
        body: "Every change read by a senior engineer before it merges.",
      },
      {
        id: "qa",
        title: "QA gates",
        body: "Tests and a manual pass on real devices, before anything ships.",
      },
      {
        id: "release",
        title: "Release process",
        body: "Staging first, then production, with a way back.",
      },
    ],
    stackLabel: "Our stack",
    stack: [
      "React",
      "React Native",
      "Node.js",
      "Next.js",
      "Supabase",
      "TypeScript",
      "Stripe",
    ],
  },

  // doc 09: the two-person risk, answered honestly (approved answers)
  risk: {
    // DRAFT
    title: "Two founders? Fair question.",
  },
} as const;
