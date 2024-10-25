import amqp from 'amqplib';
import env from '../setup/env-vars';
import logger from 'jet-logger';

export async function connectRabbitMQ(retries = 10, interval = 1000) {
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
