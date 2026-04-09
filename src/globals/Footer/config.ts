import { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
    slug: 'footer',
    label: 'Подвал сайта',
    admin: {
        group: 'Навигация',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Навигация',
                    fields: [
                        {
                            name: 'navLinks',
                            label: 'Ссылки меню',
                            type: 'array',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'label',
                                            label: 'Текст ссылки',
                                            type: 'text',
                                            required: true,
                                            admin: { width: '50%' }
                                        },
                                        {
                                            name: 'linkType',
                                            type: 'select',
                                            options: [
                                                { label: 'Внутренняя', value: 'internal' },
                                                { label: 'Кастомная/Якорь', value: 'custom' }
                                            ],
                                            defaultValue: 'internal',
                                            admin: { width: '50%' }
                                        },
                                    ]
                                },
                                {
                                    name: 'internalLink',
                                    type: 'relationship',
                                    relationTo: ['categories'],
                                    admin: { condition: (_, siblingData) => siblingData?.linkType === 'internal' }
                                },
                                {
                                    name: 'externalLink',
                                    type: 'text',
                                    admin: { condition: (_, siblingData) => siblingData?.linkType === 'custom' }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Контакты и Соцсети',
                    fields: [
                        {
                            name: 'copyrightText',
                            label: 'Текст копирайта',
                            type: 'text',
                            defaultValue: 'kapti. Все права защищены.'
                        },
                        {
                            name: 'socials',
                            label: 'Социальные сети',
                            type: 'array',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        { name: 'platform', type: 'text', label: 'Название (напр. Telegram)' },
                                        { name: 'url', type: 'text', label: 'Ссылка' }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}