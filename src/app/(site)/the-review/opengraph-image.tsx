import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "The Review — technical due diligence for fitness products";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "The Review",
    line2: "technical due diligence for fitness products",
    footer: "Two weeks · led by both founders · $4,500 fixed, credited",
  });
}
