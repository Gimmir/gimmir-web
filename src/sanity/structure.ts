import type { StructureResolver } from "sanity/structure";
import {
  CogIcon,
  MenuIcon,
  HomeIcon,
  DocumentIcon,
  CaseIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@sanity/icons";

// Singletons are edited as a single fixed document rather than a list.
const SINGLETONS = [
  "siteSettings",
  "navigation",
  "homePage",
  "reviewPage",
  "howWeWorkPage",
  "foundersPage",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Navigation")
        .id("navigation")
        .icon(MenuIcon)
        .child(S.document().schemaType("navigation").documentId("navigation")),
      S.divider(),
      S.listItem()
        .title("Home page")
        .id("homePage")
        .icon(HomeIcon)
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("The Review page")
        .id("reviewPage")
        .icon(DocumentIcon)
        .child(S.document().schemaType("reviewPage").documentId("reviewPage")),
      S.listItem()
        .title("How we work page")
        .id("howWeWorkPage")
        .icon(CogIcon)
        .child(
          S.document().schemaType("howWeWorkPage").documentId("howWeWorkPage"),
        ),
      S.listItem()
        .title("Founders page")
        .id("foundersPage")
        .icon(UsersIcon)
        .child(
          S.document().schemaType("foundersPage").documentId("foundersPage"),
        ),
      S.divider(),
      S.documentTypeListItem("founder").title("Founders").icon(UsersIcon),
      S.documentTypeListItem("caseStudy").title("Case studies").icon(CaseIcon),
      S.divider(),
      S.documentTypeListItem("redirect").title("Redirects").icon(ArrowRightIcon),
    ]);

// Hide singleton types from the global "new document" menu.
export const singletonActions = new Set(["publish", "discardChanges", "restore"]);
export const singletonTypes = new Set(SINGLETONS);
