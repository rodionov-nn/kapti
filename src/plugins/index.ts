import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { translateFields } from './translateFields'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title}` : 'Kapti'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
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
      fields: ({ defaultFields }) => translateFields(defaultFields),
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    fields: ({ defaultFields }) => translateFields(defaultFields),
  }),
]
