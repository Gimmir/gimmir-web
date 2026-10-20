import { OFFER } from "@/content/offer";
import { UN1T, shown } from "@/content/proof";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

const headline = "Make your franchisees’ platform fees HQ’s income.";

export const alt = headline;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    label: "For franchises",
    headline: ["Make your franchisees’ platform fees", { mark: "HQ’s income." }],
    voice: `Built for franchise HQs with ${OFFER.minUnits}+ units.`,
    // UN1T's studio count beside its icon: the proof the page stands on
    picture: { app: "un1t", stat: String(shown(UN1T.studios)) },
  });
}
