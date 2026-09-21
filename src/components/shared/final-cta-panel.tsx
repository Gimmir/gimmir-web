import Image from "next/image";

import { BookingCta } from "@/components/shared/booking-cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { BOOKINGS, type BookingId } from "@/lib/booking";
import { FOUNDERS, hostNames, type FounderId } from "@/lib/founders";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { FOUNDERS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

/**
 * The dark closing CTA: the faces of whoever is on the call, and one signed
 * button per call offered (two on pages that serve both audiences).
 */
export async function FinalCtaPanel({
  eyebrow,
  title,
  intro,
  bookings = ["founderReview"],
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  bookings?: BookingId[];
}) {
  const [{ data: founders }, { data: settings }] = await Promise.all([
    sanityFetch({ query: FOUNDERS_QUERY }),
    sanityFetch({ query: SETTINGS_QUERY }),
  ]);

  const calls = bookings.map((id) => BOOKINGS[id]);
  const hosts: FounderId[] = [...new Set(calls.flatMap((c) => c.hosts))];
  const hostIds = new Set<string>(hosts.map((h) => FOUNDERS[h].sanityId));
  const onCall = founders.filter((f) => hostIds.has(f._id));
  const minutes = [...new Set(calls.map((c) => c.minutes))].sort(
    (a, b) => a - b,
  );
  const helper = `Free · ${minutes.join(" to ")} min · no pitch, no obligation.`;
  const caption =
    hosts.length === 1 ? FOUNDERS[hosts[0]].role : settings?.finalCtaCaption;

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
                    {onCall.map((f) =>
                      f.photo ? (
                        <Image
                          key={f._id}
                          src={urlFor(f.photo)
                            .width(80)
                            .height(80)
                            .fit("crop")
                            .url()}
                          alt={f.name ?? ""}
                          width={40}
                          height={40}
                          className="size-10 rounded-full object-cover object-top ring-[3px] ring-ink"
                        />
                      ) : null,
                    )}
                  </div>
                  <div className="text-sm leading-tight md:text-right">
                    <div className="font-semibold text-paper">
                      {hostNames(hosts)}
                    </div>
                    <div className="text-[#9b988e]">{caption}</div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end">
                  {bookings.map((id, i) => (
                    <BookingCta
                      key={id}
                      booking={id}
                      placement="final"
                      variant={i === 0 ? "lime" : "outlineLight"}
                    />
                  ))}
                </div>

                <p className="text-sm text-[#86837a]">{helper}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
