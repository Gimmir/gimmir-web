/**
 * What a franchise HQ gets, from Oleh's "Franchise HQ system: features and
 * landing calculators" (20 Oct 2026): groups A to D are agreed, money
 * first. Group E (everyday basics) waits until it is checked against the
 * build, so it is kept here but not shown (`shown: false`).
 *
 * The retention engine is the reason behind calculator 2's uplift buttons;
 * it is listed under that calculator, not in the groups.
 */

export type FeatureGroup = {
  id: "money" | "losing" | "own" | "network" | "basics";
  letter: string;
  title: string;
  items: string[];
  shown: boolean;
};

export const HQ_FEATURES = {
  title: "What HQ gets",
  lead: "One system for your network: your members' app in your brand, booking, and payments into each franchisee's own Stripe account. HQ's income is taken automatically.",
  groups: [
    {
      id: "money",
      letter: "A",
      title: "New money for HQ",
      shown: true,
      items: [
        "The tech fee comes to HQ. Each franchisee pays HQ every month instead of paying a platform, and HQ sets the amount.",
        "A fee on every payment members make: memberships, class packs, drop-ins and merch. Taken automatically, and Gimmir takes no cut.",
        "Franchisees who don't pay are locked out automatically. Nobody at HQ chases fees by hand.",
        "Room to sell more: merch, products and protein subscriptions in the app. Each one is a new payment HQ earns its fee on.",
      ],
    },
    {
      id: "losing",
      letter: "B",
      title: "Money you stop losing",
      shown: true,
      items: [
        "Failed payments chased HQ's way: more retries, on HQ's own schedule, not the platform's fixed 4.",
        "Members kept longer: the first 90 days tracked and scripted, with notifications, timed emails and automatic follow-ups.",
        "ClassPass and Wellhub connected, so their first-timers become your members.",
      ],
    },
    {
      id: "own",
      letter: "C",
      title: "What you own",
      shown: true,
      items: [
        "An app in your brand, under HQ's own App Store and Google Play listings.",
        "Each franchisee's own Stripe account. Money goes straight to the franchisee and HQ's share is taken on the way.",
        "Your members' data, yours to keep.",
        "Your own API, to build anything on top later.",
        "Code buyout at 2× the set-up fee, so the system is yours even if you leave.",
      ],
    },
    {
      id: "network",
      letter: "D",
      title: "Running the network",
      shown: true,
      items: [
        "One screen for HQ: every unit's revenue, retention and late payers.",
        "Training and coaching run one way across every unit.",
        "Features you ask for go into the product. Founding partners shape the roadmap.",
      ],
    },
    {
      id: "basics",
      letter: "E",
      title: "Everyday basics",
      // Oleh: to confirm against the build before it goes on the page
      shown: false,
      items: [
        "Timetable, booking, waitlists and check-in.",
        "Memberships, class packs, intro offers, pause and freeze.",
        "A franchisee admin panel per unit: schedule, staff, members and payouts.",
        "A coach view: their classes, who's booked and attendance.",
        "HQ messages to the whole network or to one unit, by push and in the app.",
        "Every member moved off the old system. Login problems are fixed the same day.",
      ],
    },
  ] satisfies FeatureGroup[],

  retention: {
    title: "What keeps members longer",
    lead: "HQ writes the playbook once and every unit runs it. HQ sees retention unit by unit.",
    items: [
      {
        title: "The first 90 days, scripted",
        body: "A welcome, reminders before the first classes, a check-in after the 3rd visit, and a task for the coach when a new member goes quiet.",
      },
      {
        title: "Push notifications",
        body: "Class reminders, waitlist spots opening, streaks and milestones, and a nudge after a set number of days without a visit.",
      },
      {
        title: "Automatic emails at set moments",
        body: "Joined, first visit, 2 weeks missed, payment failed, membership ending, anniversary.",
      },
      {
        title: "At-risk members flagged",
        body: "Dropping attendance, a failed payment, a freeze request. Each unit sees its list every morning.",
      },
      {
        title: "Win-back",
        body: "Cancelled and lapsed members get a timed sequence with an offer HQ sets.",
      },
      {
        title: "Pause instead of cancel",
        body: "Freeze options offered at the cancel step.",
      },
      {
        title: "Referrals",
        body: "Members invite friends from the app.",
      },
    ],
  },
} as const;
