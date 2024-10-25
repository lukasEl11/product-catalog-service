import { connectRabbitMQ } from '../config/rabbitmq';

import logger from 'jet-logger';
import { IReview } from '../models/review';
import { reviewService } from './reviewService';

class MessageService {
  /**
   *  Connect to rabbitMQ 'reviewQueue' queue and waitng for messages.
   *  After recieve message process it and send message to  'averageRatingQueue' queue
   *
   *  @returns Promise<void>
   */
  async consumeReviewMessages(): Promise<void> {
    try {
      const channel = await connectRabbitMQ();
      const reviewQueue = 'reviewQueue';
      const ratingQueue = 'averageRatingQueue';

      await channel.assertQueue(reviewQueue, { durable: true });
      await channel.assertQueue(ratingQueue, { durable: true });
      logger.info(`Waiting for messages in ${reviewQueue}`);

      channel.consume(reviewQueue, async (msg) => {
        if (msg) {
          const reviewMessage = JSON.parse(msg.content.toString()) as IReview;
          // Process review and return recalculated product's rating
          const result = await reviewService.processReview(reviewMessage);
          const message = JSON.stringify(result);
          // Send the recalculated rating to the Product Service
          channel.sendToQueue(ratingQueue, Buffer.from(message), {
            persistent: true,
          });

          logger.info(
            `Sent recalculated average rating to ${ratingQueue}: ${message}`
          );
          channel.ack(msg);
        }
      });
    } catch (err) {
      logger.err(err, true);
    }
  }
}

export const messageService = new MessageService();
