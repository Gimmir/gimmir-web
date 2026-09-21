import { TrackedCta } from "@/components/analytics/tracked-cta";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
        <Reveal eager>
          <Pill>For operators &amp; franchisors with 8+ locations</Pill>
        </Reveal>

        <Reveal eager delay={60}>
          <h1 className="display mt-8 text-[1.7rem] leading-[1.2] sm:text-hero sm:leading-[0.98]">
            Stop renting the platform{" "}
            <Mark>your studios run on.</Mark>
          </h1>
        </Reveal>

        <Reveal eager delay={140}>
          <div className="mt-10 flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-12">
            <p className="max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">
              At eight sites and up, you pay for your booking platform three
              times: a licence per location, a margin on every card payment,
              and a roadmap you don&apos;t control. We moved UN1T, a fitness
              franchise with 10+ locations, onto an app and back office they
              own. About $10k a month stayed in the business.
            </p>
            <div className="flex shrink-0 flex-col gap-3.5">
              <div className="flex flex-wrap gap-3.5">
                <TrackedCta
                  cal="costCheck"
                  arrow
                  event="operators_cost_check_cta_click"
                >
                  Get your platform cost check
                </TrackedCta>
              </div>
              <p className="text-sm text-faint">
                20 minutes with the founders. Bring your last platform
                invoice and you leave with your number.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
