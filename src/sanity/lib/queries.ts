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
    footerColumns[]{ _key, title, links[]{ _key, label, href } },
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
    heroSecondaryCtaLabel, heroSecondaryCtaHref, heroTrustStrip,
    problemHeading, problemAccent, problemBody,
    proofHeading, proofLinkLabel, proofLinkHref,
    foundersHeading, foundersAccent, foundersIntro, foundersBullets, foundersFootnote,
    founders[]{
      _key, role, bio,
      founder->{ _id, name, linkedinUrl, photo{ ..., "lqip": asset->metadata.lqip, "aspectRatio": asset->metadata.dimensions.aspectRatio } }
    },
    offersHeading, offersIntro,
    faqHeading, faqItems[]{ _key, question, answer },
    finalCtaEyebrow, finalCtaHeading, finalCtaIntro
  }
`);

export const HOME_SEO_QUERY = defineQuery(`
  *[_type == "homePage"][0]{ seo }
`);

export const REVIEW_QUERY = defineQuery(`
  *[_type == "reviewPage"][0]{
    heroEyebrow, heroHeading, heroAccent, heroSubhead, marquee,
    problemHeading, problemAccent, problemBody, problemCallout,
    whatHeading, whatAccent, whatIntro, focusLabel, focusItems,
    deliverablesHeading, deliverablesAccent, deliverablesIntro, deliverablesItems[]{ _key, title, body }, deliverablesClosing,
    foundersHeading, foundersAccent, foundersFootnote,
    founders[]{
      _key, role, bio,
      founder->{ _id, name, linkedinUrl, photo{ ..., "lqip": asset->metadata.lqip, "aspectRatio": asset->metadata.dimensions.aspectRatio } }
    },
    processHeading, processAccent,
    pricingEyebrow, pricingLead, pricingNote, pricingIncludedLabel, pricingIncluded,
    fitHeading, fitChecks, fitNotItems,
    proofHeading, proofAccent, proofBody,
    faqHeading, faqAccent, faqItems[]{ _key, question, answer },
    finalCtaEyebrow, finalCtaHeading, finalCtaIntro
  }
`);

export const REVIEW_SEO_QUERY = defineQuery(`
  *[_type == "reviewPage"][0]{ seo }
`);

export const HOW_WE_WORK_QUERY = defineQuery(`
  *[_type == "howWeWorkPage"][0]{
    heroEyebrow, heroHeading, heroAccent, heroSubhead, marquee,
    fearsHeading, fearsAccent, fearsAnswerLabel, fears[]{ _key, fear, answer },
    runsHeading, runsAccent, runsSteps[]{ _key, title, body },
    principlesHeading, principlesAccent, principlesItems,
    twoPersonHeading, twoPersonBody, twoPersonBullets,
    pricingHeading, pricingBody,
    finalCtaEyebrow, finalCtaHeading, finalCtaIntro
  }
`);

export const HOW_WE_WORK_SEO_QUERY = defineQuery(`
  *[_type == "howWeWorkPage"][0]{ seo }
`);

export const FOUNDERS_PAGE_QUERY = defineQuery(`
  *[_type == "foundersPage"][0]{
    heroEyebrow, heroHeading, heroAccent, heroSubhead,
    storyHeading, storyAccent, storyDifferenceLabel, storyDifferenceBig, storyDifferenceSub,
    storyStats[]{ _key, value, label }, storyBody1, storyBody2, storyOriginLabel, storyOriginCaption, storyOriginBody,
    believeHeading, believeAccent, believeItems[]{ _key, title, body }, believeFinaleTitle, believeFinaleBody,
    peopleHeading, peopleAccent, peopleFootnote,
    founders[]{
      _key, role, bio,
      founder->{ _id, name, linkedinUrl, photo{ ..., "lqip": asset->metadata.lqip, "aspectRatio": asset->metadata.dimensions.aspectRatio } }
    },
    studioHeading, studioAccent, studioBody, studioTeamCaption, studioTeamSizeBody,
    finalCtaEyebrow, finalCtaHeading, finalCtaIntro
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
