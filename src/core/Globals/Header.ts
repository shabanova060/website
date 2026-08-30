import { updateTag } from "next/cache";
import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  versions: false,
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        updateTag("global_header");
      },
    ],
  },
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
      name: "links",
      type: "array",
      fields: [
        {
          name: "id",
          type: "text",
          defaultValue: () => Bun.randomUUIDv7(),
          admin: {
            readOnly: true,
            hidden: true,
          },
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
      maxRows: 6,
    },
  ],
};
