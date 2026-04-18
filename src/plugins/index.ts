import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Kapti` : 'Kapti'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
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
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              label: 'Откуда (URL)',
              admin: {
                description: 'Введите относительный путь, например /old-page',
              },
            }
          }

          if ('name' in field && field.name === 'to') {
            return {
              ...field,
              label: 'Куда (Назначение)',
              fields: field.fields.map((subField) => {
                if (subField.name === 'type') {
                  return {
                    ...subField,
                    label: 'Тип ссылки',
                    options: [
                      { label: 'Внутренняя страница', value: 'reference' },
                      { label: 'Кастомный URL', value: 'custom' },
                    ],
                  }
                }
                if (subField.name === 'reference') {
                  return { ...subField, label: 'Выберите страницу или пост' }
                }
                if (subField.name === 'url') {
                  return { ...subField, label: 'Внешний URL' }
                }
                return subField
              }),
            }
          }

          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
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
        return defaultFields.map((field) => {
          // 1. Название формы
          if ('name' in field && field.name === 'title') {
            return { ...field, label: 'Название формы' }
          }

          // 2. Конструктор полей (включая названия типов блоков)
          if ('name' in field && field.name === 'fields') {
            return {
              ...field,
              label: 'Поля формы',
              labels: { singular: 'Поле', plural: 'Поля' },
              blocks: field.blocks?.map((block) => {
                // Перевод названий самих блоков в выпадающем списке
                const blockLabels: Record<string, string> = {
                  text: 'Текстовое поле',
                  email: 'Email',
                  textarea: 'Длинный текст',
                  select: 'Выбор (Select)',
                  checkbox: 'Чекбокс',
                  country: 'Страна',
                  state: 'Штат/Регион',
                  number: 'Число',
                  message: 'Текстовое сообщение (статичное)',
                }

                return {
                  ...block,
                  labels: {
                    singular: blockLabels[block.slug] || block.slug,
                    plural: blockLabels[block.slug] || block.slug,
                  },
                  fields: block.fields?.map((blockField) => {
                    if ('name' in blockField) {
                      switch (blockField.name) {
                        case 'name':
                          return {
                            ...blockField,
                            label: 'Системное имя (ID)',
                            admin: { description: 'Только латиница, без пробелов' },
                          }
                        case 'label':
                          return { ...blockField, label: 'Заголовок поля' }
                        case 'width':
                          return { ...blockField, label: 'Ширина поля (%)' }
                        case 'defaultValue':
                          return { ...blockField, label: 'Значение по умолчанию' }
                        case 'required':
                          return { ...blockField, label: 'Обязательное поле' }
                        case 'placeholder':
                          return { ...blockField, label: 'Плейсхолдер' }
                        case 'options':
                          return { ...blockField, label: 'Варианты выбора' }
                      }
                    }
                    return blockField
                  }),
                }
              }),
            }
          }

          // 3. Настройки подтверждения (Confirmation)
          if ('name' in field && field.name === 'confirmationType') {
            return {
              ...field,
              label: 'Тип подтверждения',
              options: [
                { label: 'Сообщение', value: 'message' },
                { label: 'Перенаправление (Redirect)', value: 'redirect' },
              ],
            }
          }

          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              label: 'Сообщение после отправки',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                  // Используем defaultFeatures или rootFeatures
                  return [
                    ...defaultFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                  ]
                },
              }),
            }
          }

          if ('name' in field && field.name === 'redirect') {
            return {
              ...field,
              label: 'Настройки перенаправления',
              fields: field.fields.map((sub) => ({
                ...sub,
                label: sub.name === 'url' ? 'URL для перехода' : sub.label,
              })),
            }
          }

          // 4. Настройки Email (Emails)
          if ('name' in field && field.name === 'emails') {
            return {
              ...field,
              label: 'Настройки уведомлений (Email)',
              admin: {
                description:
                  'Настройка автоматических писем после отправки формы. Используйте {{fieldName}} для вставки данных из полей (например, {{email}}). Используйте {{*}} для вывода всех данных.',
              },
              labels: { singular: 'Письмо', plural: 'Письма' },
              fields: field.fields.map((emailField) => {
                // ПРОВЕРКА: Если это строка (row), нужно зайти внутрь её полей
                if (emailField.type === 'row' && 'fields' in emailField) {
                  return {
                    ...emailField,
                    fields: emailField.fields.map((rowSubField) => {
                      if ('name' in rowSubField) {
                        switch (rowSubField.name) {
                          case 'cc':
                            return { ...rowSubField, label: 'Копия (CC)' }
                          case 'bcc':
                            return { ...rowSubField, label: 'Скрытая копия (BCC)' }
                          case 'replyTo':
                            return { ...rowSubField, label: 'Адрес для ответа (Reply-To)' }
                          case 'emailFrom':
                            return {
                              ...rowSubField,
                              label: 'От кого (Email)',
                              placeholder: '"Имя" <email@example.com>',
                            }
                        }
                      }
                      return rowSubField
                    }),
                  }
                }

                // Обычная проверка для полей вне строк
                if ('name' in emailField) {
                  switch (emailField.name) {
                    case 'emailTo':
                      return {
                        ...emailField,
                        label: 'Кому отправить',
                        admin: { description: 'Можно указать несколько через запятую' },
                      }
                    case 'subject':
                      return { ...emailField, label: 'Тема письма' }
                    case 'message':
                      return {
                        ...emailField,
                        label: 'Текст письма',
                        admin: {
                          description: 'Текст сообщения, который будет отправлен в письме.',
                        },
                      }
                  }
                }
                return emailField
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
    },
  }),
]
