import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Products: CollectionConfig = {
    slug: 'products',
    labels: { singular: 'Продукт', plural: 'Продукты' },
    admin: {
        useAsTitle: 'name',
        group: 'Контент',
        defaultColumns: ['name', 'category', 'slug'],
    },
    fields: [
        {
            name: 'name',
            label: 'Название продукта',
            type: 'text',
            required: true,
        },
        {
            name: 'category',
            label: 'Категория',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
            admin: { position: 'sidebar' },
        },
        {
            name: 'description',
            label: 'Описание для сайта',
            type: 'textarea',
            required: true,
        },
        {
            name: 'image',
            label: 'Изображение',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'weight',
                    label: 'Вес продукта (г)',
                    type: 'number',
                    required: true,
                    admin: { width: '50%' },
                },
                {
                    name: 'packCount',
                    label: 'Штук в упаковке',
                    type: 'number',
                    required: true,
                    admin: { width: '50%' },
                },
            ],
        },
        {
            name: 'ingredients',
            label: 'Состав',
            type: 'textarea',
            required: true,
        },
        {
            name: 'dietaryInfo',
            label: 'Особенности состава (глютен, орехи и т.д.)',
            type: 'text',
            admin: {
                description: 'Например: Содержит глютен и арахис',
            }
        },
        {
            name: 'nutrition',
            label: 'Пищевая ценность (на 100г)',
            type: 'group',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'calories',
                            label: 'кКал',
                            type: 'number',
                            required: true,
                            admin: { width: '20%' }
                        },
                        {
                            name: 'kJ',
                            label: 'кДж',
                            type: 'number',
                            required: true,
                            admin: { width: '20%' }
                        },
                        {
                            name: 'protein',
                            label: 'Белки (г)',
                            type: 'number',
                            required: true,
                            admin: { width: '20%', step: 0.1 }
                        },
                        {
                            name: 'fat',
                            label: 'Жиры (г)',
                            type: 'number',
                            required: true,
                            admin: { width: '20%', step: 0.1 }
                        },
                        {
                            name: 'carbs',
                            label: 'Углеводы (г)',
                            type: 'number',
                            required: true,
                            admin: { width: '20%', step: 0.1 }
                        },
                    ],
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'storageConditions',
                    label: 'Условия хранения',
                    type: 'textarea',
                    required: true,
                    admin: { width: '50%' },
                },
                {
                    name: 'shelfLife',
                    label: 'Срок хранения',
                    type: 'text',
                    required: true,
                    admin: { width: '50%', description: 'Например: 12 Месяцев' },
                },
            ],
        },
        {
            name: 'slug',
            label: 'URL-адрес (латиница)',
            type: 'text',
            unique: true,
            index: true,
            admin: { position: 'sidebar' },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        const source = value || data?.name;
                        if (source) {
                            return slugify(source, { lower: true, strict: true, locale: 'ru' });
                        }
                        return value;
                    },
                ],
            },
        },
    ],
}