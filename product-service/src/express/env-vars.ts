/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */

export default {
  AppVersion: process.env.APP_VERSION ?? 'x.y.z',
  NodeEnv: process.env.NODE_ENV ?? '',
  Port: process.env.PORT ?? 0,
  db: {
    MONGO_URI: process.env.MONGO_URI ?? '',
  },
  rabbitmq: {
    RABBITMQ_URI: process.env.RABBITMQ_URL ?? '',
  },
  redis: {
    REDIS_URL: process.env.REDIS_URL ?? '',
  },
} as const;
