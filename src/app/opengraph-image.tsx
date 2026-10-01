import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Gimmir: we build SaaS that founders own. Fitness is where we go deepest.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    label: "SaaS founders own · Fitness first",
    // the home H1's first sentence; the photos beside it are the faces
    headline: ["We build SaaS that founders", { mark: "own", after: "." }],
    voice: "Fitness is where we go deepest.",
    picture: { people: ["nazar", "oleh"] },
  });
}
