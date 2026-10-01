import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Turn your business into a SaaS you own. We did it for ourselves first, with Jimmy Coach.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    label: "For founders",
    // the page's H1 is too long for a card; this is its claim, cut short
    headline: ["Turn your business into a SaaS you", { mark: "own", after: "." }],
    voice: "We did it for ourselves first, with Jimmy Coach.",
    picture: {
      phones: [
        "/jimmy/client-swap.png",
        "/jimmy/coach-client-overview.png",
        "/jimmy/client-chat.png",
      ],
    },
  });
}
