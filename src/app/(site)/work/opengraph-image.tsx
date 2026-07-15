import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Fitness software case studies — UN1T & Jimmy Coach";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "Case studies",
    line2: "UN1T & Jimmy Coach, built as owners",
    footer: "Real fitness products, not promises",
  });
}
