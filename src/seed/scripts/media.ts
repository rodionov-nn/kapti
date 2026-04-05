import path from 'path';
import fs from 'fs';
import { Payload } from 'payload';
import mime from 'mime-types';

export const seedMedia = async (payload: Payload, fileName: string) => {
    const { docs } = await payload.find({
        collection: 'media',
        where: {
            filename: { equals: fileName }
        },
    });

    if (docs.length > 0) return docs[0].id;

    const filePath = path.resolve(process.cwd(), 'src/seed/media', fileName);

    if (!fs.existsSync(filePath)) {
        payload.logger.error(`File not found: ${filePath}`);
        return null;
    }

    const fileBuffer = fs.readFileSync(filePath);
    const contentType = mime.lookup(filePath) || 'application/octet-stream';

    payload.logger.info(`Uploading media: ${fileName} (${contentType})...`);

    try {
        const media = await payload.create({
            collection: 'media',
            data: {
                alt: fileName.split('.')[0],
            },
            file: {
                data: fileBuffer,
                name: fileName,
                mimetype: contentType,
                size: fileBuffer.length,
            },
        });

        return media.id;
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        payload.logger.error(`Failed to seed media ${fileName}: ${message}`);
        return null;
    }
};