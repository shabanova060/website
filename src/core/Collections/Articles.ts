import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
  slug: "articles",
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
      useAsSlug: "title",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "topics",
      type: "relationship",
      hasMany: true,
      relationTo: "topics",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      defaultValue: ({ user }) => user?.id,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "heroImage",
      type: "upload",
      required: true,
      relationTo: "media",
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "body",
              type: "richText",
              required: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({
                    enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                  }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HorizontalRuleFeature(),
                ],
              }),
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
  ],
  admin: {
    useAsTitle: "title",
    description: "Organize and manage your blog articles here.",
    defaultColumns: ["title", "topics", "author", "updatedAt"],
  },
  defaultPopulate: {
    heroImage: {
      alt: true,
      caption: true,
      url: true,
    },
    title: true,
    slug: true,
    topics: {
      name: true,
    },
    author: {
      name: true,
    },
    meta: {
      image: true,
      description: true,
    },
  },
};
