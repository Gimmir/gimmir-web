const FALLBACK_SITE_URL = "http://localhost:3000";

/**
 * The canonical site origin, always a valid absolute URL (protocol + host, no
 * trailing slash). `NEXT_PUBLIC_SITE_URL` is often set as a bare host in Vercel
 * (e.g. `gimmir.com`); we add `https://` when the protocol is missing so
 * `new URL(SITE_URL)` in `metadataBase`, the sitemap, and robots never throw.
 */
function resolveSiteUrl(raw: string | undefined): string {
  const value = raw?.trim();
  if (!value) return FALLBACK_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const BRAND = "Gimmir";

/**
 * Open Graph + Twitter metadata for a page. Next.js replaces (not merges) the
 * whole `openGraph` object across segments — and a config-level `openGraph`
 * also drops the file-convention image — so every page spreads a complete
 * object from here, with the image referenced explicitly. The image itself is
 * rendered by `app/opengraph-image.tsx`.
 */
export function socialMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description?: string | null;
  path: string;
  /**
   * Explicit share-image URL. Only needed when the page's opengraph-image
   * file lives in a PARENT segment (home / root layout use the unhashed
   * root `/opengraph-image`), because a config-level openGraph object
   * suppresses parent-segment file images. Same-segment files compose fine
   * and need nothing here.
   */
  image?: string;
}) {
  // The `images` KEY must be absent (not undefined) for the file-convention
  // image to survive — Next checks for the key's presence when resolving.
  const images = image
    ? { images: [{ url: image, width: 1200, height: 630, alt: title }] }
    : {};
  return {
    openGraph: {
      type: "website" as const,
      siteName: BRAND,
      locale: "en_US",
      url: path,
      title,
      description: description ?? undefined,
      ...images,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description: description ?? undefined,
      ...images,
    },
  };
}
