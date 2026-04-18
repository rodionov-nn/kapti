import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  labels: {
    singular: 'Категория',
    plural: 'Категории',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
  },
  fields: [
    {
      name: 'title',
      label: 'Имя категории',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
