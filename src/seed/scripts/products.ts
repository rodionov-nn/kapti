import { Payload } from "payload";
import { seedMedia } from "./media";


export const seedProducts = async (payload: Payload) => {
    const products = [
        {
            name: 'Козинаки подсолнечные',
            image: 'kozinaki.jpg',
            categorySlug: 'kozinaki',
            // ... остальные поля
        }
    ];

    for (const item of products) {
        // Проверка на дубликат по slug (который генерируется из name)
        const slug = item.name.toLowerCase().replace(/\s+/g, '-'); // или ваша логика slugify

        const existing = await payload.find({
            collection: 'products',
            where: { slug: { equals: slug } },
        });

        if (existing.totalDocs > 0) {
            payload.logger.info(`Product ${item.name} already exists. Skipping.`);
            continue;
        }

        const imageId = await seedMedia(payload, item.image);

        // Дальше создание продукта через payload.create...
    }
}