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
      <section className="container text-center">
        <h1>Наши продукты</h1>
        {categories.map((category) => {
          // Фильтруем продукты, которые принадлежат текущей категории
          const categoryProducts = allProducts.filter((product) => {
            const pCat = product.category
            // Проверка на объект (depth) или ID
            return typeof pCat === 'object' ? pCat.id === category.id : pCat === category.id
          })

          return (
            <section key={category.id} id={category.slug} className="mb-20 scroll-mt-28 px-28">
              <div className="mb-8 pb-4">
                <h2>{category.name}</h2>
              </div>

              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${category.slug}/${product.slug}`}
                      className="relative aspect-2/1 w-full select-none hover:scale-105 hover:rotate-5 cursor-pointer"
                    >
                      <Media resource={product.image} priority fill imgClassName="object-cover" />
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
    title: `Каталог продукции kapti - Батончики, Щербеты, Козинаки`,
  }
}
