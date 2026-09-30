import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "No black box: how we work";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "No black box.",
    line2: "How a build runs, how we price it, and what stays yours.",
    footer: "Fixed price per milestone · your code from day one",
    faces: ["nazar", "oleh"],
  });
}
