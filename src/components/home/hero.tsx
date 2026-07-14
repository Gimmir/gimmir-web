import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
        <Reveal>
          <Pill>Product engineering for sport &amp; fitness</Pill>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display mt-8 text-[1.9rem] leading-[1.2] sm:text-hero sm:leading-[0.98]">
            Built by founders{" "}
            <br />
            who have <Mark>shipped</Mark>{" "}
            <span className="font-serif font-normal italic tracking-tight">
              real
            </span>{" "}
            <br />
            fitness platforms.
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-12">
            <p className="max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">
              Gimmir builds the apps and platforms behind sport and fitness
              brands that are scaling. Start with a free review call with the
              founders who built UN1T&rsquo;s franchise platform and co-founded
              Jimmy Coach.
            </p>
            <div className="flex shrink-0 flex-wrap gap-3 sm:gap-3.5">
              <Button
                href="/the-review"
                size="sm"
                className="sm:h-[52px] sm:px-7 sm:text-base"
              >
                <span className="sm:hidden">Founder review call</span>
                <span className="hidden sm:inline">
                  Book a founder review call
                </span>
                <ArrowRight className="hidden size-[18px] transition-transform duration-200 group-hover:translate-x-0.5 sm:inline-block" />
              </Button>
              <Button
                href="#work"
                variant="outline"
                size="sm"
                className="sm:h-[52px] sm:px-7 sm:text-base"
              >
                See our work
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
