/**
 * Minimal `.env.local` loader shared by one-off scripts (seed, check-copy, …).
 *
 * This is an exact port of the `loadEnv` function defined at the top of
 * `scripts/seed.ts` — kept here so it can be reused without duplicating it
 * or importing seed.ts (which has its own top-level side effects). It does
 * NOT auto-run on import; callers must invoke `loadEnv()` explicitly.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1];
      let value = m[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // ignore — env may be provided another way
  }
}
