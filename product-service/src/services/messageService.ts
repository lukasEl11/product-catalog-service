import { connectRabbitMQ } from '../config/rabbitmq';
import { IReview, ReviewProcessingResponse } from '../models/review';
import { productService } from './productService';

import logger from 'jet-logger';

class MessageService {
  /**
   *  Connect to rabbitMQ 'averageRatingQueue' queue and waitng for messages.
   *  After recieve message process it and update avgRating for provided productId
   *
   * * @returns Promise<void>
   */
  async consumeAverageRatingMessages(): Promise<void> {
    try {
      const channel = await connectRabbitMQ();
      const queue = 'averageRatingQueue';

      await channel.assertQueue(queue, { durable: true });
      logger.info(`Waiting for messages in ${queue}`);

      channel.consume(queue, async (msg) => {
        if (msg) {
          const { productId, averageRating }: ReviewProcessingResponse =
            JSON.parse(msg.content.toString());
          logger.info(
            `Recieved ${queue}: productId ${productId}, averageRating: ${averageRating}`
          );
          // Update product average rating
          await productService.updateProductAvgRating(productId, averageRating);
          channel.ack(msg);
        }
      });
    } catch (err) {
      logger.err(err, true);
    }
  }

  /**
   * Send review to rabbitMQ 'reviewQueue' for average product rating
   *
   * @param review
   * @returns Promise<void>
   */
  async sendReviewToProcessing(review: IReview): Promise<void> {
    const channel = await connectRabbitMQ();
    const queue = 'reviewQueue';

    await channel.assertQueue(queue, { durable: true });
    const message = JSON.stringify(review);

    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    logger.info(
      `Sent message to ${queue}: reviewId:${review.id}, productId: ${review.productId}`
    );
  }
}

export const messageService = new MessageService();
