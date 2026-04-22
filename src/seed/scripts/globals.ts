import { Payload } from 'payload'

export const seedGlobals = async (payload: Payload): Promise<void> => {
  payload.logger.info('Syncing globals (Header & Footer)...')

  const mediaRes = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'logo' } },
    depth: 0,
  })

  if (mediaRes.docs.length === 0) {
    payload.logger.error('✘ Logo not found in media: logo.png')
    return
  }

  const logoId = mediaRes.docs[0].id

  try {
    await payload.updateGlobal({
      slug: 'header',
      context: { disableRevalidate: true },
      data: {
        logo: logoId,
        navItems: [
          {
            link: {
              type: 'custom',
              url: '/products',
              label: 'Каталог',
              newTab: false,
            },
          },
          {
            link: {
              type: 'custom',
              url: '/contacts',
              label: 'Контакты',
              newTab: false,
            },
          },
        ],
      },
    })
    payload.logger.info('✔ Header seeded')
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(`✘ Failed to seed Header: ${message}`)
  }

  try {
    await payload.updateGlobal({
      slug: 'footer',
      context: { disableRevalidate: true },
      data: {
        logo: logoId,
        navItems: [
          {
            link: {
              type: 'custom',
              url: '/products',
              label: 'Продукция',
              newTab: false,
            },
          },
          {
            link: {
              type: 'custom',
              url: '/contacts',
              label: 'Контакты',
              newTab: false,
            },
          },
        ],
      },
    })
    payload.logger.info('✔ Footer seeded')
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(`✘ Failed to seed Footer: ${message}`)
  }
}
