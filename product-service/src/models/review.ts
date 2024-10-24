import mongoose, { Document, Schema } from 'mongoose';
import { invalideCache } from '../cache/cache';

export interface IReview extends Document {
  productId: string;
  firstName: string;
  lastName: string;
  reviewText: string;
  rating: number;
  timestamp: Date;
}

const reviewSchema: Schema = new Schema({
  productId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  timestamp: { type: Date, default: Date.now },
});

reviewSchema.post('save', (review: IReview, next) => {
  invalideCache(`review:${review.id}`);
  invalideCache(`review_list_product:${review.productId}`);
  next();
});

reviewSchema.post('findOneAndDelete', (review: IReview, next) => {
  invalideCache(`review:${review.id}`);
  invalideCache(`review_list_product:${review.productId}`);
  next();
});

const Review = mongoose.model<IReview>('Review', reviewSchema);
export default Review;
