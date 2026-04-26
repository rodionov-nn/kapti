import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CategoryLink } from './CategoryLink'
import { CMSLink } from '@/components/Link'

export default async function CategoriesSelectionBlock({ title, selectedCategories, links }: any) {
  const payload = await getPayload({ config: configPromise })

  // Получаем продукты для всех выбранных категорий за один раз
  const categoryIds = selectedCategories.map((cat: any) => (typeof cat === 'object' ? cat.id : cat))

  const productsRes = await payload.find({
    collection: 'products',
    where: {
      category: { in: categoryIds },
    },
    limit: 100, // Берем с запасом, фильтровать будем внутри
    depth: 1,
  })

  const allProducts = productsRes.docs

  return (
    <section className="container flex flex-col items-center justify-center gap-8 lg:gap-16 text-center py-16">
      <h1 id="products" className="scroll-mt-24">
        {title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        {selectedCategories.map((category: any) => {
          // Если relationship вернул объект (depth > 0)
          const cat = typeof category === 'object' ? category : null
          if (!cat) return null

          // Фильтруем продукты конкретно для этой категории
          const categoryProducts = allProducts
            .filter(
              (p: any) => (typeof p.category === 'object' ? p.category.id : p.category) === cat.id,
            )
            .slice(0, 5) // Ограничение для веера

          return (
            <div key={cat.id} className="flex flex-col items-center gap-4 w-full">
              <h2 id={cat.slug} className="scroll-mt-24">
                {cat.name}
              </h2>
              {/* Если добавите описание в модель категорий: */}
              {cat.description && <p>{cat.description}</p>}

              <div className="w-9/10 flex flex-col items-center justify-center">
                <CategoryLink slug={cat.slug} products={categoryProducts} />
              </div>
            </div>
          )
        })}
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
