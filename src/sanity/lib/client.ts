import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // fresh reads; runtime fetches go through the Live API
  perspective: "published", // Live API / draft mode override this when previewing
  stega: {
    studioUrl,
  },
});
