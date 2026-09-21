import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt =
  "Stop renting your fitness platform: for operators with 8+ sites";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "For operators",
    line2: "Stop renting your platform",
    footer: "Free cost check with Nazar · money-back Teardown",
    faces: ["nazar"],
  });
}
