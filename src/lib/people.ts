import { FOUNDERS, type FounderId } from "@/lib/founders";

/**
 * People the site names and pictures beside the founders, who aren't part
 * of Gimmir. Quentin OK'd being named and pictured (2026-09-30).
 */
export const GUESTS = {
  quentin: {
    first: "Quentin",
    name: "Quentin Randis",
    title: "Hyrox & CrossFit coach",
    photo: "/photo/quentin.jpg",
  },
} as const;

export type GuestId = keyof typeof GUESTS;

/** Anyone whose face can sit in a headline: a founder or a guest. */
export type FaceId = FounderId | GuestId;

export function person(id: FaceId) {
  return id in FOUNDERS ? FOUNDERS[id as FounderId] : GUESTS[id as GuestId];
}
