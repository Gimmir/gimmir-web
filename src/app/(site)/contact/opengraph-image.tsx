import { contact } from "@/content/contact";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Book a call. Talk to the people who’ll build it: Nazar and Oleh.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    label: "Contact",
    // the H1 without its inline faces: the photos beside it are the faces
    headline: contact.hero.headline.filter((t) => typeof t === "string"),
    voice: "Twenty to thirty minutes. No pitch deck.",
    picture: { people: ["nazar", "oleh"] },
  });
}
