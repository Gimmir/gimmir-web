import { ArrowRightIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const redirectType = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  icon: ArrowRightIcon,
  fields: [
    defineField({
      name: "source",
      title: "From",
      type: "string",
      description: 'The old path, starting with a slash, e.g. "/old-case-study".',
      validation: (rule) =>
        rule.required().custom((value) =>
          value && !value.startsWith("/")
            ? "Must start with a slash (/)"
            : true,
        ),
    }),
    defineField({
      name: "destination",
      title: "To",
      type: "string",
      description: 'The new path or URL, e.g. "/work/un1t".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "permanent",
      title: "Permanent (308)",
      type: "boolean",
      description: "On = permanent (308). Off = temporary (307).",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "source", subtitle: "destination" },
    prepare({ title, subtitle }) {
      return { title: title || "—", subtitle: `→ ${subtitle || ""}` };
    },
  },
});
