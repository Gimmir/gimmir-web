import { BookingCta } from "@/components/shared/booking-cta";
import { FounderChip } from "@/components/shared/founder-chip";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { BOOKINGS } from "@/lib/booking";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
        <Reveal eager>
          <Pill>For operators &amp; franchisors with 8+ locations</Pill>
        </Reveal>

        <Reveal eager delay={60}>
          <h1 className="display mt-8 text-[1.7rem] leading-[1.2] sm:text-hero sm:leading-[0.98]">
            Stop renting your fitness platform. <Mark>Own it.</Mark>
          </h1>
        </Reveal>

        <Reveal eager delay={140}>
          <div className="mt-10 flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-[48ch]">
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                At eight sites and up, you pay for your booking platform three
                times: a licence per location, a margin on every card payment,
                and a roadmap you don&apos;t control. I&apos;m Nazar. We moved
                UN1T, a fitness franchise with 10+ locations, onto an app and
                back office they own.
              </p>
              <FounderChip id="nazar" className="mt-7" />
            </div>
            <div className="flex shrink-0 flex-col gap-3.5">
              <div className="flex flex-col gap-3 sm:items-start">
                <BookingCta booking="costCheck" placement="hero" />
                <Button href="#ladder" variant="outline">
                  Start with a Platform Fee Teardown
                </Button>
              </div>
              <p className="max-w-[40ch] text-sm text-faint">
                Free, {BOOKINGS.costCheck.minutes} minutes. Bring your last
                platform invoice and you leave with your number.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
