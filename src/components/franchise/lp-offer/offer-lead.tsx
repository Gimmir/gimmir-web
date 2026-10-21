"use client";

import { useFranchise } from "@/components/franchise/franchise-context";
import { OFFER_COPY as C } from "@/content/franchise-page/offer";
import { OFFER } from "@/content/offer";
import { formatMonths } from "@/lib/franchise-calc";

/**
 * The offer's lead, from the visitor's own numbers: how many months of the
 * tech fee their studios pay HQ the set-up equals. Without a tech fee it
 * says only what founding partners do.
 */
export function OfferLead() {
  const { model } = useFranchise();
  const { units, techFee } = model.values;
  const monthly = units * techFee;
  return (
    <>
      {monthly > 0 ? `${C.leadVersus(formatMonths(OFFER.setupFee / monthly), units)} ` : null}
      {C.lead}
    </>
  );
}
