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
