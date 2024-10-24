import { param } from 'express-validator';

export const validIdValidationRules = [
  param('id').isMongoId().withMessage('ID must be in a valid format'),
];
