import type { Block } from 'payload'

export const Separator: Block = {
  slug: 'separator',
  labels: {
    singular: 'Разделитель',
    plural: 'Разделители',
  },
  fields: [
    {
      name: 'spacing',
      label: 'Отступы',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Узкий', value: 'small' },
        { label: 'Средний', value: 'medium' },
        { label: 'Широкий', value: 'large' },
      ],
    },
    {
      name: 'color',
      label: 'Цвет',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Основной', value: 'default' },
        { label: 'Приглушенный', value: 'muted' },
      ],
    },
  ],
}
