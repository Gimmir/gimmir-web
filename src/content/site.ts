/**
 * Site chrome (V2): navigation, the two bookable doors, footer. Code, not
 * CMS: it changes with the sitemap, not with the copy.
 */
import type { BookingId } from "@/lib/booking";
import type { FounderId } from "@/lib/founders";

export type NavItem = { label: string; href: string; ready?: boolean };

// Each buyer's way in comes first (Nazar's call, 2026-09-30, beyond doc
// 09's nav); an item shows once its V2 page exists.
export const NAV: NavItem[] = [
  { label: "For fitness brands", href: "/operators" },
  // once /build-your-saas is built (P1)
  { label: "For SaaS founders", href: "/build-your-saas", ready: false },
  { label: "Work", href: "/work" },
  // once its V2 page is built (P2)
  { label: "What we build", href: "/what-we-build", ready: false },
  { label: "How we work", href: "/how-we-work" },
  // shows once the first posts are in (P2)
  { label: "Build log", href: "/build-log", ready: false },
  { label: "Nazar & Oleh", href: "/nazar-and-oleh" },
];

export type BookDoor = {
  id: "operators" | "saas";
  booking: BookingId;
  title: string;
  detail: string;
  faces: FounderId[];
};

/** The two calls, as offered by the header menu, footer and contact page. */
export const BOOK_DOORS: BookDoor[] = [
  {
    id: "operators",
    booking: "costCheck",
    title: "I run a fitness brand",
    detail: "A 20-minute platform check with Nazar",
    faces: ["nazar"],
  },
  {
    id: "saas",
    booking: "founderReview",
    title: "I’m building a SaaS",
    detail: "A 30-minute call with Oleh & Nazar",
    faces: ["oleh", "nazar"],
  },
];

export const CONTACT_EMAIL = "hello@gimmir.com";

export const FOOTER = {
  // Nazar's pick; the home page already says "Your business runs on
  // software. You should own it.", so the footer must not repeat it.
  // The second part gets the lime marker.
  headline: ["Fitness platforms your members love,", "and you actually own."],
  columns: [
    {
      title: "Site",
      links: [
        { label: "Work", href: "/work" },
        { label: "What we build", href: "/what-we-build" },
        { label: "How we work", href: "/how-we-work" },
        { label: "Nazar & Oleh", href: "/nazar-and-oleh" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "For",
      links: [
        { label: "Fitness brands", href: "/operators" },
        // the SaaS door on /contact until /build-your-saas exists (P1)
        { label: "SaaS founders", href: "/contact#founders" },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  company: "Gimmir LLC · Delaware, USA",
} as const;
