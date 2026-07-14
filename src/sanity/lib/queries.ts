import { defineQuery } from "next-sanity";

/**
 * Image projections keep the raw `asset` reference (so `urlFor` works) and add
 * `lqip` + `aspectRatio` from metadata for blur placeholders and stable layout.
 */

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteName,
    description,
    location,
    contactEmail,
    contactPhone,
    logo{
      ...,
      "lqip": asset->metadata.lqip,
      "aspectRatio": asset->metadata.dimensions.aspectRatio
    },
    socials[]{ _key, platform, url },
    seo,
    analytics
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation"][0]{
    headerLinks[]{ _key, label, anchor },
    headerCta,
    footerTagline,
    footerLinks[]{ _key, label, href },
    footerNote
  }
`);

export const HOME_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    title,
    pageBuilder[]{
      _key,
      _type,
      _type == "heroSection" => {
        anchorId,
        eyebrow,
        headline,
        accent,
        subhead,
        primaryCta,
        secondaryCta,
        stats[]{ _key, value, label }
      },
      _type == "logosSection" => {
        anchorId,
        eyebrow,
        logos[]{
          _key,
          name,
          image{
            ...,
            "lqip": asset->metadata.lqip,
            "aspectRatio": asset->metadata.dimensions.aspectRatio
          }
        }
      },
      _type == "caseStudiesSection" => {
        anchorId,
        eyebrow,
        heading,
        intro,
        items[]->{
          _id,
          title,
          client,
          industry,
          excerpt,
          "slug": slug.current,
          coverImage{
            ...,
            "lqip": asset->metadata.lqip,
            "aspectRatio": asset->metadata.dimensions.aspectRatio
          },
          metrics[]{ _key, value, label }
        }
      },
      _type == "processSection" => {
        anchorId,
        eyebrow,
        heading,
        intro,
        steps[]{ _key, title, description }
      },
      _type == "testimonialSection" => {
        anchorId,
        eyebrow,
        heading,
        testimonials[]->{
          _id,
          quote,
          authorName,
          authorRole,
          authorCompany,
          authorPhoto{
            ...,
            "lqip": asset->metadata.lqip,
            "aspectRatio": asset->metadata.dimensions.aspectRatio
          }
        }
      },
      _type == "foundersSection" => {
        anchorId,
        eyebrow,
        heading,
        intro,
        founders[]->{
          _id,
          name,
          role,
          bio,
          photo{
            ...,
            "lqip": asset->metadata.lqip,
            "aspectRatio": asset->metadata.dimensions.aspectRatio
          },
          socials[]{ _key, platform, url }
        }
      },
      _type == "reviewCtaSection" => {
        anchorId,
        eyebrow,
        heading,
        body,
        bullets,
        formHeading,
        formNote,
        submitLabel,
        successHeading,
        successMessage
      }
    },
    seo
  }
`);

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    client,
    industry,
    excerpt,
    publishedAt,
    "slug": slug.current,
    coverImage{
      ...,
      "lqip": asset->metadata.lqip,
      "aspectRatio": asset->metadata.dimensions.aspectRatio
    },
    problem,
    solution,
    result,
    metrics[]{ _key, value, label },
    technologies,
    links[]{ _key, label, href },
    seo
  }
`);

export const HOME_SEO_QUERY = defineQuery(`
  *[_type == "homePage"][0]{ title, seo }
`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }
`);

export const SITEMAP_QUERY = defineQuery(`
  *[
    (_type == "homePage" && seo.noIndex != true) ||
    (_type == "caseStudy" && defined(slug.current) && seo.noIndex != true)
  ]{
    _type,
    "slug": slug.current,
    _updatedAt
  }
`);

export const REDIRECTS_QUERY = defineQuery(`
  *[_type == "redirect" && defined(source) && defined(destination)]{
    source,
    destination,
    permanent
  }
`);
