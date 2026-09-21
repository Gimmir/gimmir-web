import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "What Gimmir builds: fitness, wellness and beyond";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "What we build",
    line2: "fitness, wellness and beyond",
    footer: "Native apps · web · back offices · payments",
    faces: ["nazar", "oleh"],
  });
}
