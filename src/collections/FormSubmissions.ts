import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Заявка',
    plural: 'Заявки',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: () => false,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Сообщение',
      required: true,
    },
    {
      name: 'recipientEmail',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          try {
            const to = doc.recipientEmail || process.env.SMTP_USER || 'admin@example.com'
            
            await req.payload.sendEmail({
              to,
              subject: `Новая заявка с сайта от ${doc.name}`,
              html: `
                <h2>Новая заявка</h2>
                <p><strong>Имя:</strong> ${doc.name}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Сообщение:</strong></p>
                <p>${doc.message}</p>
              `,
            })
          } catch (error) {
            req.payload.logger.error({ err: error }, 'Error sending email for form submission')
          }
        }
      },
    ],
  },
}
