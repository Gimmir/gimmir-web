import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Check } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

export function PricingSection({
  data,
}: {
  data: NonNullable<REVIEW_QUERY_RESULT>;
}) {
  const included = data.pricingIncluded ?? [];

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:p-10 md:p-14">
            {/* atmosphere */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(246,244,238,0.07) 1px, transparent 1.6px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full bg-lime/25 blur-[120px]"
            />

            <div className="relative grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
              {/* offer */}
              <div>
                <p className="font-mono text-sm uppercase tracking-widest text-lime">
                  {data.pricingEyebrow}
                </p>

                <div className="mt-6 flex items-end gap-3">
                  <span className="display text-[clamp(3.25rem,8vw,5.25rem)] leading-[0.9]">
                    {data.pricingPrice}
                  </span>
                  <span className="mb-2 text-lg text-paper/45">
                    {data.pricingPriceSuffix}
                  </span>
                </div>

                <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-paper/75">
                  {data.pricingLead}
                </p>

                <p className="mt-4 max-w-[46ch] leading-relaxed text-paper/55">
                  {data.pricingNote}
                </p>

                <div className="mt-9">
                  <Button cal variant="lime" arrow>
                    {data.pricingButtonLabel}
                  </Button>
                </div>
              </div>

              {/* what's included */}
              <div className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-7 backdrop-blur-sm sm:p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-paper/45">
                  {data.pricingIncludedLabel}
                </p>

                <ul className="mt-6 space-y-4">
                  {included.map((item) => (
                    <li key={item} className="flex items-center gap-3.5">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                        <Check className="size-3.5" />
                      </span>
                      <span className="text-lg text-paper/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
