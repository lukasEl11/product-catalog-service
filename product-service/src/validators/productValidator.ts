import { check, param } from 'express-validator';
import path from 'path';
import { productService } from '../services/productService';

export const createProductValidationRules = [
  check('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2 })
    .withMessage('Product name must be at least 2 characters'),

  check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 2 })
    .withMessage('Product description must be at least 2 characters'),

  check('price')
    .notEmpty()
    .withMessage('Price is required')
    .isInt({ min: 1 })
    .withMessage('Price must be between at least 1'),
];

export const updateProductValidationRules = [
  param('id')
    .isMongoId()
    .withMessage('ID must be in a valid format')
    .custom(async (value) => {
      const product = await productService.getProductById(value);
      if (!product) {
        throw new Error('Product does not exist');
      }
    }),
  check('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Product name must be at least 2 characters'),

  check('description')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Product description must be at least 2 characters'),

  check('price')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Price must be between at least 1'),
];

export const validIdValidationRules = [
  param('id').isMongoId().withMessage('ID must be in a valid format'),
];
