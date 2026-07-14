import { createClient } from "@sanity/client";

type Redirect = { source: string; destination: string; permanent: boolean };

/**
 * Reads managed redirects from Sanity for use in next.config's `redirects()`.
 * Resilient: returns [] if Sanity is unreachable so builds never break.
 */
export async function fetchRedirects(): Promise<Redirect[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) return [];

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-02-01",
    useCdn: true,
    perspective: "published",
  });

  try {
    const docs = await client.fetch<
      { source?: string; destination?: string; permanent?: boolean }[]
    >(
      `*[_type == "redirect" && defined(source) && defined(destination)]{ source, destination, permanent }`,
    );
    return (docs ?? [])
      .filter((d) => d.source && d.destination)
      .map((d) => ({
        source: d.source!,
        destination: d.destination!,
        permanent: d.permanent !== false,
      }));
  } catch (error) {
    console.error("Failed to load redirects from Sanity:", error);
    return [];
  }
}
