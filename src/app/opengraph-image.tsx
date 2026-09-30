import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt =
  "Gimmir: we build SaaS that founders own, and show you how it's done";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "We build SaaS that founders own.",
    line2: "Fitness is where we go deepest.",
    footer: "Nine products shipped · code, accounts and IP in your name",
    faces: ["nazar", "oleh"],
  });
}
