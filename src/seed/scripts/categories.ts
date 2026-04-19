import { Payload } from "payload";
import categoriesData from "../data/categories.json";

export const seedCategories = async (payload: Payload): Promise<void> => {
    payload.logger.info("Syncing categories...");

    for (const categoryName of categoriesData) {
        const { totalDocs } = await payload.find({
            collection: "categories",
            where: {
                name: { equals: categoryName },
            },
        });

        if (totalDocs === 0) {
            try {
                await payload.create({
                    collection: "categories",
                    data: {
                        name: categoryName,
                    },
                } as any);
                payload.logger.info(`✔ Created category: ${categoryName}`);
            } catch (error) {
                const message = error instanceof Error ? error.message : "Unknown error";
                payload.logger.error(`✘ Failed to create ${categoryName}: ${message}`);
            }
        }
    }
};