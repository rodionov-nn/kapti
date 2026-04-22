import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const [categoriesRes, productsRes] = await Promise.all([
    payload.find({
      collection: 'categories',
      limit: 100,
      sort: 'id',
    }),
    payload.find({
      collection: 'products',
      limit: 200,
      depth: 1,
    }),
  ])

  const categories = categoriesRes.docs
  const allProducts = productsRes.docs

  return (
    <main className="pt-24 pb-24">
      <section className="container ">
        <h1>Наши продукты</h1>
        {categories.map((category) => {
          // Фильтруем продукты, которые принадлежат текущей категории
          const categoryProducts = allProducts.filter((product) => {
            const pCat = product.category
            // Проверка на объект (depth) или ID
            return typeof pCat === 'object' ? pCat.id === category.id : pCat === category.id
          })

          return (
            <section key={category.id} id={category.slug} className="mb-20 scroll-mt-28">
              <div className="border-b mb-8 pb-4">
                <h2 className="text-3xl font-bold">{category.name}</h2>
                {/* Здесь можно вывести описание категории, если добавишь его в схему */}
              </div>

              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
                    <Link key={product.id} href={`/products/${category.slug}/${product.slug}`}>
                      <Media resource={product.image} priority imgClassName="object-cover" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">В этой категории пока нет товаров.</p>
              )}
            </section>
          )
        })}
      </section>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
