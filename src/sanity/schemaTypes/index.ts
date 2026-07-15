import type { SchemaTypeDefinition } from "sanity";

// Objects
import { seoType } from "./objects/seoType";
import { blockContentType } from "./objects/blockContentType";
import { socialLinkType } from "./objects/socialLinkType";
import { metricType } from "./objects/metricType";
import { ctaType } from "./objects/ctaType";
import { statType } from "./objects/statType";
import { infoCardType } from "./objects/infoCardType";
import { faqItemType } from "./objects/faqItemType";
import { fearItemType } from "./objects/fearItemType";
import { flowStepType } from "./objects/flowStepType";
import { founderCardType } from "./objects/founderCardType";

// Documents
import { siteSettingsType } from "./documents/siteSettingsType";
import { navigationType } from "./documents/navigationType";
import { homePageType } from "./documents/homePageType";
import { reviewPageType } from "./documents/reviewPageType";
import { howWeWorkPageType } from "./documents/howWeWorkPageType";
import { foundersPageType } from "./documents/foundersPageType";
import { caseStudyType } from "./documents/caseStudyType";
import { founderType } from "./documents/founderType";
import { redirectType } from "./documents/redirectType";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  seoType,
  blockContentType,
  socialLinkType,
  metricType,
  ctaType,
  statType,
  infoCardType,
  faqItemType,
  fearItemType,
  flowStepType,
  founderCardType,
  // Documents
  siteSettingsType,
  navigationType,
  homePageType,
  reviewPageType,
  howWeWorkPageType,
  foundersPageType,
  caseStudyType,
  founderType,
  redirectType,
];
