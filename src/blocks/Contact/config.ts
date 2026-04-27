import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
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
      label: 'Контактная информация (с иконками)',
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
      name: 'socialLinks',
      type: 'array',
      label: 'Социальные сети',
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
          disableLabel: true,
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
