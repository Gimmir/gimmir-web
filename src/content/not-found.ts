/**
 * The 404 (Nazar's pick o1, 2026-09-30): the old line kept, a drawn "404"
 * with its note in the margin, then the site's two ways in as doors to
 * their pages (not straight into a booking) and the rest as plain links.
 */
import type { HeadlineToken } from "@/components/blocks/inline-headline";

export const notFound = {
  label: "Page not found",
  headline: [
    "That page doesn’t exist. Your platform",
    { mark: "could", after: "." },
  ] satisfies HeadlineToken[],
  lede: "The link may be old. Pick your way in below, or start from the home page.",
  stat: { value: "404", note: "moved when we rebuilt the site" },
  // keyed by BOOK_DOORS id: the door's title and faces come from there
  doors: {
    operators: { label: "For brands", href: "/operators" },
    saas: { label: "For founders", href: "/build-your-saas" },
  },
  links: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "How we work", href: "/how-we-work" },
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
