import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const iconOptions = [
  { label: 'Телефон', value: 'phone' },
  { label: 'Почта', value: 'mail' },
  { label: 'Адрес', value: 'map-pin' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Telegram (PaperPlane)', value: 'send' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'ВКонтакте', value: 'vk' },
]

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  label: 'Подвал сайта',
  admin: {
    group: 'Навигация',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Основные',
          fields: [
            {
              name: 'logo',
              label: 'Логотип',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'navItems',
              type: 'array',
              label: 'Элементы навигации',
              fields: [
                link({
                  appearances: false,
                }),
              ],
              maxRows: 6,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Footer/RowLabel#RowLabel',
                },
              },
            },
          ],
        },
        {
          label: 'Контакты',
          fields: [
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
          ],
        },
        {
          label: 'Социальные сети',
          fields: [
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
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
