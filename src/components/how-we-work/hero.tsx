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
          <Pill>How we work</Pill>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display mt-8 text-[1.95rem] leading-[1.14] sm:text-hero sm:leading-[0.98]">
            Outsourcing, without
            <br />
            the part <Mark>everyone hates.</Mark>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-12">
            <p className="max-w-[54ch] text-lg leading-relaxed text-muted md:text-xl">
              You have probably been burned, or watched a friend get burned: the
              senior who vanishes after the contract is signed, the juniors you
              never agreed to, the code you somehow cannot touch. Here is how
              Gimmir is different, point by point.
            </p>
            <div className="flex shrink-0 flex-col gap-3.5">
              <div className="flex flex-wrap gap-3.5">
                <Button href="/the-review" arrow>
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
