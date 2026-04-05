import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Пользователь',
    plural: 'Пользователи',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Администрирование',
    defaultColumns: ['name', 'email', 'role'],
  },
  auth: true,
  access: {
    // Только Super Admin может создавать новых юзеров
    create: ({ req: { user } }) => user?.role === 'super-admin',
    // Только Super Admin видит всех, остальные — только себя
    read: ({ req: { user } }) => {
      if (user?.role === 'super-admin') return true
      return { id: { equals: user?.id } }
    },
  },
  fields: [
    {
      name: 'name',
      label: 'Имя',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Роль',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
      ],
      access: {
        // Запрещаем обычным админам менять поле роли
        read: ({ req: { user } }) => user?.role === 'super-admin',
        update: ({ req: { user } }) => user?.role === 'super-admin',
      },
      admin: {
        position: 'sidebar', // Убираем в боковую панель, чтобы не мешало
      },
    },
  ],
}