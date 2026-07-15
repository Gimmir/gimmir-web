import { TrackedCta } from "@/components/analytics/tracked-cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function FinalCtaPanel({
  eyebrow,
  title,
  intro,
  buttonLabel,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  buttonLabel: string;
}) {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-ink text-paper">
            {/* atmosphere */}
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
                  {eyebrow}
                </p>
                <h2 className="display mt-4 text-display">{title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-[#c9c6bc]">
                  {intro}
                </p>
              </div>

              <div className="flex w-full shrink-0 flex-col items-start gap-5 md:w-auto md:items-end">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    <span className="flex size-10 items-center justify-center rounded-full bg-lime text-[13px] font-bold text-ink ring-[3px] ring-ink">
                      NM
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-full bg-paper text-[13px] font-bold text-ink ring-[3px] ring-ink">
                      OP
                    </span>
                  </div>
                  <div className="text-sm leading-tight md:text-right">
                    <div className="font-semibold text-paper">
                      Nazar &amp; Oleh
                    </div>
                    <div className="text-[#9b988e]">
                      The founders, on the call
                    </div>
                  </div>
                </div>

                <TrackedCta
                  cal
                  variant="lime"
                  arrow
                  event="review_call_cta_click"
                >
                  {buttonLabel}
                </TrackedCta>

                <p className="text-sm text-[#86837a]">
                  Free · 20 min · no pitch, no obligation.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
