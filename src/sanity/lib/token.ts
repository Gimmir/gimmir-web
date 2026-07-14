import "server-only";

/**
 * Viewer token for Draft Mode / Visual Editing (authenticated reads of drafts).
 *
 * Optional by design: it must NOT throw at module load, or the whole production
 * build fails while collecting page data for the draft-mode route (which imports
 * this) whenever the env var isn't set. When it's absent the site still builds
 * and serves published content — only the draft-mode / live-preview features
 * that need authenticated reads are unavailable until it's configured.
 */
export const token = process.env.SANITY_API_READ_TOKEN;
