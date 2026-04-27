import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export const Breadcrumbs: React.FC<{
  items: BreadcrumbItem[]
  className?: string
}> = ({ className, items }) => {
  if (!items.length) {
    return null
  }

  return (
    <nav aria-label="Хлебные крошки" className={cn('mb-8 flex text-md font-semibold', className)}>
      <ol className="flex flex-wrap items-center gap-2 text-foreground-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li className="flex items-center gap-2" key={`${item.label}-${index}`}>
              {item.href && !isLast ? (
                <Link
                  className="transition-colors hover:underline hover:text-foreground/90"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="text-foreground">
                  {item.label}
                </span>
              )}

              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
