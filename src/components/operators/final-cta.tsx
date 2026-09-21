import { TrackedCta } from "@/components/analytics/tracked-cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { CAL_LINK_OPERATORS } from "@/lib/cal";

/**
 * Mirrors the look of `FinalCtaPanel` but is fully static (no Sanity fetch)
 * and always books the operators Cal link, per the /operators content brief.
 */
export function OperatorsFinalCta() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-ink text-paper">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(246,244,238,0.05)_1px,transparent_1.5px)] [background-size:22px_22px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-lime/20 blur-[90px]"
            />

            <div className="relative flex flex-col gap-10 p-8 sm:p-10 md:flex-row md:items-center md:justify-between md:gap-12 md:p-14">
              <div className="max-w-xl">
                <p className="font-mono text-sm uppercase tracking-widest text-lime">
                  Platform cost check
                </p>
                <h2 className="display mt-4 text-display">Find your number first.</h2>
                <p className="mt-5 text-lg leading-relaxed text-[#c9c6bc]">
                  Twenty minutes with the founders. Bring your last platform
                  invoice and processing statement.
                </p>
              </div>

              <div className="flex w-full shrink-0 flex-col items-start gap-5 md:w-auto md:items-end">
                <TrackedCta
                  cal={CAL_LINK_OPERATORS}
                  variant="lime"
                  arrow
                  event="operators_cost_check_cta_click"
                >
                  Get your platform cost check
                </TrackedCta>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
