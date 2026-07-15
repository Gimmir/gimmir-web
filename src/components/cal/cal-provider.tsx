"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

import { CAL_NAMESPACE, CAL_UI } from "@/lib/cal";

/**
 * Loads the Cal.com embed once and applies the namespace UI config. Renders
 * nothing — the actual triggers are any elements carrying the Cal data
 * attributes (see <Button cal>), which Cal wires up via event delegation.
 */
export function CalProvider() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", CAL_UI);
    })();
  }, []);

  return null;
}
