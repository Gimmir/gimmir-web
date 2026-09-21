import { Container } from "@/components/ui/container";
import { Check, X } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const FITS = [
  "You run or franchise 8+ locations.",
  "Platform and payment fees are a five-figure annual line.",
  "You plan to add sites in the next 18 months.",
  "You want the member app to be yours, not a skin.",
];

const NOT_FITS = [
  "You have fewer than 8 sites — the payback is usually too long, and we will tell you so.",
  "Your current platform does everything you need at a price you're happy with.",
  "You need it live in six weeks.",
];

export function Fit() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="03" title="It doesn't make sense for everyone." />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-stretch">
          {/* probably works if */}
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-9">
              <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-lime" />
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <Check className="size-4" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  It probably works if
                </span>
              </div>

              <ul className="mt-7 flex flex-col gap-5">
                {FITS.map((f) => (
                  <li key={f} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-lg leading-relaxed text-ink">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* probably doesn't if */}
          <Reveal delay={70} className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper-2 p-7 md:p-9">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1.5 bg-ink/12"
              />
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/45">
                  <X className="size-3.5" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-faint">
                  It probably doesn&apos;t if
                </span>
              </div>

              <ul className="mt-7 flex flex-col gap-5">
                {NOT_FITS.map((f) => (
                  <li key={f} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/45">
                      <X className="size-3.5" />
                    </span>
                    <span className="text-lg leading-relaxed text-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
