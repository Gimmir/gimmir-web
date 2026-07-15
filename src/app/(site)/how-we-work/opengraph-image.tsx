import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "How we work — a dedicated fitness software team";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "How we work",
    line2: "a dedicated fitness software team",
    footer: "Founders in every engagement · your IP from day one",
  });
}
