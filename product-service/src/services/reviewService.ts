import Review, { IReview } from '../models/review';

class ReviewService {
  async createReview(data: Partial<IReview>): Promise<IReview> {
    const review = new Review(data);
    return await review.save();
  }

  async getReviewById(id: string): Promise<IReview | null> {
    return await Review.findById(id);
  }

  async updateReview(
    id: string,
    data: Partial<IReview>
  ): Promise<IReview | null> {
    const review = await this.getReviewById(id);
    if (!review) return null;

    review.firstName = data.firstName || review.firstName;
    review.lastName = data.lastName || review.lastName;
    review.reviewText = data.reviewText || review.reviewText;
    review.rating = data.rating || review.rating;
    review.timestamp = new Date();

    return await review.save();
  }

  async deleteReview(id: string): Promise<boolean> {
    const result = await Review.findByIdAndDelete(id);
    return result !== null;
  }

  async getReviewsForProduct(productId: string): Promise<IReview[]> {
    return await Review.find({ productId });
  }
}

export const reviewService = new ReviewService();
