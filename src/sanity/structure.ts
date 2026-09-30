import type { StructureResolver } from "sanity/structure";
import { ArrowRightIcon, DocumentTextIcon } from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("post").title("Build log").icon(DocumentTextIcon),
      S.divider(),
      S.documentTypeListItem("redirect").title("Redirects").icon(ArrowRightIcon),
    ]);
