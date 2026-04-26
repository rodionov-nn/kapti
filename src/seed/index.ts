import { Payload } from "payload";
import { seedAdmin } from "./scripts/admin";
import { seedCategories } from "./scripts/categories";
import { seedMedia } from "./scripts/media";
import { seedProducts } from "./scripts/products";
import { seedGlobals } from "./scripts/globals";
import { seedPages } from "./scripts/pages";

export const mainSeed = async (payload: Payload) => {
  try {
    payload.logger.info('---- SEEDING DATABASE ----')

    await seedAdmin(payload);

    await seedCategories(payload);

    await seedMedia(payload);

    await seedProducts(payload);

    await seedGlobals(payload);

    await seedPages(payload);

    payload.logger.info('✔ Database seeding finished!');

  } catch (err) {
    payload.logger.error(`✘ Database seeding failed: ${err}`);
  }
};