import { Field } from 'payload'
import slugify from 'slugify'

export const slugField = (fieldToLookAt: string = 'title'): Field => ({
    name: 'slug',
    label: 'URL-адрес',
    type: 'text',
    index: true,
    unique: true,
    admin: {
        position: 'sidebar',
        description: 'Только латиница. Генерируется автоматически.',
    },
    hooks: {
        beforeValidate: [
            ({ value, data, operation, originalDoc }) => {
                const sourceValue = data?.[fieldToLookAt]

                // 1. Если поле пустое (стерли вручную) — генерируем заново
                if (!value && sourceValue) {
                    return slugify(sourceValue, { lower: true, strict: true, locale: 'ru' })
                }

                // 2. Логика автоматического обновления при изменении исходного поля
                if (operation === 'update' && sourceValue) {
                    const oldSourceValue = originalDoc?.[fieldToLookAt]

                    // Если название изменилось, обновляем слаг
                    if (sourceValue !== oldSourceValue) {
                        return slugify(sourceValue, { lower: true, strict: true, locale: 'ru' })
                    }
                }

                // 3. Для создания (create), если слаг не введен
                if (operation === 'create' && !value && sourceValue) {
                    return slugify(sourceValue, { lower: true, strict: true, locale: 'ru' })
                }

                return value
            },
        ],
    },
})