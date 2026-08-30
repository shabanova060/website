import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
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
      name: "name",
      type: "text",
      required: true,
    },
  ],
  versions: false,
};
