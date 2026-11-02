import type { FlowActor } from "@/content/franchise-page/flow";

/** The actor's fill and text colour (pill, tab badge, step badge). */
export const ACTOR_FILL: Record<FlowActor, string> = {
  HQ: "bg-ink text-lime",
  Studio: "bg-line text-ink",
  Member: "bg-lime text-ink",
  Auto: "bg-surface text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink)]",
};
