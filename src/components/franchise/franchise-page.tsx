import { ChapterNav } from "@/components/franchise/chapters";
import { FranchiseProvider } from "@/components/franchise/franchise-context";
import { LeadView } from "@/components/franchise/lead-view";
import { LpBook } from "@/components/franchise/lp-book/book";
import { LpFaq } from "@/components/franchise/lp-faq/faq";
import { LpFlow } from "@/components/franchise/lp-flow/flow";
import { LpGroups } from "@/components/franchise/lp-groups/groups";
import { LpHero } from "@/components/franchise/lp-hero/hero";
import { LpMoney } from "@/components/franchise/lp-money/money";
import { LpNumbers } from "@/components/franchise/lp-numbers/numbers";
import { LpOffer } from "@/components/franchise/lp-offer/offer";
import { LpPlatform } from "@/components/franchise/lp-platform/platform";
import { LpProcess } from "@/components/franchise/lp-process/process";
import { LpProof } from "@/components/franchise/lp-proof/proof";
import { UrgencyBar } from "@/components/franchise/urgency-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQ_ITEMS } from "@/content/franchise-page/faq";
import { FOUNDING, OFFER, PRICES_PUBLIC } from "@/content/offer";
import { breadcrumbs, faqPage, offerSchema } from "@/lib/schema";

/**
 * The /franchise page itself (Oleh's landing artboard, 2 Nov 2026): the
 * hero with the visitor's brand on the app, where the money goes, live
 * work, their own numbers in 3 steps, the founding offer, six things the
 * network runs on, every feature stage by stage, how we build, gym groups
 * that own their sites, questions, book a call.
 *
 * Rendered twice: inside the site at /franchise, and as the landing
 * version (/franchise?landing=true, rewritten to /lp/franchise) with no
 * site header and a short footer, so a visitor from an ad or a post stays
 * on the offer.
 */
export function FranchisePage({ landing = false }: { landing?: boolean }) {
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
      {PRICES_PUBLIC ? (
        <JsonLd
          data={offerSchema({
            name: "Founding partner set-up",
            price: OFFER.setupFee,
            currency: OFFER.currency,
            path: "/franchise",
            availabilityEnds: FOUNDING.termsClose,
          })}
        />
      ) : null}
      <UrgencyBar landing={landing} />
      {landing ? <LeadView /> : null}
      <ChapterNav />
      <LpHero />
      <LpMoney />
      <LpProof />
      <LpNumbers />
      <LpOffer />
      <LpPlatform />
      <LpFlow />
      <LpProcess />
      <LpGroups />
      <LpFaq />
      <LpBook />
    </FranchiseProvider>
  );
}
