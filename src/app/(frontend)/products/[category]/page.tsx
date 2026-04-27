import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductGrid } from '@/components/ProductGrid'

interface PageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  return categories.docs.map((cat) => ({
    category: cat.slug,
  }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params
  const payload = await getPayload({ config: configPromise })

  const categoryData = await payload.find({
    collection: 'categories',
    where: { slug: { equals: categorySlug } },
    limit: 1,
  })

  const category = categoryData.docs[0]

  if (!category) {
    notFound()
  }

  const productsRes = await payload.find({
    collection: 'products',
    limit: 100,
    depth: 1,
    where: {
      'category.id': {
        equals: category.id,
      },
    },
  })

  const products = productsRes.docs

  return (
    <main className="py-8">
      <section className="container">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Продукты', href: '/products' },
            { label: category.name },
          ]}
        />
        <h1 className="text-center mb-8">{category.name}</h1>
        {category.description && (
          <p className="text-center text-xl mb-12 -mt-4">{category.description}</p>
        )}

        <ProductGrid products={products} categorySlug={categorySlug} />
      </section>
    </main>
  )
}
