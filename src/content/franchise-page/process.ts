import { OFFER } from "@/content/offer";
import { formatMoney } from "@/lib/franchise-calc";

/**
 * /franchise chapter "How we build" (Oleh's landing artboard, 2 Nov). The
 * payments and the 12 weeks come from the offer, so they can't drift.
 */

const capital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** "£4,000 mid-build" / "Week 6, once you've seen the app on your phone". */
const payments = OFFER.payments.map((p) => {
  const [head, week] = p.label.split(", ");
  return {
    title: `${formatMoney(p.amount)} ${lower(head)}`,
    text: week ? `${capital(week)}, ${lower(p.when)}` : p.when,
  };
});

export const PROCESS = {
  kicker: "How we build",
  title: `${OFFER.readyWeeks} weeks, side by side. You see every step.`,
  lead: "No demo at the end. A shared channel, a weekly call, and the app on your phone from week 3.",
  plan: {
    title: "The plan",
    weeks: Array.from({ length: OFFER.readyWeeks }, (_, i) => `W${i + 1}`),
    /** Before the visitor's clock has worked out the date. */
    readyFallback: `in ${OFFER.readyWeeks} weeks`,
    readyPrefix: "Start this week: your app is out",
    bars: [
      { id: "setup", title: "Set up", text: "Brand, studios, plans, prices" },
      {
        id: "build",
        title: "Build with you",
        text: "A new build on your phone every week. One studio tests it.",
      },
      { id: "launch", title: "Launch", text: "Members moved, apps released" },
    ],
    payments,
    note: `App store review time isn't counted in the ${OFFER.readyWeeks} weeks.`,
  },
  calls: {
    title: "Built on calls with you, not in a black box.",
    note: "Real calls from our builds. We post the work as we go.",
    photos: [
      {
        src: "/franchise/call-un1t-team.webp",
        caption: "Planning call with UN1T's team",
      },
      {
        src: "/franchise/call-un1t-scoping.webp",
        caption: "Scoping member emails and notifications",
      },
      { src: "/franchise/call-founder.webp", caption: "A call with a founder" },
    ],
  },
  post: {
    name: "Oleh Palazh",
    photo: "/photo/oleh.jpg",
    connection: "· 1st",
    headline:
      "I put fitness franchises on their own app · Co-Founder & CTO @ Gimmir",
    network: "LinkedIn",
    /** Names the monthly figure: built from the approved claim, never typed here. */
    text: (mrr: string) =>
      `We built an app for Hyrox and CrossFit coaches. It brings in more than ${mrr.replace(/\+$/, "")} every month. And that's not the part I'm proudest of…`,
    imageAlt: "Jimmy Coach dashboard in the post",
    image: "/franchise/jimmy-dashboard-post.webp",
    footer: "We build in public",
    cta: "Follow on LinkedIn",
    href: "https://www.linkedin.com/in/oleh-palazh",
  },
  weekly: {
    title: "Every week, you see where it is",
    items: [
      {
        icon: "chat",
        title: "A shared channel",
        text: "Every update, question and request in one place.",
      },
      {
        icon: "call",
        title: "A weekly call",
        text: "Same time every week, with the people building it.",
      },
      {
        icon: "phone",
        title: "The app on your phone from week 3",
        text: "Each week's build, in your brand, before members see it.",
      },
    ],
    team: {
      label: "Who builds it",
      people: [
        { name: "Oleh Palazh", role: "Co-founder, CTO", photo: "/photo/oleh.jpg" },
        { name: "Nazar Moroz", role: "Co-founder, CEO", photo: "/photo/nazar.jpg" },
      ],
    },
  },
  channel: {
    list: ["# general", "# build", "# launch"],
    active: "# build",
    title: "# build · an example week",
    messages: [
      {
        name: "Oleh Palazh",
        photo: "/photo/oleh.jpg",
        time: "Fri 16:02",
        text: "Week 6 done: waitlists and class packs are in the test app. Leeds tries it Monday. New build on your phones: link pinned.",
      },
      {
        name: "Nazar Moroz",
        photo: "/photo/nazar.jpg",
        time: "Fri 16:10",
        text: "Next week: moving Leeds members over. Call Tuesday 10:00 as usual.",
      },
    ],
    visitor: {
      time: "Fri 17:31",
      text: "Tried it on my phone. Can the waitlist message use our tone of voice?",
    },
  },
} as const;
