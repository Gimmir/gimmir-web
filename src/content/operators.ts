/**
 * /operators, V2 (doc 09 §3.2): fitness brands and franchisors, in Nazar's
 * voice. No prices, no $ figures; UN1T proof is 12 weeks and 10+
 * locations. Lines marked DRAFT are new wording for Nazar to confirm;
 * everything else is copy the site already carries.
 */
export const operators = {
  meta: {
    title: "Own Your Gym App: for Operators with 8+ Sites",
    description:
      "Operators with 8+ locations: move off a rented white-label booking platform onto your own gym app, back office and payments, planned step by step with Nazar.",
  },

  hero: {
    // the lock sits after "platform"; "yours." gets the marker
    headline: [
      "Your network runs on a platform",
      { tile: "lock" },
      "you rent. Let’s make it",
      { mark: "yours." },
    ],
    sub: "For fitness brands and franchisors with 8+ locations.",
    cta: {
      label: "Book a free 20-minute platform check",
      by: "with Nazar",
    },
  },

  pain: {
    title: "Sound familiar?",
    items: [
      {
        title: "Fees that grow with every location.",
        body: "Per-member and per-location fees rise with every site, whether or not it's profitable yet.",
      },
      {
        title: "Every studio on its own, no one view of the network.",
        body: "Memberships, bookings and payments sit in separate tools, and head office sees what each site sends.",
      },
      {
        title: "An app that looks like everyone’s.",
        body: "Your members get the same experience as every other studio on the platform, and it changes when the vendor decides.",
      },
    ],
  },

  un1t: {
    label: "Case · UN1T",
    more: "Members book, buy and pay in one app at every site, and royalties come from actual payments, not end-of-month spreadsheets.",
    before: {
      label: "Before",
      items: ["Separate studios", "A rented platform", "No single data"],
    },
    after: {
      label: "After",
      items: ["One network", "Own app & back office", "One data model"],
    },
  },

  bento: {
    title: "What we build for networks.",
    cards: [
      {
        id: "app",
        title: "Member app",
        body: "iOS and Android apps your members open every day: bookings, memberships and payments.",
      },
      {
        id: "office",
        title: "Back office",
        body: "Classes, memberships, staff and reporting across every site, on one data model.",
      },
      {
        id: "payments",
        title: "Payments & payouts",
        body: "Subscriptions, card payments and payouts built around how you actually operate.",
      },
      {
        id: "data",
        title: "Multi-location data",
        body: "One member, every site: head office sees the whole network, not what each site sends.",
      },
      {
        id: "migration",
        title: "Migration without losing members",
        body: "Member data mapped and tested before anything moves; sites switch over in waves.",
      },
    ],
  },

  migration: {
    title: "Migration, step by step.",
    steps: [
      {
        name: "Cost check",
        time: "20 minutes",
        body: "I'll look at what you pay now and tell you if there's real money to save. No cost, no obligation.",
      },
      {
        name: "Teardown",
        time: "5 working days",
        body: "A written breakdown of what you pay now and what you'd save owning your platform.",
      },
      {
        name: "Migration Blueprint",
        time: "3 weeks",
        body: "The full migration and build plan, with a fixed build quote. Credited to your build.",
      },
      {
        name: "Build",
        time: "Milestone by milestone",
        body: "Your own platform, priced and delivered against milestones you approve.",
      },
      {
        name: "Switch-over",
        time: "In waves",
        body: "A cutover plan that doesn't interrupt billing. Sites move in waves, not all at once.",
      },
      {
        name: "Care",
        time: "Monthly",
        body: "Ongoing build and maintenance once you're live.",
      },
    ],
    note: "Typically four to six months from Blueprint to the last site switched over.",
  },

  guarantee: {
    before: "If the Teardown doesn’t find savings bigger than its fee,",
    mark: "you don’t pay.",
  },

  objections: {
    title: "What operators ask first.",
    items: [
      {
        key: "members",
        question: "Will members get lost?",
        answer:
          "No, that's exactly what the Migration Blueprint prevents. Before anything moves, we map and test member data and plan a cutover that doesn't interrupt billing. Sites move in waves, not all at once.",
      },
      {
        key: "contract",
        question: "We're under contract.",
        // DRAFT for Nazar to confirm
        answer:
          "Tell me when it ends. The Blueprint plans the switch-over around your renewal date, so you aren't paying for two platforms for long.",
      },
      {
        key: "cost",
        question: "Isn't our own software expensive?",
        // DRAFT for Nazar to confirm (built from the offer and ladder copy)
        answer:
          "It's a build you own, not a fee that grows with every site. The Teardown shows what you'd save before you commit, and the build is priced and delivered against milestones you approve.",
      },
      {
        key: "disappear",
        question: "What if your team disappears?",
        answer:
          "Nothing breaks. Repositories, cloud accounts and app-store listings are in your name from day one, and you get a runbook at every milestone. Any competent team can pick it up, and if you'd rather keep us, Care carries on after launch.",
      },
    ],
  },

  close: {
    title: "Find your number first.",
    line: "I'll look at what you pay now and tell you if there's real money to save.",
    fit: "Best fit: 8+ locations.",
  },
} as const;
