/**
 * Environments variables declared here.
 */

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
} as const;
