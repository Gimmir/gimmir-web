import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Gimmir: Terms of Use";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "Terms of Use",
    line2: "the rules for using gimmir.com",
    footer: "Gimmir LLC · Delaware, USA",
  });
}
