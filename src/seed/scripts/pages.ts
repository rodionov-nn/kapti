import { Payload } from 'payload'

export const seedPages = async (payload: Payload) => {
  payload.logger.info('Seeding Pages...')

  try {
    const existingPage = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
    })

    const mediaRes = await payload.find({
      collection: 'media',
      where: { alt: { equals: 'hero' } },
      limit: 1,
    })

    const mediaId = mediaRes.docs.length > 0 ? mediaRes.docs[0].id : null

    if (!mediaId) {
      payload.logger.warn('⚠ No media found with alt "hero". Make sure media is seeded first.')
    }

    const categoriesRes = await payload.find({
      collection: 'categories',
      limit: 3,
      sort: 'id',
    })

    const categoryIds = categoriesRes.docs.map((doc) => doc.id)

    const homePageData = {
      title: 'Главная',
      slug: 'home',
      generateSlug: false,
      _status: 'published',
      publishedAt: new Date().toISOString(),
      hero: {
        type: 'highImpact',
        richText: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'heading',
                tag: 'h1',
                direction: 'center',
                format: 'center',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Энергия в каждом вкусе',
                    version: 1,
                  },
                ],
              },
              {
                type: 'paragraph',
                direction: 'center',
                format: 'center',
                indent: 0,
                version: 1,
                textStyle: '',
                textFormat: 0,
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Натуральные батончики и щербеты для тех, кто в движении. Вкусно, удобно, по-настоящему.',
                    version: 1,
                  },
                ],
              },
            ],
          },
        },
        links: [
          {
            link: {
              type: 'custom',
              url: '/products',
              label: 'Смотреть продукцию',
              appearance: 'outline',
            },
          },
        ],
        media: mediaId,
      },
      layout: [
        {
          blockType: 'separator',
          spacing: 'medium',
          color: 'default',
        },
        {
          blockType: 'categoriesSelection',
          title: 'Наши продукты',
          selectedCategories: categoryIds,
          links: [
            {
              link: {
                type: 'custom',
                url: '/products',
                label: 'Весь каталог',
                appearance: 'default',
              },
            },
          ],
        },
        {
          blockType: 'separator',
          spacing: 'medium',
          color: 'default',
        },
        {
          blockType: 'contact',
          title: 'Связаться',
          recipientEmail: 'rodionov.nmx@gmail.com',
          contacts: [
            {
              icon: 'phone',
              link: {
                type: 'custom',
                url: 'tel:+77083786442',
                label: '+7 (708) 378-64-42',
              },
            },
            {
              icon: 'whatsapp',
              link: {
                type: 'custom',
                newTab: true,
                url: 'https://wa.me/77083786442',
                label: 'WhatsApp',
              },
            },
            {
              icon: 'mail',
              link: {
                type: 'custom',
                url: 'mailto:k.kapti@mail.ru',
                label: 'k.kapti@mail.ru',
              },
            },
          ],
        },
      ],
      meta: {
        title: 'Натуральные кондитерские изделия для дистрибьютеров',
        description:
          'Kapti — производитель широкой линейки кондитерских изделий для оптовиков и дистрибьютеров',
        image: mediaId,
      },
    }

    if (existingPage.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existingPage.docs[0].id,
        data: homePageData as any,
        context: { disableRevalidate: true },
      })

      payload.logger.info('✔ Home page updated successfully!')
      return
    }

    await payload.create({
      collection: 'pages',
      data: homePageData as any,
      context: { disableRevalidate: true },
    })

    payload.logger.info('✔ Home page seeded successfully!')
  } catch (error: any) {
    payload.logger.error(`✘ Failed to seed Home page: ${error.message || error}`)
  }
}
