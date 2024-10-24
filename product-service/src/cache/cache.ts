import redisClient from '../config/redis';
import logger from 'jet-logger';

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

  // Set fresh data
  await redisClient.setEx(keyPrefix, ttl, JSON.stringify(freshData));
  return freshData;
};

const invalideCache = async (keyPrefix: string) => {
  await redisClient.del(keyPrefix);
  logger.info(`[Invalide] for ${keyPrefix}`);
};

export { cacheWrapper, invalideCache };
