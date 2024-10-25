import redisClient from '../config/redis';
import logger from 'jet-logger';

/**
 * Cache data in redis(if is available)
 *
 * @template T
 * @param {string} keyPrefix
 * @param {() => Promise<T>} queryFn
 * @param {number} [ttl=3600]
 * @return {*}  {Promise<T>}
 */
const cacheWrapper = async <T>(
  keyPrefix: string,
  queryFn: () => Promise<T>,
  ttl = 3600
): Promise<T> => {
  if (!redisClient.isReady) {
    return await queryFn();
  }

  const cachedData = await redisClient.get(keyPrefix);
  if (cachedData) {
    // Get cached data
    logger.info(`[Cache] for ${keyPrefix}`);
    return JSON.parse(cachedData);
  }

  // Get fresh data
  const freshData = await queryFn();

  if (freshData) {
    // Set fresh data
    await redisClient.setEx(keyPrefix, ttl, JSON.stringify(freshData));
  }

  return freshData;
};

/**
 * Invalide cache
 *
 * @param {string} keyPrefix
 */
const invalideCache = async (keyPrefix: string) => {
  await redisClient.del(keyPrefix);
  logger.info(`[Invalide] for ${keyPrefix}`);
};

export { cacheWrapper, invalideCache };
