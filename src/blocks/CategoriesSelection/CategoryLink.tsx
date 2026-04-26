'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

// --- Вспомогательные функции (вычисления "веера") ---

const getRotations = (count: number) => {
  if (count <= 1) return [0]
  const maxAngle = 12
  const step = (maxAngle * 2) / (count - 1)
  return Array.from({ length: count }, (_, i) => -maxAngle + step * i)
}

const getOffsetsX = (count: number) => {
  if (count <= 1) return [0]
  const maxOffset = 30
  const step = (maxOffset * 2) / (count - 1)
  return Array.from({ length: count }, (_, i) => -maxOffset + step * i)
}

const getOffsetsY = (count: number) => {
  if (count <= 1) return [0]
  return Array.from({ length: count }, (_, i) => Math.sin((i / (count - 1)) * Math.PI) * 5)
}

// --- Сам компонент ---

interface CategoryLinkProps {
  slug: string
  products: any[]
  className?: string
}

export const CategoryLink = ({ slug, products, className }: CategoryLinkProps) => {
  const n = products.length
  if (n === 0) return null

  const rotations = getRotations(n)
  const offsetsX = getOffsetsX(n)
  const offsetsY = getOffsetsY(n)

  const centerIndex = Math.floor(n / 2)

  return (
    <Link
      href={`/products/${slug}`}
      className={cn(
        'relative inline-block cursor-pointer select-none w-full max-w-[440px] aspect-[11/5] overflow-clip hover:scale-105 group',
        className,
      )}
    >
      {products.map((product: any, i: number) => (
        <div
          key={product.id || i}
          className="absolute top-1/2 left-1/2 transition-transform duration-300 ease-in-out"
          style={{
            transformOrigin: 'center bottom',
            transform: `translate(calc(${offsetsX[i]}%), calc(-50% + ${offsetsY[i]}%)) rotate(${rotations[i]}deg)`,
            zIndex: 10 - Math.abs(i - centerIndex),
            width: '75%',
            maxWidth: 360,
            aspectRatio: '2 / 1',
            marginLeft: '-37.5%',
          }}
        >
          <Image
            src={typeof product.image === 'object' ? product.image.url : product.image}
            alt={product.name || 'Product'}
            fill
            className="object-contain"
            draggable={false}
            priority={i === centerIndex}
            sizes="(max-width: 768px) 80vw, 360px"
          />
        </div>
      ))}
    </Link>
  )
}
