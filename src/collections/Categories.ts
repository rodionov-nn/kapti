import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'

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
    slugField('name')
  ],
}