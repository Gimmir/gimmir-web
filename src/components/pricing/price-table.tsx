import Link from "next/link";

import { BookingCta } from "@/components/shared/booking-cta";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import type { BookingId } from "@/lib/booking";
import { OFFERS, formatPrice, type Offer, type OfferId } from "@/lib/offers";

export type PriceRowAction =
  | { kind: "booking"; booking: BookingId; label: string }
  | { kind: "link"; href: string; label: string };

export type PriceRow = {
  offer: Offer;
  /** Overrides `offer.summary` for this table only. */
  summary?: string;
  action: PriceRowAction;
};

/**
 * Pairs offer ids (in ladder order) with the row action and, optionally, a
 * summary override each id needs. Throws on a missing mapping so a new
 * offer added to a ladder can't silently render without a row action.
 */
export function buildRows(
  ids: OfferId[],
  actions: Partial<Record<OfferId, PriceRowAction>>,
  summaries: Partial<Record<OfferId, string>> = {},
): PriceRow[] {
  return ids.map((id) => {
    const action = actions[id];
    if (!action) throw new Error(`pricing: no row action for offer "${id}"`);
    return { offer: OFFERS[id], summary: summaries[id], action };
  });
}

function RowAction({ action }: { action: PriceRowAction }) {
  if (action.kind === "booking") {
    return (
      <BookingCta
        booking={action.booking}
        placement="pricing"
        size="sm"
        label={action.label}
      />
    );
  }
  return (
    <Link
      href={action.href}
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
    >
      {action.label}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

function WhatItIs({ offer, summary }: { offer: Offer; summary?: string }) {
  return (
    <div className="max-w-[38ch] leading-relaxed text-muted">
      <p>{summary ?? offer.summary}</p>
      {offer.guarantee ? (
        <p className="mt-2.5 flex flex-wrap items-start gap-x-2 gap-y-1 text-ink">
          <span className="inline-flex shrink-0 items-center rounded-full bg-lime px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ink">
            Money-back
          </span>
          <span>{offer.guarantee}</span>
        </p>
      ) : null}
      {offer.credit ? (
        <p className="mt-2.5 text-sm text-faint">{offer.credit}</p>
      ) : null}
    </div>
  );
}

const th =
  "py-4 pr-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-muted";

/**
 * A ladder of offers: a real `<table>` from `md` up (with a screen-reader
 * caption, since the visual header row is enough for sighted users), and
 * stacked cards below it so a wide table never forces horizontal scroll.
 */
export function PriceTable({
  caption,
  rows,
}: {
  caption: string;
  rows: PriceRow[];
}) {
  return (
    <Reveal delay={80}>
      <div className="mt-12">
        <table className="hidden w-full border-collapse md:table">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={th}>
                Offer
              </th>
              <th scope="col" className={th}>
                Price
              </th>
              <th scope="col" className={th}>
                Time
              </th>
              <th scope="col" className={th}>
                What it is
              </th>
              <th scope="col" className="py-4">
                <span className="sr-only">Book or read more</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ offer, summary, action }) => (
              <tr
                key={offer.id}
                className="border-b border-line align-top last:border-b-0"
              >
                <td className="py-6 pr-4 text-lg font-bold tracking-tight">
                  {offer.name}
                </td>
                <td className="py-6 pr-4 text-2xl font-extrabold tracking-tight">
                  {formatPrice(offer)}
                </td>
                <td className="py-6 pr-4 text-muted">{offer.duration}</td>
                <td className="py-6 pr-4">
                  <WhatItIs offer={offer} summary={summary} />
                </td>
                <td className="py-6">
                  <RowAction action={action} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col gap-4 md:hidden">
          {rows.map(({ offer, summary, action }) => (
            <div
              key={offer.id}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold tracking-tight">
                  {offer.name}
                </h3>
                <span className="shrink-0 text-xl font-extrabold tracking-tight">
                  {formatPrice(offer)}
                </span>
              </div>
              <p className="mt-1 text-sm text-faint">{offer.duration}</p>
              <div className="mt-4">
                <WhatItIs offer={offer} summary={summary} />
              </div>
              <div className="mt-5">
                <RowAction action={action} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
