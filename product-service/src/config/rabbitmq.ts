import amqp from 'amqplib';
import env from '../express/env-vars';
import logger from 'jet-logger';

export async function connectRabbitMQ() {
  const connection = await amqp.connect(env.rabbitmq.RABBITMQ_URI);
  logger.info('RabbitMQ connected');
  return connection.createChannel();
}
