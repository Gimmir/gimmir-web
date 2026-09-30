import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A build-log post's body: paragraphs, two heading levels under the post's
 * title (h2, h3), quotes, lists, links, inline code, and images or
 * diagrams with alt text and an optional caption.
 */
export const blockContentType = defineType({
  name: "blockContent",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                  }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Image or diagram",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "What the image shows, for screen readers and search.",
          validation: (rule) =>
            rule
              .required()
              .warning("Alt text is important for accessibility and SEO."),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional line shown under the image.",
        }),
      ],
    }),
  ],
});
