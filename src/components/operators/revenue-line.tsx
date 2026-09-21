import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function RevenueLine() {
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
                02
              </span>
              <h2 className="display max-w-[24ch] text-display">
                For franchisors, the platform can be a revenue line.
              </h2>
            </div>
            <p className="relative mt-6 max-w-[62ch] text-lg leading-relaxed text-[#c9c6bc]">
              When you own the platform, you set the technology fee, you keep
              the transaction margin, and member data stays with the brand
              when a franchisee leaves. The same software that was a cost at
              HQ becomes part of the franchise model.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
