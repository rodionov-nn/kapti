import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Медиа',
    plural: 'Медиа',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' || operation === 'update') {
              if (!data?.alt && data?.filename) {
                return data.filename
                  .replace(/\.[^/.]+$/, "")
                  .replace(/[-_]/g, ' ');
              }
            }
            return data?.alt;
          },
        ],
      },
    },
  ],
  upload: true,
}
