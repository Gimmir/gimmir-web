import { Container } from "@/components/ui/container";
import { Check } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const ITEMS = [
  "A branded member app (iOS & Android) your members actually want to open.",
  "A back office for classes, memberships, multi-location and staff.",
  "Payments, fees and payouts built around how you actually operate.",
  "A multi-location data model that reports across every site.",
  "Everything in your name: code, repos, cloud and app-store listings.",
];

export function WhatYouGet() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="03" title="Your own platform, end to end." />
        </Reveal>

        <Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-6 rounded-2xl border border-line bg-surface p-7 md:grid-cols-2 md:p-10">
            {ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <Check className="size-3.5" />
                </span>
                <span className="text-lg leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
