import { Field } from 'payload'

const dict = {
  labels: {
    from: 'Откуда (URL)',
    to: 'Куда (Назначение)',
    type: 'Тип',
    reference: 'Документ (Страница/Пост)',
    url: 'Внешний URL',
    title: 'Название',
    fields: 'Поля',
    submitButtonLabel: 'Текст кнопки отправки',
    confirmationType: 'Тип подтверждения',
    confirmationMessage: 'Сообщение после отправки',
    redirect: 'Перенаправление',
    emails: 'Уведомления (Email)',
    emailTo: 'Кому',
    cc: 'Копия (CC)',
    bcc: 'Скрытая копия (BCC)',
    replyTo: 'Ответить (Reply-To)',
    emailFrom: 'От кого',
    subject: 'Тема письма',
    message: 'Сообщение',
    name: 'Системное имя (ID)',
    label: 'Заголовок поля',
    width: 'Ширина (%)',
    defaultValue: 'Значение по умолчанию',
    required: 'Обязательное',
    placeholder: 'Плейсхолдер',
    options: 'Варианты',
    value: 'Значение',
    form: 'Форма',
    submissionData: 'Данные формы',
    field: 'Поле',
    meta: 'SEO',
    description: 'Описание (Meta Description)',
    image: 'Изображение',
    preview: 'Предпросмотр',
  },
  blocks: {
    text: 'Текстовое поле',
    email: 'Email',
    textarea: 'Длинный текст',
    select: 'Выпадающий список',
    checkbox: 'Чекбокс',
    country: 'Страна',
    state: 'Регион',
    number: 'Число',
    message: 'Статичное сообщение',
    payment: 'Оплата',
  },
  options: {
    reference: 'Внутренняя ссылка',
    custom: 'Произвольный URL',
    message: 'Текстовое сообщение',
    redirect: 'Перенаправление',
  },
}

export function translateFields(fields: Field[]): Field[] {
  return fields.map((field) => {
    const newField: any = { ...field }

    // Translate field label based on its name
    if (
      'name' in newField &&
      typeof newField.name === 'string' &&
      dict.labels[newField.name as keyof typeof dict.labels]
    ) {
      newField.label = dict.labels[newField.name as keyof typeof dict.labels]
    }

    // Special fallback for unnamed group/tab labels
    if ('label' in newField && typeof newField.label === 'string') {
      const lowerLabel = newField.label.toLowerCase()
      if (lowerLabel === 'seo') newField.label = dict.labels.meta
      if (lowerLabel === 'content') newField.label = 'Контент'
    }

    // Translate options if it's a radio or select
    if (
      (newField.type === 'radio' || newField.type === 'select') &&
      Array.isArray(newField.options)
    ) {
      newField.options = newField.options.map((opt: any) => {
        if (typeof opt === 'string') return opt
        if (dict.options[opt.value as keyof typeof dict.options]) {
          return { ...opt, label: dict.options[opt.value as keyof typeof dict.options] }
        }
        return opt
      })
    }

    // Recursively translate nested fields
    if ('fields' in newField && Array.isArray(newField.fields)) {
      newField.fields = translateFields(newField.fields)
    }

    // Recursively translate blocks
    if (newField.type === 'blocks' && Array.isArray(newField.blocks)) {
      newField.blocks = newField.blocks.map((block: any) => {
        const newBlock = { ...block }
        if (dict.blocks[block.slug as keyof typeof dict.blocks]) {
          newBlock.labels = {
            singular: dict.blocks[block.slug as keyof typeof dict.blocks],
            plural: dict.blocks[block.slug as keyof typeof dict.blocks],
          }
        }
        if (Array.isArray(block.fields)) {
          newBlock.fields = translateFields(block.fields)
        }
        return newBlock
      })
    }

    // Translate tabs
    if (newField.type === 'tabs' && Array.isArray(newField.tabs)) {
      newField.tabs = newField.tabs.map((tab: any) => {
        const newTab = { ...tab }
        if (newTab.label && typeof newTab.label === 'string') {
          const lowerLabel = newTab.label.toLowerCase()
          if (lowerLabel === 'seo') newTab.label = dict.labels.meta
          if (lowerLabel === 'content') newTab.label = 'Контент'
        }
        if (Array.isArray(tab.fields)) {
          newTab.fields = translateFields(tab.fields)
        }
        return newTab
      })
    }

    return newField
  })
}
