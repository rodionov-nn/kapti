import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { translateFields } from './translateFields'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Kapti` : 'Kapti'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'products'],
    overrides: {
      labels: {
        singular: 'Редирект',
        plural: 'Редиректы',
      },
      admin: {
        group: 'Навигация',
        description:
          'Настройте автоматическое перенаправление пользователей со старых или нерабочих адресов (URL) на новые страницы. Это помогает избежать ошибки 404 и сохраняет позиции сайта в поисковиках',
      },
      // @ts-expect-error - This is a valid override
      fields: ({ defaultFields }) => translateFields(defaultFields),
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    // @ts-expect-error - This is a valid override
    fields: ({ defaultFields }) => translateFields(defaultFields),
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      labels: {
        singular: 'Форма',
        plural: 'Формы',
      },
      admin: {
        group: 'Формы',
      },
      fields: ({ defaultFields }) => {
        const translated = translateFields(defaultFields)
        return translated.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                  return [
                    ...defaultFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      labels: {
        singular: 'Заявка',
        plural: 'Заявки',
      },
      admin: {
        group: 'Формы',
      },
      fields: ({ defaultFields }) => translateFields(defaultFields),
    },
  }),
]
