import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

export function FinalCta({
  data,
}: {
  data: NonNullable<REVIEW_QUERY_RESULT>;
}) {
  return (
    <FinalCtaPanel
      eyebrow={data.finalCtaEyebrow!}
      title={data.finalCtaHeading}
      intro={data.finalCtaIntro!}
      buttonLabel={data.finalCtaButtonLabel!}
    />
  );
}
