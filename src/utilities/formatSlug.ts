import slugify from 'slugify'

/**
 * Safe slug generation.
 * If string is not a string or empty, returns empty string, too not cause admin panel malfunctioning.
 */
export const formatSlug = (val: unknown): string => {
  if (typeof val === 'string' && val.length > 0) {
    return slugify(val, {
      lower: true,
      strict: true,
      trim: true,
      locale: 'ru',
    })
  }

  return ''
}
