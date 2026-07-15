import type { Metadata } from "next";

import { Hero } from "@/components/founders/hero";
import { StorySection } from "@/components/founders/story";
import { BelieveSection } from "@/components/founders/believe";
import { PeopleSection } from "@/components/founders/people";
import { StudioSection } from "@/components/founders/studio";
import { FinalCtaPanel } from "@/components/shared/final-cta-panel";

export const metadata: Metadata = {
  title: "Founders",
  description:
    "Gimmir is led by two founders, Nazar Moroz and Oleh Palazhii, who built and shipped the platforms behind UN1T and Jimmy Coach as owners. Meet the people you work with directly.",
  alternates: { canonical: "/founders" },
};

export default function FoundersPage() {
  return (
    <>
      <Hero />
      <StorySection />
      <BelieveSection />
      <PeopleSection />
      <StudioSection />
      <FinalCtaPanel
        eyebrow="Let’s talk"
        title="Let’s look at what you are building."
        intro="The best way to know if we are the right team is to talk to us directly."
        buttonLabel="Book a founder review call"
      />
    </>
  );
}
