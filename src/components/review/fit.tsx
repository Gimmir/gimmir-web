import { Container } from "@/components/ui/container";
import { Check, X } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

export function FitSection({
  data,
}: {
  data: NonNullable<REVIEW_QUERY_RESULT>;
}) {
  const fits = data.fitChecks ?? [];

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="06" title={data.fitHeading} />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-stretch">
          {/* a fit */}
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-9">
              <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-lime" />
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <Check className="size-4" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  A fit
                </span>
              </div>

              <ul className="mt-7 flex flex-col gap-5">
                {fits.map((f, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-lg leading-relaxed text-ink">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* not a fit */}
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
                  Not a fit
                </span>
              </div>

              <h3 className="mt-7 text-xl font-bold tracking-tight">
                {data.fitNotLabel}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-muted">
                {data.fitNotBody}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
