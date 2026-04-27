import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { Media } from '@/components/Media'

interface PageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: productSlug } = await params
  const payload = await getPayload({ config: configPromise })

  const productData = await payload.find({
    collection: 'products',
    where: { slug: { equals: productSlug } },
    limit: 1,
  })

  const product = productData.docs[0]

  if (!product) {
    return {
      title: 'Продукт не найден',
    }
  }

  const ogImage =
    typeof product.image === 'object' && product.image?.url ? [{ url: product.image.url }] : []

  return {
    title: `${product.name} | Kapti`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      images: ogImage,
    },
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    limit: 1000,
    depth: 1,
  })

  return products.docs.map((product) => {
    const categorySlug =
      typeof product.category === 'object' && product.category?.slug
        ? product.category.slug
        : 'unknown'

    return {
      category: categorySlug,
      slug: product.slug,
    }
  })
}

export default async function ProductPage({ params }: PageProps) {
  const { category: categorySlug, slug: productSlug } = await params
  const payload = await getPayload({ config: configPromise })

  const productData = await payload.find({
    collection: 'products',
    where: { slug: { equals: productSlug } },
    limit: 1,
  })

  const product = productData.docs[0]

  if (!product) notFound()

  const isMatchingCategory =
    typeof product.category === 'object' && product.category?.slug === categorySlug

  if (!isMatchingCategory) notFound()

  return (
    <main className="py-24">
      <section className="container">
        <h1 className="text-center text-4xl font-bold mb-8">{product.name}</h1>

        <div className="relative w-full max-w-6xl mx-auto aspect-2/1 mb-12">
          <Media
            resource={product.image}
            priority
            fill
            imgClassName="object-cover rounded-xl select-none"
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Описание</h2>
            <p className="text-lg leading-relaxed text-gray-800">{product.description}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4 border-b pb-2">Характеристики</h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-semibold text-gray-600">Вес:</span> {product.weight} г
                  </li>
                  <li>
                    <span className="font-semibold text-gray-600">В упаковке:</span>{' '}
                    {product.packCount} шт.
                  </li>
                  <li>
                    <span className="font-semibold text-gray-600">Срок хранения:</span>{' '}
                    {product.shelfLife}
                  </li>
                  <li>
                    <span className="font-semibold text-gray-600">Условия:</span>{' '}
                    {product.storageConditions}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 border-b pb-2">Состав</h3>
                <p className="leading-snug">{product.ingredients}</p>
                {product.dietaryInfo && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md">
                    <span className="font-bold text-amber-900">Особенности:</span>{' '}
                    {product.dietaryInfo}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Пищевая ценность (на 100 г)</h3>
              <table className="w-full text-left">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 font-medium text-gray-600">Калорийность</td>
                    <td className="py-3 text-right font-bold">
                      {product.nutrition?.calories} кКал
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-gray-600">Энергия</td>
                    <td className="py-3 text-right">{product.nutrition?.kJ} кДж</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-gray-600">Белки</td>
                    <td className="py-3 text-right">{product.nutrition?.protein} г</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-gray-600">Жиры</td>
                    <td className="py-3 text-right">{product.nutrition?.fat} г</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-gray-600">Углеводы</td>
                    <td className="py-3 text-right">{product.nutrition?.carbs} г</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
