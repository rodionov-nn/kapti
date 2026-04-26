'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <section className="container flex flex-col items-center justify-center gap-8">
      <div className="w-full">
        {richText && (
          <RichText
            className="[&_h1]:text-4xl [&_h1]:md:text-6xl [&_h1]:lg:text-8xl [&_h1]:mb-2 [&_p]:text-lg [&_p]:md:text-2xl"
            data={richText}
            enableGutter={false}
          />
        )}
      </div>

      <div className="overflow-hidden rounded-4xl shadow-lg/20 max-h-180 select-none w-full relative">
        {media && typeof media === 'object' && (
          <Media resource={media} priority imgClassName="object-cover w-full h-full" />
        )}
      </div>

      {Array.isArray(links) && links.length > 0 && (
        <ul className="flex flex-col md:flex-row items-center justify-center gap-4">
          {links.map(({ link }, i) => {
            return (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
