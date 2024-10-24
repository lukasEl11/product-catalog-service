import { check, param } from 'express-validator';
import { productService } from '../services/productService';
import { reviewService } from '../services/reviewService';

export const submitReviewValidationRules = [
  check('productId')
    .isMongoId()
    .withMessage('productId must be in a valid format')
    .custom(async (value) => {
      const product = await productService.getProductById(value);
      if (!product) {
        throw new Error('Product does not exist');
      }
    }),
  check('firstName')
    .notEmpty()
    .withMessage('firstName is required')
    .isLength({ min: 2 })
    .withMessage('firstName must be at least 2 characters'),

  check('lastName')
    .notEmpty()
    .withMessage('lastName is required')
    .isLength({ min: 2 })
    .withMessage('lastName must be at least 2 characters'),

  check('reviewText')
    .notEmpty()
    .withMessage('reviewText is required')
    .isLength({ min: 2 })
    .withMessage('reviewText must be at least 2 characters'),

  check('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Price must be between 1 and 5'),
];

export const updateReviewValidationRules = [
  param('id')
    .isMongoId()
    .withMessage('ID must be in a valid format')
    .custom(async (value) => {
      const review = await reviewService.getReviewById(value);
      if (!review) {
        throw new Error('Review does not exist');
      }
    }),
  check('firstName')
    .optional()
    .isLength({ min: 2 })
    .withMessage('firstName must be at least 2 characters'),
  check('lastName')
    .optional()
    .isLength({ min: 2 })
    .withMessage('lastName must be at least 2 characters'),
  check('reviewText')
    .optional()
    .isLength({ min: 2 })
    .withMessage('reviewText must be at least 2 characters'),
  check('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Price must be between 1 and 5'),
];

export const validProductIdValidationRules = [
  param('productId').isMongoId().withMessage('ID must be in a valid format'),
];
