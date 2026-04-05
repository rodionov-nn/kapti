import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Категория', plural: 'Категории' },
  admin: {
    useAsTitle: 'name',
    group: 'Контент',
  },
  fields: [
    {
      name: 'name',
      label: 'Имя категории',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL-адрес (латиница)',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            const source = value || data?.name;
            if (source) {
              return slugify(source, {
                lower: true,
                strict: true,
                locale: 'ru',
              });
            }
            return value;
          },
        ],
      },
    },
  ],
}