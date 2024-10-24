import mongoose, { Document, Schema } from 'mongoose';

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

const Review = mongoose.model<IReview>('Review', reviewSchema);
export default Review;
