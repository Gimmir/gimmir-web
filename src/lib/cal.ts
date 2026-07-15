/**
 * Single source of truth for the Cal.com "founder review" booking popup.
 * Consumed by both <CalProvider> (which loads and configures the embed) and
 * <Button cal> (which renders the trigger via Cal's data-attribute delegation).
 */
export const CAL_NAMESPACE = "founder-review";
export const CAL_LINK = "nazarmoroze/founder-review";

/** Per-trigger config, serialized onto `data-cal-config`. */
export const CAL_CONFIG = JSON.stringify({
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true",
  theme: "auto",
});

/** Namespace-wide UI config, passed once to `cal("ui", …)`. */
export const CAL_UI = {
  cssVarsPerTheme: {
    light: { "cal-brand": "#9dcd00" },
    dark: { "cal-brand": "#9dcd00" },
  },
  hideEventTypeDetails: false,
  layout: "month_view",
} as const;
