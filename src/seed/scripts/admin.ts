import { Payload } from 'payload'

export const seedAdmin = async (payload: Payload): Promise<void> => {
  const adminEmail = process.env.ADMIN_EMAIL!
  const adminPassword = process.env.ADMIN_PASSWORD!

  if (!adminEmail || !adminPassword) {
    payload.logger.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env')
    return
  }

  const { totalDocs } = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
  })

  if (totalDocs > 0) return

  await payload.create({
    collection: 'users',
    data: {
      email: adminEmail,
      password: adminPassword,
      name: process.env.ADMIN_NAME || 'Admin',
    },
  })
}
