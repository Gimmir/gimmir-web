import { SplitBooking } from "@/components/shared/split-booking";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
        <Reveal eager>
          <Pill>What we build</Pill>
        </Reveal>

        <Reveal eager delay={60}>
          <h1 className="display mt-8 text-[1.95rem] leading-[1.14] sm:text-hero sm:leading-[0.98]">
            The platforms <Mark>we build.</Mark>
          </h1>
        </Reveal>

        <Reveal eager delay={140}>
          <div className="mt-10 flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-12">
            <p className="max-w-[54ch] text-lg leading-relaxed text-muted md:text-xl">
              Native apps, web dashboards, back offices and payments, built to
              be owned, not rented. Here’s the full picture, and where our edges
              are.
            </p>
            <SplitBooking placement="hero" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
