/**
 * /work/un1t, V2 (doc 09 §3.5). Facts are the ones the site already
 * carries for UN1T (Rob's permission): London-founded boutique fitness
 * franchise, 10+ locations, 12 weeks, member app + back office, stack.
 * No $ figure (not public yet); the drawn number is the 12 weeks. Never
 * name the platform they left. Rob's quote waits for approved wording.
 */
export const un1t = {
  hero: {
    // not the home teaser's line (doc 09 ③), so the case has its own H1
    title: "How UN1T became one network on software it owns.",
    sub: "We moved a London-founded boutique fitness franchise off a white-label platform onto their own app, back office and payments, across 10+ locations.",
    stat: { value: "10+", label: "locations on one system" },
  },

  // Product screens go here once Nazar sends the cleared ones; until then
  // the hero shows the drawn 10+ and the bento draws its UI in code.
  screens: [] as { src: string; alt: string }[],

  context: {
    label: "The franchise",
    title: "A London-founded boutique fitness franchise, 10+ locations.",
    body: "UN1T grew studio by studio, each one running on the same rented platform and its own stack of tools.",
  },

  problem: {
    label: "The problem",
    title: "Separate studios on a rented platform.",
    body: [
      "Memberships sat in one place, bookings in another, payments somewhere else. Head office saw whatever each site sent over.",
      "Royalties came from reports, not from the payments themselves, and the software that ran the whole business was rented.",
    ],
  },

  built: {
    label: "What we built",
    title: "Their own app and back office, end to end.",
    cards: [
      {
        id: "app",
        title: "Member app",
        body: "iOS and Android. Members book classes, buy memberships and pay in one app, with Apple Health and Health Connect built in.",
      },
      {
        id: "office",
        title: "Back office",
        body: "Classes, memberships and staff across every location. Franchisees run their whole business on it.",
      },
      {
        id: "payments",
        title: "Payments & payouts",
        body: "Fees and payouts modeled around a multi-location franchise; royalties from what members actually paid.",
      },
      {
        id: "data",
        title: "One data model",
        body: "One member, every site. Head office knows every member at every location.",
      },
    ],
  },

  result: {
    stat: {
      value: "12",
      label: "weeks to move a 10+ location franchise onto software it owns",
    },
    line: "UN1T owns the code, the data and the roadmap.",
    stack: [
      "React Native (Expo)",
      "TypeScript",
      "Supabase",
      "Apple Health",
      "Health Connect",
    ],
  },
} as const;
