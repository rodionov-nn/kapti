import type { Block } from 'payload'

import { iconOptions } from '@/Footer/config'
import { link } from '@/fields/link'

export const Contact: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlock',
  labels: {
    singular: 'Контакты с формой',
    plural: 'Контакты с формой',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      name: 'contacts',
      type: 'array',
      label: 'Контактная информация',
      fields: [
        {
          name: 'icon',
          label: 'Иконка',
          type: 'select',
          options: iconOptions,
          required: true,
        },
        link({
          appearances: false,
        }),
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'recipientEmail',
      label: 'Email для получения заявок',
      type: 'email',
      required: true,
    },
  ],
}
