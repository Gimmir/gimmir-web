/**
 * /franchise chapter 04, "The full flow" (Oleh's landing artboard): the six
 * stages from HQ's set-up to a member staying and paying, and the 42
 * features grouped by area. Copy follows the artboard; the flagged lines are
 * worded to pass the franchise copy rules.
 */

/** Who acts in a stage. "Auto" is the system running by itself. */
export type FlowActor = "HQ" | "Studio" | "Member" | "Auto";

export type FlowStep = {
  /** "1.1": the stage number and the step's place in it. */
  n: string;
  title: string;
  desc: string;
};

export type FlowStage = {
  /** "01" */
  num: string;
  /** In-page anchor and the strip's link target: "flow-01". */
  id: string;
  /** The strip's short label. */
  short: string;
  actor: FlowActor;
  /** The pill's words (the strip shows the same). */
  who: string;
  title: string;
  desc: string;
  /** The lime highlight. */
  highlight: string;
  steps: readonly FlowStep[];
};

const stage = (
  num: string,
  short: string,
  actor: FlowActor,
  who: string,
  title: string,
  desc: string,
  highlight: string,
  steps: readonly (readonly [string, string])[],
): FlowStage => ({
  num,
  id: `flow-${num}`,
  short,
  actor,
  who,
  title,
  desc,
  highlight,
  steps: steps.map(([t, d], i) => ({
    n: `${Number(num)}.${i + 1}`,
    title: t,
    desc: d,
  })),
});

export const FLOW: readonly FlowStage[] = [
  stage(
    "01",
    "Set up",
    "HQ",
    "HQ",
    "Set up your network",
    "Done once at HQ. Every studio inherits it.",
    "Ready in 12 weeks, in writing",
    [
      ["Your brand", "App name, logo and colours, in the App Store and Google Play."],
      ["Your studios", "Locations, rooms and opening hours."],
      ["Plans and prices", "Memberships, class packs and intro offers, set once for every studio."],
      ["Your income", "The tech fee each studio pays HQ, and your fee on every payment."],
      ["Studio payouts", "Each studio connects its own Stripe account."],
      ["Members moved over", "From Mindbody, Glofox or spreadsheets. Login problems fixed the same day."],
    ],
  ),
  stage(
    "02",
    "Team",
    "Studio",
    "Studio",
    "Bring in your team",
    "Each studio runs its own day, on your system.",
    "One timetable for every coach",
    [
      ["Coaches and staff", "Access for managers, front desk and coaches."],
      ["Timetable", "Classes, rooms and capacity for each studio."],
      ["Coach rota", "Who teaches what, and cover when someone is off."],
      ["Session plans from HQ", "Written once, sent to every coach and wall screen."],
      ["House rules", "Late-cancel windows, no-show charges and booking limits."],
    ],
  ),
  stage(
    "03",
    "Join",
    "Member",
    "Member",
    "A member joins",
    "In your app, with your name on it.",
    "Joined and paid from their phone",
    [
      ["Downloads your app", "Or signs up on your own web page."],
      ["Picks a plan", "A membership, a class pack or an intro offer."],
      ["Pays", "Apple Pay, Google Pay or card, straight to their studio."],
      ["One account, any studio", "A home studio, and every studio in the network open to them."],
      ["Welcome starts", "Day 1 of the 30 to 90-day onboarding flow."],
    ],
  ),
  stage(
    "04",
    "Train",
    "Member",
    "Member and coach",
    "Books, checks in, trains",
    "The weekly loop that keeps them coming back.",
    "Booked in 2 taps",
    [
      ["Books a class", "By studio, day or coach."],
      ["Waitlist", "A spot opens, the next member is booked and told."],
      ["Reminders", "Before every class, at the time you set."],
      ["Checks in", "At the front desk, or from the app on arrival."],
      ["Coach runs the class", "Who's booked, attendance, and today's session on the wall screens."],
      // Artboard says "... streaks and <banned word> in the app."
      ["Progress", "Attendance and streaks in the app."],
    ],
  ),
  stage(
    "05",
    "Stay",
    "Auto",
    "Runs by itself",
    "Stays and pays",
    "Every month, without anyone chasing.",
    "Fewer members leave",
    [
      ["Monthly payments", "Memberships renew on their own."],
      ["Failed payments", "Retried on your schedule, with a card-update link."],
      ["Pause, not cancel", "A freeze offered at the cancel step."],
      // Artboard says "Coach check-ins, <banned word> and nudges."
      ["Onboarding, day 30 to 90", "Coach check-ins and nudges."],
      ["At-risk flags", "No visit in 10 days: flagged to the studio every morning."],
      ["Win-back and referrals", "An offer for lapsed members. Members invite friends."],
      ["Shop", "Merch, products and subscriptions in the app."],
    ],
  ),
  stage(
    "06",
    "HQ view",
    "HQ",
    "HQ",
    "HQ sees everything",
    "One screen for the whole network.",
    "Your income, collected automatically",
    [
      ["Network dashboard", "Revenue, members and retention, studio by studio."],
      ["Tech fees collected", "Studios that don't pay are locked out automatically."],
      ["Your fee on every payment", "Taken the moment members pay."],
      ["Messages", "To the whole network or to one studio."],
      ["Reports and exports", "By month and by studio."],
      ["Connected", "ClassPass, Wellhub, your own API and webhooks."],
      ["AI agents, optional", "Ask anything. Nothing is sent without your OK."],
    ],
  ),
];

/** The dot that marks a group's features in the strips and the full list. */
export type FeatureTone = "lime" | "ink" | "stone";

export type FeatureGroup = {
  id: string;
  /** The area's name in the full list (the artboard only has the items). */
  title: string;
  tone: FeatureTone;
  items: readonly string[];
};

export const FEATURE_GROUPS: readonly FeatureGroup[] = [
  {
    id: "members",
    title: "In the members' app",
    tone: "lime",
    items: [
      "Timetable, booking and waitlists",
      "Memberships, class packs and intro offers",
      "Card, Apple Pay and Google Pay",
      "Book at any studio in your network",
      "Pause or freeze instead of cancel",
      "Attendance, progress and streaks",
      "Push notifications and reminders",
      "Shop for merch and products",
      "Invite a friend",
    ],
  },
  {
    id: "studio",
    title: "At the studio",
    tone: "ink",
    items: [
      "Calendar, classes and capacity",
      "Member profiles, attendance and payments",
      "Checkout, credits, custom charges, VIP",
      "Late-cancellation and no-show rules",
      "Coaches, rotas and coach performance",
      "Class demand by time of day",
      "Wall screens with today's session",
      "Paid into the studio's own Stripe",
    ],
  },
  {
    id: "hq",
    title: "At HQ",
    tone: "stone",
    items: [
      "Every studio's revenue, members and retention",
      "Tech fee billing with automatic lock",
      "Your fee on every payment",
      "One session plan for every studio",
      "Brand, plans and prices set once",
      "Messages to the network or one studio",
      "Reports and exports",
      "Your own API",
    ],
  },
  {
    id: "payments",
    title: "Payments",
    tone: "stone",
    items: [
      "A Stripe account per studio",
      "Memberships, packs, drop-ins, merch",
      "Failed payments retried your way",
      "Card-update links",
      "Refunds, invoices and receipts",
      "Revenue per member, per class, a month",
    ],
  },
  {
    id: "retention",
    title: "Keeping members",
    tone: "lime",
    items: [
      "30 to 90-day onboarding flow",
      "Coach check-ins at day 30 and 60",
      "Email sequences and push at set times",
      "Booking, waitlist and expiry messages",
      "Members at risk flagged every morning",
      "Win-back and pause offers",
    ],
  },
  {
    id: "connected",
    title: "Connected",
    tone: "stone",
    items: [
      "ClassPass and Wellhub",
      "Web sign-up and checkout pages",
      "Every member moved from your old system",
      // Artboard names two AI products here; the page names neither.
      "Optional AI agents",
      "Webhooks and API for your other tools",
    ],
  },
];

export const FEATURE_TOTAL = FEATURE_GROUPS.reduce(
  (sum, g) => sum + g.items.length,
  0,
);

/**
 * The three drifting strips, with the groups paired as in the artboard.
 * The middle strip runs the other way, a little slower.
 */
export const MARQUEE_ROWS: readonly {
  groups: readonly string[];
  seconds: number;
  reverse: boolean;
}[] = [
  { groups: ["members", "retention"], seconds: 70, reverse: false },
  { groups: ["studio", "payments"], seconds: 80, reverse: true },
  { groups: ["hq", "connected"], seconds: 70, reverse: false },
];

export const CORE = {
  label: "The core · the same for every partner",
  title: ["Not a template.", "A proven core."],
  body: "Booking, payments, the members' app, HQ's screen and the onboarding flow. It already runs UN1T, so it works from day one and gets better with every partner.",
} as const;

export const BUILT_FOR_YOU = {
  label: "Built for you · on your request",
  title: "Shaped to how you run.",
  body: "Your plans, your rules, your way of coaching. What only your network needs is built on top, at a fixed price agreed before we start.",
  examplesTitle: "Built only for UN1T",
  examples: [
    "Founding memberships sold on a web page before Hatch Street opened",
    "Credits, VIP memberships and custom charges at the front desk",
    "Class plans on the studio wall screens",
  ],
  note: "Running kids' classes? Parent accounts with more than one child, term bookings and age groups, for example.",
} as const;

export const FLOW_INTRO = {
  kicker: "04 · The full flow",
  title: "From opening day to a member's 100th class.",
  lead: "Every feature, in the order your network uses it: HQ sets up, studios run the day, members join, book, pay and stay.",
} as const;

export const FLOW_LEGEND: readonly { actor: FlowActor; label: string }[] = [
  { actor: "HQ", label: "HQ" },
  { actor: "Studio", label: "Studio" },
  { actor: "Member", label: "Member" },
  { actor: "Auto", label: "Runs by itself" },
];
