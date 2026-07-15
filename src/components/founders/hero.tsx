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
          <Pill>About Gimmir</Pill>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display mt-8 text-[1.95rem] leading-[1.14] sm:text-hero sm:leading-[0.98]">
            We build fitness products
            <br />
            because we have <Mark>built our own.</Mark>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-12">
            <p className="max-w-[56ch] text-lg leading-relaxed text-muted md:text-xl">
              Gimmir is a product studio led by two founders, Nazar Moroz and
              Oleh Palazhii. We have built and shipped real fitness platforms as
              owners, and we now do it for founders who need software that holds
              up as they grow.
            </p>
            <div className="flex shrink-0 flex-col gap-3.5">
              <div className="flex flex-wrap gap-3.5">
                <Button cal arrow>
                  Book a founder review call
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
