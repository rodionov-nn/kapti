import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    label: 'Размер',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'Одна Треть',
        value: 'oneThird',
      },
      {
        label: 'Половина',
        value: 'half',
      },
      {
        label: 'Две Трети',
        value: 'twoThirds',
      },
      {
        label: 'Полный',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    label: 'Включить Ссылку',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Контент',
    plural: 'Контент',
  },
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      label: 'Столбцы',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
