import type { SchemaTypeDefinition } from "sanity";

// Objects
import { seoType } from "./objects/seoType";
import { blockContentType } from "./objects/blockContentType";

// Documents
import { postType } from "./documents/postType";
import { redirectType } from "./documents/redirectType";

/**
 * What the Studio edits in V2: the build log and redirects. Every other
 * page's copy lives in code (src/content).
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  seoType,
  blockContentType,
  // Documents
  postType,
  redirectType,
];
