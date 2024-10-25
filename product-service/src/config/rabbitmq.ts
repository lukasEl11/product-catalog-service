import amqp from 'amqplib';
import env from '../express/env-vars';
import logger from 'jet-logger';

/**
 * Connect to rabbitMQ
 *
 * @export
 * @param {number} [retries=10]
 * @param {number} [interval=1000]
 * @return {*}  {(Promise<amqp.Channel | undefined>)}
 */
export async function connectRabbitMQ(
  retries: number = 10,
  interval: number = 1000
): Promise<amqp.Channel | undefined> {
  let attempts = 0;

  while (attempts < retries) {
    try {
      const connection = await amqp.connect(env.rabbitmq.RABBITMQ_URI);
      logger.info('RabbitMQ connected');
      return connection.createChannel();
    } catch (error) {
      attempts++;
      logger.err(
        `RabbitMQ connection failed (attempt ${attempts} of ${retries}): ${error.message}`
      );
      if (attempts === retries) {
        throw new Error(
          'Failed to connect to RabbitMQ after multiple attempts'
        );
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}
