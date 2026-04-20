import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const MediaContent: Block = {
  slug: 'mediaContent',
  labels: {
    singular: 'Блок фото + текст',
    plural: 'Блоки фото + текст',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      name: 'alignment',
      label: 'Выравнивание',
      type: 'select',
      defaultValue: 'contentLeft',
      required: true,
      options: [
        {
          label: 'Текст слева, Фото справа',
          value: 'contentLeft',
        },
        {
          label: 'Фото слева, Текст справа',
          value: 'mediaLeft',
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
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            InlineCodeFeature(),
          ]
        },
      }),
      required: true,
      label: false,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Изображение',
    },
  ],
}
