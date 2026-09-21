import { RouteSelector } from "@/components/shared/route-selector";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";

/** The 404 body: say so plainly, then route the visitor like the home page. */
export function NotFoundContent() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
          <Pill>Page not found</Pill>
          <h1 className="display mt-8 text-[1.9rem] leading-[1.2] sm:text-hero sm:leading-[0.98]">
            That page doesn&rsquo;t exist. <Mark>Your platform could.</Mark>
          </h1>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl">
            The link may be old, or the page moved when we rebuilt the site.
            Pick where you fit below, or start from the home page.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button href="/" arrow>
              Home page
            </Button>
            <Button href="/contact" variant="outline">
              Book a call
            </Button>
          </div>
        </Container>
      </section>
      <RouteSelector />
    </>
  );
}
