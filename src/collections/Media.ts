import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  labels: {
    singular: 'Медиа',
    plural: 'Медиа',
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'caption'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description:
          'Краткое описание того, что изображено на картинке. Важно для доступности и SEO.',
      },
      required: true,
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' || operation === 'update') {
              if (!data?.alt && data?.filename) {
                return data.filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
              }
            }
            return data?.alt
          },
        ],
      },
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'caption',
      label: 'Подпись',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' || operation === 'update') {
          if (req.file && req.file.data) {
            try {
              const base64 = await sharp(req.file.data)
                .resize(10)
                .blur()
                .toBuffer()
                .then((data) => `data:image/png;base64,${data.toString('base64')}`)

              return {
                ...data,
                blurDataURL: base64,
              }
            } catch (err) {
              console.error('Ошибка генерации blurDataURL:', err)
            }
          }
        }
        return data
      },
    ],
  },
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
