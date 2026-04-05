import { seedAdmin } from "./scripts/admin";
import { seedCategories } from "./scripts/categories";
import { seedMedia } from "./scripts/media";

export const mainSeed = async (payload: any) => {
  try {
    // Всегда первым делом — админ
    await seedAdmin(payload);

    await seedCategories(payload);

    /* // Затем контент (можно обернуть в условие окружения)
    if (process.env.NODE_ENV !== 'production') {
      await seedContent(payload);
    } */

  } catch (err) {
    payload.logger.error(err);
  }
};