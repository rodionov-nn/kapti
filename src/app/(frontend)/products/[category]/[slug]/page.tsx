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

  if (!product) {
    notFound()
  }

  const isMatchingCategory =
    typeof product.category === 'object' && product.category?.slug === categorySlug

  if (!isMatchingCategory) {
    notFound()
  }

  return (
    <main className="py-24">
      <section className="container">
        <h1 className="text-center font-bold mb-4">{product.name}</h1>

        <div className="relative w-full max-w-6xl mx-auto aspect-2/1 mb-8">
          <Media
            resource={product.image}
            priority
            fill
            imgClassName="object-cover rounded-xl select-none"
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Описание</h2>
            <p className="text-lg">{product.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Характеристики</h3>
                <ul className="space-y-1">
                  <li>
                    <span className="font-semibold">Вес продукта:</span> {product.weight} г
                  </li>
                  <li>
                    <span className="font-semibold">В упаковке:</span> {product.packCount} шт.
                  </li>
                  <li>
                    <span className="font-semibold">Срок хранения:</span> {product.shelfLife}
                  </li>
                  <li>
                    <span className="font-semibold">Условия хранения:</span>{' '}
                    {product.storageConditions}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Состав</h3>
                <p>{product.ingredients}</p>
                {product.dietaryInfo && (
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Особенности:</span> {product.dietaryInfo}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Пищевая ценность (на 100 г)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-300 rounded-lg">
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2 font-semibold border-r border-gray-200">
                        Энергетическая ценность
                      </td>
                      <td className="px-4 py-2">
                        {product.nutrition?.calories} кКал / {product.nutrition?.kJ} кДж
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2 font-semibold border-r border-gray-200">Белки</td>
                      <td className="px-4 py-2">{product.nutrition?.protein} г</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2 font-semibold border-r border-gray-200">Жиры</td>
                      <td className="px-4 py-2">{product.nutrition?.fat} г</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2 font-semibold border-r border-gray-200">Углеводы</td>
                      <td className="px-4 py-2">{product.nutrition?.carbs} г</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
