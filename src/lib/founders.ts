/**
 * The two founders' fixed identity, for code-built pages, share cards and
 * booking CTAs. Bios, photos and links shown on Sanity-driven pages still
 * come from the `founder` documents (`sanityId`).
 */

export type FounderId = "nazar" | "oleh";

export type Founder = {
  id: FounderId;
  sanityId: "founderNazar" | "founderOleh";
  name: string;
  first: string;
  role: string;
  /** Title on the V2 site. */
  title: string;
  /** A second hat worth naming, if any. */
  also?: string;
  /** Square headshot in /public. */
  photo: string;
  linkedin: string;
};

export const FOUNDERS: Record<FounderId, Founder> = {
  nazar: {
    id: "nazar",
    sanityId: "founderNazar",
    name: "Nazar Moroz",
    first: "Nazar",
    role: "Founder · product & business",
    title: "CEO, Gimmir",
    also: "Co-founder & CTO, Jimmy Coach",
    photo: "/photo/nazar-m.jpg",
    linkedin: "https://www.linkedin.com/in/nazarmoroze/",
  },
  oleh: {
    id: "oleh",
    sanityId: "founderOleh",
    name: "Oleh Palazhii",
    first: "Oleh",
    role: "CTO · architecture & delivery",
    title: "CTO, Gimmir",
    photo: "/photo/oleh-p.jpg",
    linkedin: "https://www.linkedin.com/in/oleh-palazh/",
  },
};

/** "Nazar" / "Nazar & Oleh". */
export const hostNames = (ids: FounderId[]) =>
  ids.map((id) => FOUNDERS[id].first).join(" & ");
