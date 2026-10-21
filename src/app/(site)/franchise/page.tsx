import type { Metadata } from "next";

import { ChapterNav } from "@/components/franchise/chapters";
import { FranchiseProvider } from "@/components/franchise/franchise-context";
import { LpBook } from "@/components/franchise/lp-book/book";
import { LpFaq } from "@/components/franchise/lp-faq/faq";
import { LpFlow } from "@/components/franchise/lp-flow/flow";
import { LpHero } from "@/components/franchise/lp-hero/hero";
import { LpStats } from "@/components/franchise/lp-hero/stats";
import { LpMoney } from "@/components/franchise/lp-money/money";
import { LpNumbers } from "@/components/franchise/lp-numbers/numbers";
import { LpOffer } from "@/components/franchise/lp-offer/offer";
import { LpPlatform } from "@/components/franchise/lp-platform/platform";
import { LpProcess } from "@/components/franchise/lp-process/process";
import { LpProof } from "@/components/franchise/lp-proof/proof";
import { UrgencyBar } from "@/components/franchise/urgency-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { franchise } from "@/content/franchise";
import { FAQ_ITEMS } from "@/content/franchise-page/faq";
import { FOUNDING, OFFER } from "@/content/offer";
import { breadcrumbs, faqPage, offerSchema } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

const { title, description } = franchise.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/franchise" },
  ...socialMetadata({ title, description, path: "/franchise" }),
};

// Rebuilt every hour so the founding-terms copy never outlives its date.
export const revalidate = 3600;

// The offer page every outreach link points to, on Oleh's landing artboard
// (21 Oct 2026): numbered chapters, ① the hero with the visitor's brand on
// the app, ② where the money goes, ③ their own numbers in 3 steps, ④ the
// platform as a scroll story, ⑤ the full flow, ⑥ live work, ⑦ how we
// build, ⑧ the founding offer, ⑨ questions, ⑩ book a call.
export default function FranchisePage() {
  const faqLd = faqPage([...FAQ_ITEMS]);

  return (
    <FranchiseProvider>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["For franchises", "/franchise"],
        ])}
      />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd
        data={offerSchema({
          name: "Founding partner set-up",
          price: OFFER.setupFee,
          currency: OFFER.currency,
          path: "/franchise",
          availabilityEnds: FOUNDING.termsClose,
        })}
      />
      <UrgencyBar />
      <ChapterNav />
      <LpHero />
      <LpStats />
      <LpMoney />
      <LpNumbers />
      <LpPlatform />
      <LpFlow />
      <LpProof />
      <LpProcess />
      <LpOffer />
      <LpFaq />
      <LpBook />
    </FranchiseProvider>
  );
}
