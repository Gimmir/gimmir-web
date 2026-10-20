import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { franchise } from "@/content/franchise";

import { Ctas } from "./ctas";

/**
 * /franchise ⑫, the last ask: a dark card on paper (so the page doesn't
 * run ink into the footer), both buttons and the email line.
 */
export function FranchiseClose() {
  const { title, email } = franchise.close;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" id="close" data-tone="paper">
      <Container className="pb-20 md:pb-28">
        <div className="fade rounded-[32px] bg-ink p-7 text-paper sm:p-10 md:p-14">
          <h2 className="display max-w-[18ch] text-[length:var(--text-title)] leading-[1.02]">
            {title}
          </h2>
          <div className="fade mt-8 md:mt-10" style={d(200)}>
            <Ctas placement="franchise-close" onDark />
          </div>
          <p className="mt-6 text-[15px] text-paper/60">
            {email.lead}{" "}
            <a
              href={`mailto:${email.address}`}
              className="font-semibold text-paper underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-paper"
            >
              {email.address}
            </a>
          </p>
        </div>
      </Container>
    </Stage>
  );
}
