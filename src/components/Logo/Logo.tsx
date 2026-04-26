import React from 'react'
import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

interface Props {
  className?: string
  logoData?: MediaType | string | null
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className, loading: loadingFromProps, logoData, priority: priorityFromProps } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  if (typeof logoData === 'object' && logoData?.url) {
    return (
      <Media
        htmlElement={null}
        resource={logoData}
        loading={loading}
        priority={priority === 'high'}
        pictureClassName="flex"
        imgClassName={cn('max-h-[50px] w-auto object-contain select-none', className)}
      />
    )
  }

  return <span className={cn('text-xl font-semibold leading-none', className)}>Kapti</span>
}
