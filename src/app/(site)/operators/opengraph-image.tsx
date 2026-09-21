import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Own your fitness platform: for operators & franchisors";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "For operators",
    line2: "Stop renting your platform",
    footer: "Fitness operators & franchisors with 8+ sites",
  });
}
