import { BookingCta } from "@/components/shared/booking-cta";
import { FounderChip } from "@/components/shared/founder-chip";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { BOOKINGS } from "@/lib/booking";
import { hostNames } from "@/lib/founders";

export function Hero() {
  const founderReview = BOOKINGS.founderReview;

  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
        <Reveal eager>
          <Pill>Health &amp; wellness</Pill>
        </Reveal>

        <Reveal eager delay={60}>
          <h1 className="display mt-8 text-[1.7rem] leading-[1.2] sm:text-hero sm:leading-[0.98]">
            Wellness apps people keep opening, <Mark>and you can scale.</Mark>
          </h1>
        </Reveal>

        <Reveal eager delay={140}>
          <div className="mt-10 flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-[48ch]">
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                The engineering behind a fitness platform and a wellness app is
                the same craft: real-time data, subscriptions, retention, and
                privacy done properly. I&apos;m Oleh. We build wellness and
                prevention products: sleep, nutrition, women&apos;s health,
                longevity, metabolic and mental wellbeing.
              </p>
              <FounderChip id="oleh" className="mt-7" />
            </div>
            <div className="flex shrink-0 flex-col gap-3.5">
              <div className="flex flex-col gap-3 sm:items-start">
                <BookingCta booking="founderReview" placement="hero" />
                <Button href="/work/jimmy-coach" variant="outline">
                  See how we built Jimmy Coach
                </Button>
              </div>
              <p className="max-w-[40ch] text-sm text-faint">
                Free, {founderReview.minutes} minutes with{" "}
                {hostNames(founderReview.hosts)}. No pitch, no obligation.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
