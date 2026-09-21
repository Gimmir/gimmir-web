import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Wellness and prevention apps, built to last";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "Health & wellness",
    line2: "apps people keep opening",
    footer: "Prevention, not the clinic · HealthKit & Health Connect",
    faces: ["oleh", "nazar"],
  });
}
