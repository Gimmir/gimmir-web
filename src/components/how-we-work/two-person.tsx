import { Container } from "@/components/ui/container";
import { Check } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import type { HOW_WE_WORK_QUERY_RESULT } from "@/sanity/types";

/** "It's just two of you": the key-person question, answered in the open. */
export function TwoPersonSection({
  data,
}: {
  data: NonNullable<HOW_WE_WORK_QUERY_RESULT>;
}) {
  if (!data.twoPersonHeading) return null;
  const bullets = data.twoPersonBullets ?? [];

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:p-10 md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(246,244,238,0.05)_1px,transparent_1.5px)] [background-size:22px_22px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-lime/20 blur-[90px]"
            />
            <div className="relative flex items-baseline gap-3.5">
              <span className="font-serif text-lg italic text-faint sm:text-xl">
                03
              </span>
              <h2 className="display max-w-[26ch] text-display">
                {data.twoPersonHeading}
              </h2>
            </div>
            <div className="relative mt-8 grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-14">
              <p className="text-lg leading-relaxed text-[#c9c6bc]">
                {data.twoPersonBody}
              </p>
              {bullets.length ? (
                <ul className="flex flex-col gap-4">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                        <Check className="size-3.5" />
                      </span>
                      <span className="text-lg leading-relaxed text-paper/85">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
