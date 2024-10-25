import { createClient } from 'redis';
import env from '../express/env-vars';
import logger from 'jet-logger';

const redisClient = createClient({ url: env.redis.REDIS_URL });

redisClient.on('error', (err) => {
  logger.err('Redis error:', err);
});

redisClient.on('connect', () => {
  logger.info('Redis connected');
});

redisClient.connect(); // For Redis v4 and above, make sure to use async `connect`.

export default redisClient;
