import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Topics: CollectionConfig = {
  slug: "topics",
  versions: false,
  fields: [
    {
      name: "id",
      type: "text",
      defaultValue: () => Bun.randomUUIDv7(),
      admin: {
        readOnly: true,
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ operation, value }) => {
            if (operation === "create" && !value) {
              return Bun.randomUUIDv7();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "slug",
      type: "slug",
      useAsSlug: "name",
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ];
        },
      }),
    },
  ],
  admin: {
    useAsTitle: "name",
    description: "Organize and manage your topics here.",
    defaultColumns: ["name", "createdAt"],
  },
  defaultPopulate: {
    name: true,
    description: true,
  },
};
