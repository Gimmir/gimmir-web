import { BookingCta } from "@/components/shared/booking-cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import {
  OFFERS,
  OPERATOR_LADDER,
  formatPrice,
  type OfferId,
} from "@/lib/offers";

const teardown = formatPrice(OFFERS.teardown);

/** Each rung in Nazar's words; names, prices and durations come from offers. */
const BODY: Partial<Record<OfferId, string>> = {
  costCheck:
    "I'll look at what you pay now and tell you if there's real money to save. No cost, no obligation.",
  teardown: `A fixed, written breakdown of what you pay and what you'd save owning your platform: the real three-year cost of renting, a rent-vs-own model with payback in months, and a plain go / no-go. If I can't find at least ${teardown} a year in savings, you get your money back.`,
  blueprint:
    "The full migration and build plan: architecture, member-data and payments migration, and a fixed build quote. Credited to your build.",
  build:
    "Your own platform, priced and delivered against milestones you approve. Code, repos and accounts in your name from the first commit.",
};

export function OfferLadder() {
  return (
    <section
      id="ladder"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="05"
            title="Four ways to start. Pick your risk level."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {OPERATOR_LADDER.map((id, i) => {
            const o = OFFERS[id];
            const price = formatPrice(o);
            const tag =
              typeof o.price === "number" && o.price > 0
                ? `${price} fixed · ${o.duration}`
                : `${price} · ${o.duration.toLowerCase()}`;
            return (
              <Reveal key={id} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col gap-3.5 rounded-2xl border border-line bg-surface p-7 md:p-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex w-fit items-center rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                    {tag}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight">{o.name}</h3>
                  <p className="leading-relaxed text-muted">{BODY[id]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-10">
            <BookingCta booking="costCheck" placement="ladder" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
