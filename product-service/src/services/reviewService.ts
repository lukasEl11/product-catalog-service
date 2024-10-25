import { cacheWrapper } from '../cache/cache';
import Review, { IReview } from '../models/review';

class ReviewService {
  /**
   * Create review and store in DB
   *
   * @param {Partial<IReview>} data
   * @return {*}  {Promise<IReview>}
   * @memberof ReviewService
   */
  async createReview(data: Partial<IReview>): Promise<IReview> {
    const review = new Review(data);
    return await review.save();
  }

  /**
   * Get review by id
   *
   * @param {string} id
   * @return {*}  {(Promise<IReview | null>)}
   * @memberof ReviewService
   */
  async getReviewById(id: string): Promise<IReview | null> {
    return await cacheWrapper<IReview | null>(`review:${id}`, () =>
      Review.findById(id)
    );
  }

  /**
   * Update review and store in db
   *
   * @param {string} id
   * @param {Partial<IReview>} data
   * @return {*}  {(Promise<IReview | null>)}
   * @memberof ReviewService
   */
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

  /**
   * Delete review
   *
   * @param {string} id
   * @return {*}  {Promise<boolean>}
   * @memberof ReviewService
   */
  async deleteReview(id: string): Promise<boolean> {
    const result = await Review.findByIdAndDelete(id);
    return result !== null;
  }

  /**
   * Get all reviews by provided product (productId)
   *
   * @param {string} productId
   * @return {*}  {Promise<IReview[]>}
   * @memberof ReviewService
   */
  async getReviewsForProduct(productId: string): Promise<IReview[]> {
    return await cacheWrapper<IReview[]>(
      `review_list_product:${productId}`,
      () => Review.find({ productId })
    );
  }
}

export const reviewService = new ReviewService();
