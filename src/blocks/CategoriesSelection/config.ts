import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

export const CategoriesSelection: Block = {
  slug: 'categoriesSelection',
  labels: {
    singular: 'Выбор категорий',
    plural: 'Выборы категорий',
  },
  fields: [
    {
      name: 'title',
      label: 'Заголовок',
      type: 'text',
      required: true,
    },
    {
      name: 'selectedCategories',
      label: 'Категории для отображения',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      minRows: 1,
      maxRows: 3,
      required: true,
    },
    linkGroup({
      overrides: {
        maxRows: 1,
      },
    }),
  ],
}
