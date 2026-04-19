import path from 'path';
import fs from 'fs';
import { Payload } from 'payload';

export const seedMedia = async (payload: Payload) => {
    const mediaDir = path.resolve(process.cwd(), 'src/seed/media');

    if (!fs.existsSync(mediaDir)) {
        payload.logger.error(`Media directory not found: ${mediaDir}`);
        return;
    }

    const files = fs.readdirSync(mediaDir);

    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext);
    });

    payload.logger.info(`Found ${imageFiles.length} images to seed.`);

    for (const fileName of imageFiles) {
        const altText = fileName.split('.')[0];
        const existing = await payload.find({
            collection: 'media',
            where: { alt: { equals: altText } },
        });

        if (existing.docs.length > 0) {
            continue;
        }

        const filePath = path.join(mediaDir, fileName);

        try {
            await payload.create({
                collection: 'media',
                data: {
                    alt: fileName.split('.')[0],
                },
                filePath: filePath,
            });
            payload.logger.info(`✔ Uploaded: ${fileName}`);
        } catch (error: any) {
            const message = error instanceof Error ? error.message : "Unknown error";
            payload.logger.error(`✘ Failed ${fileName}: ${message}`);
        }
    }
};