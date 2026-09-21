import { FoundersPortrait } from "@/components/home/founders-portrait";
import { BookingCta } from "@/components/shared/booking-cta";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Check } from "@/components/ui/icons";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { BOOKINGS } from "@/lib/booking";
import type { HOME_QUERY_RESULT } from "@/sanity/types";

/**
 * Split hero from xl up: the pitch and its call to action on the left, the
 * founders' faces on the right from the headline down, so the eye runs
 * headline → faces → button. Below xl the faces follow the buttons.
 */
export function Hero({ data }: { data: NonNullable<HOME_QUERY_RESULT> }) {
  const trust = data.heroTrustStrip ?? [];

  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-16 pt-28 sm:pt-32 md:pb-24 md:pt-36">
        <div className="grid gap-14 xl:grid-cols-12 xl:gap-x-10">
          <div className="xl:col-span-8">
            <Reveal eager>
              <Pill>{data.heroEyebrow}</Pill>
            </Reveal>

            <Reveal eager delay={60}>
              <h1 className="display mt-8 text-[1.9rem] leading-[1.2] sm:text-hero sm:leading-[0.98] xl:text-[4.4rem]">
                {data.heroHeading}
                {data.heroAccent ? (
                  <>
                    {" "}
                    {/* the highlighted promise always gets its own line in the split */}
                    <br className="hidden xl:block" />
                    <Mark>{data.heroAccent}</Mark>
                  </>
                ) : null}
              </h1>
            </Reveal>

            <Reveal eager delay={140}>
              <p className="mt-9 max-w-[50ch] text-lg leading-relaxed text-muted md:mt-10 md:text-xl">
                {data.heroSubhead}
              </p>

              <div className="mt-9 flex flex-wrap gap-3 sm:gap-3.5">
                <BookingCta
                  booking="costCheck"
                  placement="hero"
                  label={BOOKINGS.costCheck.short}
                />
                <Button
                  href={data.heroSecondaryCtaHref ?? "/work"}
                  variant="outline"
                >
                  {data.heroSecondaryCtaLabel ?? "See the work"}
                </Button>
              </div>

              {trust.length ? (
                <ul className="mt-9 flex max-w-[640px] flex-wrap gap-x-6 gap-y-2.5 border-t border-line pt-6 text-sm text-muted">
                  {trust.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="flex size-[18px] items-center justify-center rounded-full bg-lime text-ink">
                        <Check className="size-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          </div>

          {/* faces earn the trust the button asks for */}
          <FoundersPortrait className="w-full max-w-[420px] xl:col-span-4 xl:mt-[5.5rem] xl:max-w-none" />
        </div>
      </Container>
    </section>
  );
}
