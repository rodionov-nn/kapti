import Link from 'next/link'
import { Media } from '@/components/Media'

interface Product {
  id: string | number
  slug: string
  image: any
}

interface ProductGridProps {
  products: Product[]
  categorySlug: string
}

export function ProductGrid({ products, categorySlug }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="text-center text-gray-500">В этой категории пока нет товаров.</p>
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
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
  )
}
