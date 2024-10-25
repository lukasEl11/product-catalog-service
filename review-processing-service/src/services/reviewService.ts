import Review, { IReview, ReviewProcessingResponse } from '../models/review';

class ReviewService {
  /**
   * Process review and recalculate average rating for product
   *
   * @param review
   * @returns Promise<ReviewProcessingResponse>
   */
  async processReview(review: IReview): Promise<ReviewProcessingResponse> {
    const reviews = await Review.find({ productId: review.productId });
    const averageRating = await this.calculateAverage(reviews);
    return { productId: review.productId, averageRating };
  }

  private async calculateAverage(reviews: IReview[]) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length ? Math.round(totalRating / reviews.length) : 0;
  }
}

export const reviewService = new ReviewService();
