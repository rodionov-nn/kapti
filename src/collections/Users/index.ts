import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  labels: {
    singular: 'Пользователь',
    plural: 'Пользователи',
  },
  admin: {
    defaultColumns: ['name', 'email'],
    group: 'Администрирование',
    useAsTitle: 'name',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: (args) => {
        const token = args?.token
        const user = args?.user

        const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const resetPasswordURL = `${serverURL}/admin/reset/${token}`

        return `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">Восстановление пароля</h2>
          <p>Привет, ${user?.name || user?.email || 'пользователь'}!</p>
          <p>Чтобы сбросить пароль для учетной записи на <b>kapti.ru</b>, нажмите на кнопку ниже:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetPasswordURL}" 
               style="background-color: #171717; color: #ededed; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Сбросить пароль
            </a>
          </div>
          <p style="font-size: 12px; color: #666;">
            Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.
            Ссылка активна в течение часа.
          </p>
        </div>
      `
      },
      generateEmailSubject: () => 'Сброс пароля | kapti',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}
