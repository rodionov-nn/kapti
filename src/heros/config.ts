import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Тип',
      options: [
        {
          label: 'Скрыть',
          value: 'none',
        },
        {
          label: 'Сильный акцент',
          value: 'highImpact',
        },
        {
          label: 'Средний акцент',
          value: 'mediumImpact',
        },
        {
          label: 'Минимальный акцент',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      label: false,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          const disabledFeatures = [
            'orderedList',
            'unorderedList',
            'checklist',
            'blockquote',
            'relationship',
            'horizontalRule',
            'upload',
          ]

          return [
            ...defaultFeatures.filter((feature) => !disabledFeatures.includes(feature.key)),
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      label: 'Изображение',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
