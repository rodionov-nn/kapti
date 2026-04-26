import { Payload } from "payload";
import categoriesData from "../data/categories.json";

export const seedCategories = async (payload: Payload): Promise<void> => {
    payload.logger.info("Syncing categories...");

    for (const category of categoriesData) {
        const { totalDocs, docs } = await payload.find({
            collection: "categories",
            where: {
                name: { equals: category.name },
            },
        });

        if (totalDocs === 0) {
            try {
                await payload.create({
                    collection: "categories",
                    data: {
                        name: category.name,
                        description: category.description,
                    },
                } as any);
                payload.logger.info(`✔ Created category: ${category.name}`);
            } catch (error) {
                const message = error instanceof Error ? error.message : "Unknown error";
                payload.logger.error(`✘ Failed to create ${category.name}: ${message}`);
            }
        } else {
            // Update existing category with description
            const existingCat = docs[0];
            if (existingCat.description !== category.description) {
                try {
                    await payload.update({
                        collection: "categories",
                        id: existingCat.id,
                        data: {
                            description: category.description,
                        },
                    } as any);
                    payload.logger.info(`✔ Updated category: ${category.name} with description`);
                } catch (error) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    payload.logger.error(`✘ Failed to update ${category.name}: ${message}`);
                }
            }
        }
    }
};