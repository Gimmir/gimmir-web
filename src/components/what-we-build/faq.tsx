import { FaqList, type FaqItem } from "@/components/shared/faq-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export const WHAT_WE_BUILD_FAQ_ITEMS: FaqItem[] = [
  {
    key: "fitness-only",
    question: "Do you only do fitness?",
    answer:
      "Fitness is our core. We also build wellness and prevention apps, and we take on select adjacent work. We’ll always tell you honestly if something isn’t our lane.",
  },
  {
    key: "stack",
    question: "What stack do you build with?",
    answer:
      "React Native (Expo), TypeScript, Supabase, Next.js and Stripe. If you’re on something adjacent, we’ll tell you honestly whether we’re the right team.",
  },
  {
    key: "ownership",
    question: "Who owns what you build?",
    answer:
      "You do, from day one: code, repositories, cloud accounts and app-store listings in your name.",
  },
];

export function WhatWeBuildFaq() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="05" title="Questions, answered straight." />
        </Reveal>

        <FaqList items={WHAT_WE_BUILD_FAQ_ITEMS} className="mt-12" />
      </Container>
    </section>
  );
}
