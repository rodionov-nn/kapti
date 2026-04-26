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
    <main className="py-24">
      <section className="container">
        <h1 className="text-center mb-8">{category.name}</h1>
        {category.description && (
          <p className="text-center text-xl mb-12 -mt-4">{category.description}</p>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${categorySlug}/${product.slug}`}
                className="relative aspect-2/1 w-full select-none hover:scale-105 hover:rotate-2 transition-transform cursor-pointer"
              >
                <Media resource={product.image} priority fill imgClassName="object-cover" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">В этой категории пока нет товаров.</p>
        )}
      </section>
    </main>
  )
}
