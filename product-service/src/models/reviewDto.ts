import { IReview } from './review';

class ReviewDto implements Partial<IReview> {
  id: string;
  productId: string;
  firstName: string;
  lastName: string;
  reviewText: string;
  rating: number;

  constructor(review: IReview) {
    this.id = review.id;
    this.productId = review.productId;
    this.firstName = review.firstName;
    this.lastName = review.lastName;
    this.reviewText = review.reviewText;
    this.rating = review.rating;
  }
}

export default ReviewDto;
