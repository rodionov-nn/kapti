import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Media } from '@/components/Media'

interface PageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params

  const payload = await getPayload({ config: configPromise })

  const productsRes = await payload.find({
    collection: 'products',
    limit: 100,
    depth: 1,
    where: {
      'category.slug': {
        equals: categorySlug,
      },
    },
  })

  if (productsRes.docs.length === 0) {
    const categoryExists = await payload.find({
      collection: 'categories',
      where: { slug: { equals: categorySlug } },
    })

    if (categoryExists.docs.length === 0) {
      notFound()
    }
  }

  const products = productsRes.docs

  return (
    <main className="py-24">
      <section className="container">
        <h1 className="text-center mb-8">
          {/* Берем название категории из первого попавшегося продукта */}
          {typeof products[0]?.category === 'object' ? products[0].category.name : 'Продукты'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-28">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${categorySlug}/${product.slug}`}
              className="relative aspect-2/1 w-full select-none hover:scale-105 hover:rotate-5 cursor-pointer"
            >
              <Media resource={product.image} priority fill imgClassName="object-cover" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
