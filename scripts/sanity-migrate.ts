/**
 * Moves the site's Sanity content from one project to another.
 *
 *   npx tsx scripts/sanity-migrate.ts export
 *       Reads every document (published and drafts) and every image from the
 *       project in .env.local and writes backups/sanity-<projectId>-<date>/
 *       (documents.json + images/). Read token is enough.
 *
 *   npx tsx scripts/sanity-migrate.ts import backups/sanity-<id>-<date> [--write]
 *       Uploads the images and recreates the documents, same _ids, in the
 *       project now in .env.local (point it at the NEW project first).
 *       Dry run unless --write. Needs an Editor token in
 *       SANITY_API_WRITE_TOKEN.
 *
 * System documents (preview secrets, retention settings, …) are not moved.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { createClient } from "@sanity/client";

import { loadEnv } from "./lib/env";

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

type Doc = Record<string, unknown> & { _id: string; _type: string };
type Asset = {
  _id: string;
  url: string;
  originalFilename?: string;
  extension?: string;
};

const clientWith = (token?: string) =>
  createClient({
    projectId,
    dataset,
    apiVersion: "2026-02-01",
    token,
    useCdn: false,
    perspective: "raw",
  });

const isSystem = (doc: Doc) =>
  doc._id.startsWith("_.") ||
  doc._type.startsWith("system.") ||
  (doc._type.startsWith("sanity.") && !doc._type.endsWith("Asset"));

/** Every asset _ref inside a value (image fields, nested arrays…). */
function collectAssetRefs(value: unknown, into: Set<string>) {
  if (Array.isArray(value)) value.forEach((v) => collectAssetRefs(v, into));
  else if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const asset = obj.asset as { _ref?: string } | undefined;
    if (asset?._ref) into.add(asset._ref);
    Object.values(obj).forEach((v) => collectAssetRefs(v, into));
  }
}

/** Swap asset refs using a map (old asset _id → new asset _id). */
function remapAssets(value: unknown, map: Map<string, string>): unknown {
  if (Array.isArray(value)) return value.map((v) => remapAssets(v, map));
  if (value && typeof value === "object") {
    const obj = { ...(value as Record<string, unknown>) };
    const asset = obj.asset as { _ref?: string; _type?: string } | undefined;
    if (asset?._ref && map.has(asset._ref)) {
      obj.asset = { ...asset, _ref: map.get(asset._ref) };
    }
    for (const [k, v] of Object.entries(obj)) {
      if (k !== "asset") obj[k] = remapAssets(v, map);
    }
    return obj;
  }
  return value;
}

async function exportProject() {
  const token = process.env.SANITY_API_READ_TOKEN;
  let all: Doc[];
  try {
    all = await clientWith(token).fetch<Doc[]>(`*`);
  } catch (err) {
    // A revoked token still leaves a public dataset readable: published
    // documents and images only (drafts need a working token).
    if ((err as { statusCode?: number }).statusCode !== 401) throw err;
    console.warn(
      "Read token rejected; exporting published content anonymously.",
    );
    all = await clientWith().fetch<Doc[]>(`*`);
  }
  const assets = all.filter((d) =>
    d._type.endsWith("Asset"),
  ) as unknown as Asset[];
  const docs = all.filter((d) => !isSystem(d) && !d._type.endsWith("Asset"));

  const date = new Date().toISOString().slice(0, 10);
  const dir = resolve(`backups/sanity-${projectId}-${date}`);
  mkdirSync(join(dir, "images"), { recursive: true });

  const used = new Set<string>();
  docs.forEach((d) => collectAssetRefs(d, used));
  const manifest: Array<Asset & { file: string }> = [];
  for (const a of assets.filter((a) => used.has(a._id))) {
    const file = `${a._id}.${a.extension ?? "bin"}`;
    const res = await fetch(a.url);
    if (!res.ok) throw new Error(`Download failed ${res.status}: ${a.url}`);
    writeFileSync(
      join(dir, "images", file),
      Buffer.from(await res.arrayBuffer()),
    );
    manifest.push({ ...a, file });
  }

  writeFileSync(join(dir, "documents.json"), JSON.stringify(docs, null, 2));
  writeFileSync(join(dir, "assets.json"), JSON.stringify(manifest, null, 2));
  console.log(
    `Exported ${docs.length} documents and ${manifest.length} images from ${projectId}/${dataset}\n→ ${dir}`,
  );
  for (const d of docs) console.log(`  ${d._type.padEnd(16)} ${d._id}`);
}

async function importProject(dir: string, write: boolean) {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (write && !token) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN (Editor) for the target project",
    );
    process.exit(1);
  }
  const client = clientWith(token);
  const docs = JSON.parse(
    readFileSync(join(dir, "documents.json"), "utf8"),
  ) as Doc[];
  const assets = JSON.parse(
    readFileSync(join(dir, "assets.json"), "utf8"),
  ) as Array<Asset & { file: string }>;

  console.log(
    `${write ? "Importing" : "Dry run:"} ${docs.length} documents and ${assets.length} images into ${projectId}/${dataset}`,
  );
  if (!write) {
    for (const d of docs) console.log(`  ${d._type.padEnd(16)} ${d._id}`);
    console.log("Pass --write to import.");
    return;
  }

  const map = new Map<string, string>();
  for (const a of assets) {
    const path = join(dir, "images", a.file);
    if (!existsSync(path)) throw new Error(`Missing image ${path}`);
    const uploaded = await client.assets.upload("image", readFileSync(path), {
      filename: a.originalFilename ?? basename(path),
    });
    map.set(a._id, uploaded._id);
    console.log(`  ✓ image ${a.originalFilename ?? a.file}`);
  }

  const tx = client.transaction();
  for (const d of docs) {
    const copy = remapAssets(d, map) as Doc;
    for (const k of ["_rev", "_createdAt", "_updatedAt", "_system"])
      delete copy[k];
    tx.createOrReplace(copy);
  }
  await tx.commit();
  console.log(`  ✓ ${docs.length} documents written`);
}

const [command, arg] = process.argv.slice(2);
if (command === "export") {
  exportProject().catch((e) => {
    console.error(e);
    process.exit(1);
  });
} else if (command === "import" && arg) {
  importProject(resolve(arg), process.argv.includes("--write")).catch((e) => {
    console.error(e);
    process.exit(1);
  });
} else {
  console.error("Usage: export | import <backup-dir> [--write]");
  process.exit(1);
}
