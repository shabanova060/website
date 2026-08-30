import { postgresAdapter } from "@payloadcms/db-postgres";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Articles } from "~/core/Collections/Articles";
import { Media } from "~/core/Collections/Media";
import { Topics } from "~/core/Collections/Topics";
import { Users } from "~/core/Collections/Users";
import { Header } from "~/core/Globals/Header";

export default buildConfig({
  editor: lexicalEditor(),
  globals: [Header],
  collections: [Articles, Users, Topics, Media],
  plugins: [
    seoPlugin({
      generateTitle: ({ doc }) => doc.title,
      generateDescription: ({ doc }) => doc.description,
    }),
  ],
  secret:
    "01a01526-a73c-7422-b012-42055ec1be9101a01526-a73c-7423-82f7-12bbec8e4f96",
  db: postgresAdapter({
    pool: {
      connectionString:
        "postgresql://neondb_owner:npg_cTOvxh5st8LI@ep-long-dream-b2hyz4ai-pooler.c-6.eu-central-1.aws.neon.tech/website?sslmode=verify-full&channel_binding=require",
    },
  }),
  sharp,
});
