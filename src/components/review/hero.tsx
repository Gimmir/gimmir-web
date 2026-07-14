import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
        <Reveal>
          <Pill>For funded sport &amp; fitness founders</Pill>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display mt-8 text-[1.7rem] leading-[1.2] sm:text-hero sm:leading-[0.98]">
            Find out if your product{" "}
            <br />
            will survive growth,{" "}
            <br />
            <Mark full>before it costs you.</Mark>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-12">
            <p className="max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">
              In two weeks, the founders who built UN1T&rsquo;s platform and
              Jimmy Coach review your product, code, or plan and hand you a clear
              roadmap of what holds up, what breaks at scale, and what to do
              about it.
            </p>
            <div className="flex shrink-0 flex-col gap-3.5">
              <div className="flex flex-wrap gap-3.5">
                <Button href="#start" arrow>
                  Book a free review call
                </Button>
              </div>
              <p className="text-sm text-faint">
                20-minute call with the founders. No pitch, no obligation.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
