import { defineQuery } from "next-sanity";

/**
 * Content is delivered as structured singleton documents (one per page) plus
 * shared `siteSettings`, `navigation`, and `founder` documents. Founder cards
 * reference a founder and override role + bio per page. Image projections keep
 * the raw `asset` reference (so `urlFor` works) and add `lqip` + `aspectRatio`.
 */

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteName,
    description,
    contactEmail,
    finalCtaCaption,
    finalCtaHelper,
    flowSteps[]{ _key, tag, title, description },
    seo
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation"][0]{
    headerLinks[]{ _key, label, anchor },
    headerCtaLabel,
    footerTagline,
    footerCtaLabel,
    footerLinks[]{ _key, label, href },
    footerNote
  }
`);

/** Both founders, for the small avatar stacks (final CTA panel, studio). */
export const FOUNDERS_QUERY = defineQuery(`
  *[_type == "founder"] | order(order asc){
    _id,
    name,
    linkedinUrl,
    photo{
      ...,
      "lqip": asset->metadata.lqip,
      "aspectRatio": asset->metadata.dimensions.aspectRatio
    }
  }
`);

export const HOME_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    heroEyebrow, heroHeading, heroAccent, heroSubhead,
    heroPrimaryCtaLabel, heroPrimaryCtaLabelShort, heroSecondaryCtaLabel, heroSecondaryCtaHref,
    marquee,
    proofHeading, proofLinkLabel, proofLinkHref,
    whoHeading, whoAccent, whoIntro, whoRows[]{ _key, title, body },
    servicesHeading, servicesAccent, servicesItems[]{ _key, title, body }, servicesFootnote,
    foundersHeading, foundersAccent, foundersIntro, foundersFootnote,
    founders[]{
      _key, role, bio,
      founder->{ _id, name, linkedinUrl, photo{ ..., "lqip": asset->metadata.lqip, "aspectRatio": asset->metadata.dimensions.aspectRatio } }
    },
    trustHeading, trustAccent, trustCards[]{ _key, title, body },
    reviewCtaHeading, reviewCtaAccent, reviewCtaIntro, reviewCtaButtonLabel,
    finalCtaEyebrow, finalCtaHeading, finalCtaIntro, finalCtaButtonLabel
  }
`);

export const HOME_SEO_QUERY = defineQuery(`
  *[_type == "homePage"][0]{ seo }
`);

export const REVIEW_QUERY = defineQuery(`
  *[_type == "reviewPage"][0]{
    heroEyebrow, heroHeading, heroAccent, heroSubhead, heroCtaLabel, heroCtaHelper, marquee,
    problemHeading, problemAccent, problemBody, problemCallout,
    whatHeading, whatAccent, whatIntro, focusLabel, focusItems,
    deliverablesHeading, deliverablesAccent, deliverablesIntro, deliverablesItems[]{ _key, title, body }, deliverablesClosing,
    foundersHeading, foundersAccent, foundersFootnote,
    founders[]{
      _key, role, bio,
      founder->{ _id, name, linkedinUrl, photo{ ..., "lqip": asset->metadata.lqip, "aspectRatio": asset->metadata.dimensions.aspectRatio } }
    },
    processHeading, processAccent,
    pricingEyebrow, pricingPrice, pricingPriceSuffix, pricingLead, pricingNote, pricingButtonLabel, pricingIncludedLabel, pricingIncluded,
    fitHeading, fitChecks, fitNotLabel, fitNotBody,
    proofHeading, proofAccent,
    faqHeading, faqAccent, faqItems[]{ _key, question, answer },
    finalCtaEyebrow, finalCtaHeading, finalCtaIntro, finalCtaButtonLabel
  }
`);

export const REVIEW_SEO_QUERY = defineQuery(`
  *[_type == "reviewPage"][0]{ seo }
`);

export const HOW_WE_WORK_QUERY = defineQuery(`
  *[_type == "howWeWorkPage"][0]{
    heroEyebrow, heroHeading, heroAccent, heroSubhead, heroCtaLabel, heroCtaHelper, marquee,
    fearsHeading, fearsAccent, fearsAnswerLabel, fears[]{ _key, fear, answer },
    runsHeading, runsAccent, runsSteps[]{ _key, title, body },
    principlesHeading, principlesAccent, principlesItems,
    finalCtaEyebrow, finalCtaHeading, finalCtaIntro, finalCtaButtonLabel
  }
`);

export const HOW_WE_WORK_SEO_QUERY = defineQuery(`
  *[_type == "howWeWorkPage"][0]{ seo }
`);

export const FOUNDERS_PAGE_QUERY = defineQuery(`
  *[_type == "foundersPage"][0]{
    heroEyebrow, heroHeading, heroAccent, heroSubhead, heroCtaLabel, heroCtaHelper,
    storyHeading, storyAccent, storyDifferenceLabel, storyDifferenceBig, storyDifferenceSub,
    storyStats[]{ _key, value, label }, storyBody1, storyBody2, storyOriginLabel, storyOriginCaption, storyOriginBody,
    believeHeading, believeAccent, believeItems[]{ _key, title, body }, believeFinaleTitle, believeFinaleBody,
    peopleHeading, peopleAccent, peopleFootnote,
    founders[]{
      _key, role, bio,
      founder->{ _id, name, linkedinUrl, photo{ ..., "lqip": asset->metadata.lqip, "aspectRatio": asset->metadata.dimensions.aspectRatio } }
    },
    studioHeading, studioAccent, studioBody, studioTeamCaption, studioTeamSizeBody,
    finalCtaEyebrow, finalCtaHeading, finalCtaIntro, finalCtaButtonLabel
  }
`);

export const FOUNDERS_PAGE_SEO_QUERY = defineQuery(`
  *[_type == "foundersPage"][0]{ seo }
`);

export const REDIRECTS_QUERY = defineQuery(`
  *[_type == "redirect" && defined(source) && defined(destination)]{
    source,
    destination,
    permanent
  }
`);
