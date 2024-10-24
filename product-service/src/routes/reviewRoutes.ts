import express, { Router } from 'express';
import { reviewController } from '../controllers/reviewController';

const ReviewsRouter = Router();
ReviewsRouter.use(express.json());

// Review CRUD routes
ReviewsRouter.post('/', reviewController.submitReview);
ReviewsRouter.put('/:id', reviewController.editReview);
ReviewsRouter.delete('/:id', reviewController.editReview);
ReviewsRouter.get('/:productId', reviewController.getReviewsForProduct);

export default ReviewsRouter;
