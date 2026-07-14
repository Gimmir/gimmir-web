import type { SchemaTypeDefinition } from "sanity";

// Objects
import { seoType } from "./objects/seoType";
import { blockContentType } from "./objects/blockContentType";
import { socialLinkType } from "./objects/socialLinkType";
import { metricType } from "./objects/metricType";
import { ctaType } from "./objects/ctaType";
import { statType } from "./objects/statType";
import { processStepType } from "./objects/processStepType";

// Page-builder sections
import { heroSectionType } from "./sections/heroSectionType";
import { logosSectionType } from "./sections/logosSectionType";
import { caseStudiesSectionType } from "./sections/caseStudiesSectionType";
import { processSectionType } from "./sections/processSectionType";
import { testimonialSectionType } from "./sections/testimonialSectionType";
import { foundersSectionType } from "./sections/foundersSectionType";
import { reviewCtaSectionType } from "./sections/reviewCtaSectionType";

// Documents
import { siteSettingsType } from "./documents/siteSettingsType";
import { navigationType } from "./documents/navigationType";
import { homePageType } from "./documents/homePageType";
import { caseStudyType } from "./documents/caseStudyType";
import { founderType } from "./documents/founderType";
import { testimonialType } from "./documents/testimonialType";
import { redirectType } from "./documents/redirectType";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  seoType,
  blockContentType,
  socialLinkType,
  metricType,
  ctaType,
  statType,
  processStepType,
  // Sections
  heroSectionType,
  logosSectionType,
  caseStudiesSectionType,
  processSectionType,
  testimonialSectionType,
  foundersSectionType,
  reviewCtaSectionType,
  // Documents
  siteSettingsType,
  navigationType,
  homePageType,
  caseStudyType,
  founderType,
  testimonialType,
  redirectType,
];
