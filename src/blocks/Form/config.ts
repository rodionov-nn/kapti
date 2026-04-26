import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      label: 'Форма',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Включить вступительный контент',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
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
      label: 'Вступительный контент',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    singular: 'Блок форм',
    plural: 'Блоки форм',
  },
}
