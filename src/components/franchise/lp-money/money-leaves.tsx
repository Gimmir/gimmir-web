"use client";

import { useFranchise } from "@/components/franchise/franchise-context";
import { platformName } from "@/components/franchise/lp-numbers/shared";
import { formatMoney } from "@/lib/franchise-calc";

/**
 * The chapter's big figure, live: what the visitor's network pays its
 * platform a year. The number never animates as it changes.
 */
export function MoneyLeaves() {
  const { model } = useFranchise();
  const { projection, values, answers } = model;

  return (
    <>
      <p
        className="display m-0 text-[clamp(68px,12vw,156px)] leading-none tracking-[-0.055em] [font-stretch:100%]"
      >
        {formatMoney(projection.leavesYear)}
      </p>
      <p className="m-0 max-w-[640px] text-[19px] leading-[1.5] text-muted sm:text-[21px]">
        leaves a {values.units}-studio network for {platformName(answers.platform)}{" "}
        every year. HQ earns none of it.
      </p>
    </>
  );
}
