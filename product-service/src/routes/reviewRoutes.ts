import express, { Router } from 'express';
import { reviewController } from '../controllers/reviewController';
import {
  submitReviewValidationRules,
  updateReviewValidationRules,
} from '../validators/reviewValidator';
import { handleValidationErrors } from '../middleware/validationMiddleware';
import { validIdValidationRules } from '../validators/sharedValidator';

const ReviewsRouter = Router();
ReviewsRouter.use(express.json());

// Review CRUD routes
ReviewsRouter.post(
  '/',
  submitReviewValidationRules,
  handleValidationErrors,
  reviewController.submitReview
);
ReviewsRouter.put(
  '/:id',
  updateReviewValidationRules,
  handleValidationErrors,
  reviewController.editReview
);
ReviewsRouter.delete(
  '/:id',
  validIdValidationRules,
  handleValidationErrors,
  reviewController.editReview
);
ReviewsRouter.get(
  '/:productId',
  validIdValidationRules,
  handleValidationErrors,
  reviewController.getReviewsForProduct
);

export default ReviewsRouter;
