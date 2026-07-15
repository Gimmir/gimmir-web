import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Founders — we built UN1T's platform and Jimmy Coach";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "Founders",
    line2: "we built UN1T's platform & Jimmy Coach",
    footer: "Nazar Moroz & Oleh Palazhii · a Ukrainian studio",
  });
}
