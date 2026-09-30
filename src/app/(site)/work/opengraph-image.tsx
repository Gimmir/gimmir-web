import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Our work: nine products shipped, four in fitness";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "Nine products shipped.",
    line2: "Two you can see: UN1T and Jimmy Coach.",
    footer: "Four in fitness · seven under NDA",
  });
}
