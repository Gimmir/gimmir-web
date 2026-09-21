/**
 * Copy linter — enforces the site's copywriting rules across source code and
 * Sanity content, so we can run `npm run check:copy` before every release.
 *
 * What it scans:
 *   A. User-facing strings in `src/**\/*.ts` and `src/**\/*.tsx` (excluding the
 *      Sanity schema/studio surface, which isn't rendered copy). Uses the
 *      TypeScript compiler API to pull out only string literals, template
 *      literal segments, and JSX text — comments are never part of the AST,
 *      so they're never checked (em dashes in comments are fine).
 *   B. Sanity content (published + draft docs), fetched straight from the
 *      Sanity HTTP query API. Skip this with `--no-sanity`.
 *
 * Ignoring a false positive: add the text `copy-check-ignore` anywhere on the
 * same source line as the offending string, or on the line directly above
 * it, and that string is skipped entirely (source scan only).
 *
 * Rules are listed in `checkText` below, each an ERROR or a WARN. Exit code
 * is 1 if any ERROR was found, 0 otherwise.
 *
 * Usage:
 *   npx tsx scripts/check-copy.ts               # scan source + Sanity
 *   npx tsx scripts/check-copy.ts --no-sanity    # scan source only
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { loadEnv } from "./lib/env";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type Severity = "ERROR" | "WARN";

interface Finding {
  rule: string;
  severity: Severity;
  location: string;
  excerpt: string;
}

// Order findings are grouped/printed in.
const RULE_ORDER = [
  "em-dash",
  "banned-word",
  "banned-word-soft",
  "currency-gbp",
  "currency-usd",
  "placeholder",
  "seo-trap",
] as const;

// -----------------------------------------------------------------------------
// Shared helpers
// -----------------------------------------------------------------------------

/** Trims `text` to roughly 80 chars centered on the match at `index`. */
function excerptAround(
  text: string,
  index: number,
  matchLength: number,
  radius = 40,
): string {
  const start = Math.max(0, index - radius);
  const end = Math.min(text.length, index + matchLength + radius);
  let excerpt = text.slice(start, end).replace(/\s+/g, " ").trim();
  if (start > 0) excerpt = `…${excerpt}`;
  if (end < text.length) excerpt = `${excerpt}…`;
  return excerpt;
}

/**
 * Runs every copy rule against a single string of text, pushing any matches
 * onto `findings`. Shared by both the source scanner and the Sanity scanner.
 */
function checkText(
  text: string,
  location: string,
  isTitle: boolean,
  findings: Finding[],
) {
  // 1. em-dash — ERROR. En dash (–, U+2013) is allowed (price ranges).
  {
    const re = /—/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      findings.push({
        rule: "em-dash",
        severity: "ERROR",
        location,
        excerpt: excerptAround(text, m.index, m[0].length),
      });
    }
  }

  // 2. banned-word — ERROR. "dedicated … team" allows up to three words between.
  {
    const re = /\b(dedicated(?:\s+[\w-]+){0,3}\s+team|outsourcing)\b/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      findings.push({
        rule: "banned-word",
        severity: "ERROR",
        location,
        excerpt: excerptAround(text, m.index, m[0].length),
      });
    }
  }

  // 3. banned-word-soft — WARN (can be legitimate, e.g. an operator's staff).
  {
    const re = /\b(outsource|resources|staff)\b/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      findings.push({
        rule: "banned-word-soft",
        severity: "WARN",
        location,
        excerpt: excerptAround(text, m.index, m[0].length),
      });
    }
  }

  // 4. currency-gbp — ERROR.
  {
    const re = /£/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      findings.push({
        rule: "currency-gbp",
        severity: "ERROR",
        location,
        excerpt: excerptAround(text, m.index, m[0].length),
      });
    }
  }

  // 5. currency-usd — ERROR. `$` + digit, except the allowed "$10k" fact.
  {
    const re = /\$\d/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      const window = text.slice(m.index, m.index + 8);
      if (/^\$10\s?k/i.test(window)) continue;
      findings.push({
        rule: "currency-usd",
        severity: "ERROR",
        location,
        excerpt: excerptAround(text, m.index, m[0].length),
      });
    }
  }

  // 6. placeholder — ERROR. Unresolved template placeholder left in copy.
  {
    const re = /\{\{/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      findings.push({
        rule: "placeholder",
        severity: "ERROR",
        location,
        excerpt: excerptAround(text, m.index, m[0].length),
      });
    }
  }

  // 7. seo-trap — WARN. Only counts inside a meta-title context.
  if (isTitle) {
    const re = /fitness platform/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      findings.push({
        rule: "seo-trap",
        severity: "WARN",
        location,
        excerpt: excerptAround(text, m.index, m[0].length),
      });
    }
  }
}

// -----------------------------------------------------------------------------
// A. Source scan (TypeScript compiler API)
// -----------------------------------------------------------------------------

const SRC_ROOT = path.resolve(process.cwd(), "src");

const EXCLUDED_EXACT = new Set([
  path.join("src", "sanity", "types.ts"),
  path.join("src", "sanity", "structure.ts"),
]);

const EXCLUDED_PREFIXES = [
  path.join("src", "sanity", "schemaTypes") + path.sep,
  path.join("src", "app", "studio") + path.sep,
];

function isExcludedPath(relPath: string): boolean {
  if (EXCLUDED_EXACT.has(relPath)) return true;
  return EXCLUDED_PREFIXES.some((prefix) => relPath.startsWith(prefix));
}

function collectTsFiles(dir: string, out: string[]) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectTsFiles(full, out);
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      out.push(full);
    }
  }
}

/** True if `node` is an import/export module specifier — not copy. */
function isModuleSpecifier(node: ts.Node): boolean {
  const p = node.parent;
  if (!p) return false;
  if (ts.isImportDeclaration(p) && p.moduleSpecifier === node) return true;
  if (ts.isExportDeclaration(p) && p.moduleSpecifier === node) return true;
  if (
    ts.isCallExpression(p) &&
    p.expression.kind === ts.SyntaxKind.ImportKeyword &&
    p.arguments[0] === node
  )
    return true;
  return false;
}

/** True if `node` is the value of a `className`/`class` JSX attribute — not copy. */
function isClassNameAttrValue(node: ts.Node): boolean {
  const p = node.parent;
  if (!p) return false;
  if (
    ts.isJsxAttribute(p) &&
    ts.isIdentifier(p.name) &&
    (p.name.text === "className" || p.name.text === "class") &&
    p.initializer === node
  ) {
    return true;
  }
  if (ts.isJsxExpression(p)) {
    const gp = p.parent;
    if (
      gp &&
      ts.isJsxAttribute(gp) &&
      ts.isIdentifier(gp.name) &&
      (gp.name.text === "className" || gp.name.text === "class") &&
      gp.initializer === p
    ) {
      return true;
    }
  }
  return false;
}

/** True if `node` is (an operand feeding into) an argument of a `cn(...)` call — not copy. */
function isCnCallArgument(node: ts.Node): boolean {
  let current: ts.Node = node;
  let parent = current.parent;
  while (parent) {
    if (
      ts.isCallExpression(parent) &&
      ts.isIdentifier(parent.expression) &&
      parent.expression.text === "cn"
    ) {
      return parent.arguments.includes(current as ts.Expression);
    }
    // Unwrap common wrappers so `cn("a", cond && "b")` etc. are still caught.
    if (
      ts.isParenthesizedExpression(parent) ||
      ts.isBinaryExpression(parent) ||
      ts.isConditionalExpression(parent) ||
      ts.isTemplateExpression(parent) ||
      ts.isArrayLiteralExpression(parent)
    ) {
      current = parent;
      parent = current.parent;
      continue;
    }
    break;
  }
  return false;
}

/**
 * True if `node` sits directly under a `title`/`metaTitle` property
 * assignment, or under `default`/`absolute`/`template` nested inside a
 * `title: { ... }` object (the Next.js metadata `title` shape).
 */
function isTitleContext(node: ts.Node): boolean {
  let current: ts.Node = node;
  let parent = current.parent;
  while (parent && ts.isTemplateExpression(parent)) {
    current = parent;
    parent = current.parent;
  }
  if (
    parent &&
    ts.isPropertyAssignment(parent) &&
    ts.isIdentifier(parent.name)
  ) {
    const name = parent.name.text;
    if (name === "title" || name === "metaTitle") return true;
    if (name === "default" || name === "absolute" || name === "template") {
      const obj = parent.parent;
      const objParent = obj?.parent;
      if (
        objParent &&
        ts.isPropertyAssignment(objParent) &&
        ts.isIdentifier(objParent.name) &&
        objParent.name.text === "title"
      ) {
        return true;
      }
    }
  }
  return false;
}

/** Nodes that carry literal text: strings, template segments, JSX text. */
type CopyNode = ts.StringLiteral | ts.TemplateLiteralLikeNode | ts.JsxText;

function isCopyNode(node: ts.Node): node is CopyNode {
  return (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateHead(node) ||
    ts.isTemplateMiddle(node) ||
    ts.isTemplateTail(node) ||
    ts.isJsxText(node)
  );
}

function scanSourceFile(
  sourceFile: ts.SourceFile,
  sourceLines: string[],
  relPath: string,
  findings: Finding[],
) {
  function visit(node: ts.Node) {
    if (isCopyNode(node)) handleCopyNode(node);
    ts.forEachChild(node, visit);
  }

  function handleCopyNode(node: CopyNode) {
    if (
      isModuleSpecifier(node) ||
      isClassNameAttrValue(node) ||
      isCnCallArgument(node)
    )
      return;

    const text = node.text;
    if (ts.isJsxText(node) && text.trim() === "") return;

    const lineNumber =
      sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line +
      1;

    // Ignore mechanism: `copy-check-ignore` on this line or the line above.
    const currentLine = sourceLines[lineNumber - 1] ?? "";
    const aboveLine =
      lineNumber - 2 >= 0 ? (sourceLines[lineNumber - 2] ?? "") : "";
    if (
      currentLine.includes("copy-check-ignore") ||
      aboveLine.includes("copy-check-ignore")
    )
      return;

    checkText(text, `${relPath}:${lineNumber}`, isTitleContext(node), findings);
  }

  visit(sourceFile);
}

function scanSource(findings: Finding[]) {
  const files: string[] = [];
  collectTsFiles(SRC_ROOT, files);

  for (const file of files) {
    const relPath = path.relative(process.cwd(), file);
    if (isExcludedPath(relPath)) continue;

    const content = fs.readFileSync(file, "utf8");
    const sourceLines = content.split("\n");
    const scriptKind = file.endsWith(".tsx")
      ? ts.ScriptKind.TSX
      : ts.ScriptKind.TS;
    const sourceFile = ts.createSourceFile(
      file,
      content,
      ts.ScriptTarget.Latest,
      true,
      scriptKind,
    );

    scanSourceFile(sourceFile, sourceLines, relPath, findings);
  }
}

// -----------------------------------------------------------------------------
// B. Sanity content scan
// -----------------------------------------------------------------------------

/** Recursively walks a Sanity value, checking every string it finds. */
function walkSanityValue(
  value: unknown,
  pathSoFar: string,
  docId: string,
  findings: Finding[],
) {
  if (value === null || value === undefined) return;

  if (typeof value === "string") {
    const isTitle = /(^|\.)metaTitle$/.test(pathSoFar);
    checkText(value, `sanity:${docId}:${pathSoFar}`, isTitle, findings);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, i) =>
      walkSanityValue(
        item,
        pathSoFar ? `${pathSoFar}.${i}` : `${i}`,
        docId,
        findings,
      ),
    );
    return;
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (
      obj._type === "image" ||
      obj._type === "reference" ||
      obj._type === "slug"
    )
      return;
    for (const [key, val] of Object.entries(obj)) {
      if (key.startsWith("_")) continue;
      walkSanityValue(
        val,
        pathSoFar ? `${pathSoFar}.${key}` : key,
        docId,
        findings,
      );
    }
  }
}

async function scanSanity(findings: Finding[]) {
  loadEnv();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_READ_TOKEN;

  if (!projectId || !dataset || !token) {
    console.warn(
      "[check-copy] Skipping Sanity scan: missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_READ_TOKEN in .env.local.",
    );
    return;
  }

  // All real content docs, published and drafts.* alike.
  const query = `*[!(_type match "sanity.*") && !(_type match "system.*") && !(_id in path("_.**"))]`;
  const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}&perspective=raw`;

  let docs: Array<Record<string, unknown>>;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      console.warn(
        `[check-copy] Skipping Sanity scan: query failed with ${res.status} ${res.statusText}.`,
      );
      return;
    }
    const json = (await res.json()) as {
      result?: Array<Record<string, unknown>>;
    };
    docs = json.result ?? [];
  } catch (err) {
    console.warn(
      `[check-copy] Skipping Sanity scan: fetch failed (${(err as Error).message}).`,
    );
    return;
  }

  for (const doc of docs) {
    const id = typeof doc._id === "string" ? doc._id : "unknown";
    walkSanityValue(doc, "", id, findings);
  }
}

// -----------------------------------------------------------------------------
// Output
// -----------------------------------------------------------------------------

function printReport(findings: Finding[]): number {
  const byRule = new Map<string, Finding[]>();
  for (const f of findings) {
    if (!byRule.has(f.rule)) byRule.set(f.rule, []);
    byRule.get(f.rule)!.push(f);
  }

  let errorCount = 0;
  let warnCount = 0;

  for (const rule of RULE_ORDER) {
    const items = byRule.get(rule);
    if (!items || items.length === 0) continue;
    console.log(`\n${rule}`);
    for (const item of items) {
      console.log(`  ${item.severity}  ${item.location}  ${item.excerpt}`);
      if (item.severity === "ERROR") errorCount++;
      else warnCount++;
    }
  }

  console.log(
    `\ncheck:copy — ${errorCount} error${errorCount === 1 ? "" : "s"}, ${warnCount} warning${warnCount === 1 ? "" : "s"}`,
  );
  return errorCount;
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

async function main() {
  const noSanity = process.argv.includes("--no-sanity");
  const findings: Finding[] = [];

  scanSource(findings);
  if (!noSanity) {
    await scanSanity(findings);
  }

  const errorCount = printReport(findings);
  process.exit(errorCount > 0 ? 1 : 0);
}

main();
