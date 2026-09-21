import Link from "next/link";

import { BookingCta } from "@/components/shared/booking-cta";
import { FounderChip } from "@/components/shared/founder-chip";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { BOOKINGS } from "@/lib/booking";
import { hostNames } from "@/lib/founders";
import { OFFERS, formatPrice } from "@/lib/offers";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

const call = BOOKINGS.founderReview;

export function Hero({ data }: { data: NonNullable<REVIEW_QUERY_RESULT> }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
        <Reveal eager>
          <Pill>{data.heroEyebrow}</Pill>
        </Reveal>

        <Reveal eager delay={60}>
          <h1 className="display mt-8 text-[1.7rem] leading-[1.2] sm:text-hero sm:leading-[0.98]">
            {data.heroHeading}
            {data.heroAccent ? (
              <>
                {" "}
                <Mark>{data.heroAccent}</Mark>
              </>
            ) : null}
          </h1>
        </Reveal>

        <Reveal eager delay={140}>
          <div className="mt-10 flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-[48ch]">
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                {data.heroSubhead}
              </p>
              <FounderChip id="oleh" className="mt-7" />
            </div>
            <div className="flex shrink-0 flex-col gap-3.5">
              <div className="flex flex-col gap-3 sm:items-start">
                <BookingCta booking="founderReview" placement="hero" />
                <Button href="#pricing" variant="outline">
                  Get {OFFERS.review.name} ({formatPrice(OFFERS.review)})
                </Button>
              </div>
              <p className="text-sm text-faint">
                Free, {call.minutes} minutes with {hostNames(call.hosts)}. No
                pitch, no obligation.
              </p>
              <Link
                href="/operators"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
              >
                Running 8+ locations instead?
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
