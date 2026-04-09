import { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
    slug: 'header',
    label: 'Шапка сайта',
    admin: {
        group: 'Навигация',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'navItems',
            label: 'Навигация',
            type: 'array',
            maxRows: 6,
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
                            label: 'Тип ссылки',
                            type: 'select',
                            defaultValue: 'internal',
                            options: [
                                { label: 'Внутренняя страница', value: 'internal' },
                                { label: 'Кастомная (якорь или URL)', value: 'custom' },
                            ],
                            admin: { width: '50%' }
                        },
                    ]
                },
                {
                    name: 'internalLink',
                    label: 'Выберите страницу',
                    type: 'relationship',
                    relationTo: ['categories'],
                    admin: {
                        condition: (_, siblingData) => siblingData?.linkType === 'internal',
                    },
                },
                {
                    name: 'externalLink',
                    label: 'URL или Якорь (например, /#contact)',
                    type: 'text',
                    admin: {
                        condition: (_, siblingData) => siblingData?.linkType === 'custom',
                    },
                },
                {
                    name: 'isButton',
                    label: 'Отображать как кнопку?',
                    type: 'checkbox',
                    defaultValue: false,
                }
            ]
        },
        {
            name: 'logo',
            label: 'Логотип',
            type: 'upload',
            relationTo: 'media',
        }
    ]
}