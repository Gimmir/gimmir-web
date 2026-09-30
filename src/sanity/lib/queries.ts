import { defineQuery } from "next-sanity";

/**
 * The build log is the only page content in Sanity (every other page lives
 * in src/content). Reading time is counted in GROQ at about 1,100
 * characters a minute; images carry their lqip and aspect ratio.
 */

const POST_CARD = `
  _id,
  title,
  "slug": slug.current,
  author,
  publishedAt,
  updatedAt,
  tags,
  tldr,
  "minutes": round(length(pt::text(body)) / 1100)
`;

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    ${POST_CARD}
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    ${POST_CARD},
    linkedinUrl,
    seo,
    body[]{
      ...,
      _type == "image" => {
        ...,
        "lqip": asset->metadata.lqip,
        "aspectRatio": asset->metadata.dimensions.aspectRatio
      }
    },
    "more": *[_type == "post" && defined(slug.current) && slug.current != ^.slug.current]
      | order(publishedAt desc)[0...3]{ ${POST_CARD} }
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    publishedAt,
    updatedAt
  }
`);
