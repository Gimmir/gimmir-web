import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt =
  "Stop renting your platform: for franchises and chains with 8+ sites";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "For brands",
    line2: "Stop renting your platform",
    footer: "Franchises and chains with 8+ locations",
    faces: ["nazar"],
  });
}
