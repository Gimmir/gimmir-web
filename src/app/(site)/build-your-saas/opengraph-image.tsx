import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Turn your business into a SaaS you own";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "Turn your business into a SaaS you own.",
    line2: "We did it for ourselves first, with Jimmy Coach.",
    footer: "Code, accounts and roadmap in your name",
    faces: ["nazar", "oleh"],
  });
}
