/**
 * /franchise chapter "Every feature" (Oleh's landing artboard, 2 Nov): six
 * stages from HQ's set-up to the HQ dashboard, one at a time in an explorer.
 * Copy follows the artboard; the two lines the copy rules retire are noted
 * where they differ.
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
  /** Tab and panel id suffix: "flow-01". */
  id: string;
  /** The tab's short label. */
  short: string;
  actor: FlowActor;
  /** The actor pill's words (the tab shows the same). */
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
      ["Your income", "What each studio pays you for the app, and your fee on every payment."],
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
      // Artboard ends "... streaks and <retired word> in the app."
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
      // Artboard says "Coach check-ins, <retired word> and nudges."
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
      ["App fees collected", "Studios that don't pay are locked out."],
      ["Your fee on every payment", "Taken the moment members pay."],
      ["Messages", "To the whole network or to one studio."],
      ["Reports and exports", "By month and by studio."],
      ["Connected", "ClassPass, Wellhub, your own API and webhooks."],
      ["AI agents, optional", "Ask anything. Nothing is sent without your OK."],
    ],
  ),
];

export const FLOW_INTRO = {
  kicker: "Every feature",
  title: "From opening day to a member's 100th class.",
  lead: "Every feature, in the order your network uses it: HQ sets up, studios run the day, members join, book, pay and stay. Pick a stage.",
  hint: "6 stages. Click one to see what happens in it.",
} as const;
