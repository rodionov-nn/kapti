import { Payload } from 'payload';
import productsData from '../data/products.json';

// Функция для очистки строк типа "4,6г" в число 4.6
const parseNum = (val: string | number): number => {
    if (typeof val === 'number') return val;
    const cleaned = val.replace(/[^0-9,.]/g, '').replace(',', '.');
    return parseFloat(cleaned) || 0;
};

export const seedProducts = async (payload: Payload) => {
    payload.logger.info('Syncing products...');

    for (const item of productsData) {
        const existingProduct = await payload.find({
            collection: 'products',
            where: { name: { equals: item.name } },
        });

        if (existingProduct.docs.length > 0) continue;

        const categoryRes = await payload.find({
            collection: 'categories',
            where: { slug: { equals: item.categorySlug } },
        });

        if (categoryRes.docs.length === 0) {
            payload.logger.error(`Category not found for slug: ${item.categorySlug}`);
            continue;
        }

        const mediaRes = await payload.find({
            collection: 'media',
            where: { filename: { equals: item.imageFile } },
        });

        if (mediaRes.docs.length === 0) {
            payload.logger.error(`Image not found in media: ${item.imageFile}`);
            continue;
        }

        try {
            await payload.create({
                collection: 'products',
                data: {
                    name: item.name,
                    category: categoryRes.docs[0].id,
                    image: mediaRes.docs[0].id,
                    description: item.description,
                    weight: item.weight,
                    packCount: item.packCount,
                    ingredients: item.ingredients,
                    dietaryInfo: item.dietaryInfo || '',
                    shelfLife: item.shelfLife,
                    storageConditions: item.storageConditions,
                    nutrition: {
                        calories: parseNum(item.nutrition.calories),
                        kJ: parseNum(item.nutrition.kJ),
                        protein: parseNum(item.nutrition.protein),
                        fat: parseNum(item.nutrition.fat),
                        carbs: parseNum(item.nutrition.carbs),
                    },
                },
            });
            payload.logger.info(`✔ Product seeded: ${item.name}`);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            payload.logger.error(`✘ Failed to seed product ${item.name}: ${message}`);
        }
    }
};