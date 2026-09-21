import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt =
  "Gimmir: fitness & wellness app development, built by the founders";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "Fitness & wellness apps",
    line2: "you actually own",
    footer: "Built by the founders who ship them · your code from day one",
    faces: ["nazar", "oleh"],
  });
}
