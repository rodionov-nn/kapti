import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductGrid } from '@/components/ProductGrid'

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
    <main className="py-8">
      <section className="container text-center">
        <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Продукты' }]} />
        <h1 className="mb-4">Наши продукты</h1>
        {categories.map((category) => {
          const categoryProducts = allProducts.filter((product) => {
            const pCat = product.category
            if (!pCat) return false
            return typeof pCat === 'object' ? pCat.id === category.id : pCat === category.id
          })

          return (
            <section key={category.id} id={category.slug} className="mb-20">
              <div className="mb-8 pb-4">
                <h2>{category.name}</h2>
                {category.description && <p className="mt-4 text-xl">{category.description}</p>}
              </div>

              <ProductGrid products={categoryProducts} categorySlug={category.slug} />
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
