import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

type Props = {
  title?: string // Новое поле
  alignment: 'contentLeft' | 'mediaLeft'
  richText: any
  media: any
}

export const MediaContentBlock: React.FC<Props> = ({ title, alignment, richText, media }) => {
  const isMediaLeft = alignment === 'mediaLeft'

  return (
    <section className="container py-12">
      {/* 1. ВЕРХНИЙ ЗАГОЛОВОК */}
      {title && <h2 className="text-center text-4xl md:text-5xl font-bold mb-10">{title}</h2>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 2. БЛОК С ТЕКСТОМ */}
        <div
          className={`
          ${isMediaLeft ? 'lg:order-2' : 'lg:order-1'}
          prose prose-slate max-w-none
          [&_p]:leading-relaxed [&_p]:text-foreground-2 sm:[&_p]:text-left md:[&_p]:text-justify
          [&_h3]:text-5xl [&_h3]:font-black [&_h3]:mb-4
          [&_code]:font-bold [&_code]:text-4xl md:[&_code]:text-6xl [&_code]:font-sans [&_code]:text-foreground [&_code]:bg-transparent [&_code]:p-0
          [&_code::before]:content-none [&_code::after]:content-none
        `}
        >
          <RichText data={richText} />
        </div>

        {/* 3. БЛОК С ФОТО */}
        <div
          className={`overflow-hidden rounded-[2rem] shadow-xl shadow-black/5 ${
            isMediaLeft ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {media && typeof media !== 'string' && (
            <Image
              src={media.url}
              alt={media.alt || 'Изображение секции'}
              width={media.width || 1200}
              height={media.height || 800}
              className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
            />
          )}
        </div>
      </div>
    </section>
  )
}
