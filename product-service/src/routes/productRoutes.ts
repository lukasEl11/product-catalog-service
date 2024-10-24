import express, { Router} from 'express';
import { productController } from '../controllers/productController';
import { createProductValidationRules, updateProductValidationRules } from '../validators/productValidator';
import { handleValidationErrors } from '../middleware/validationMiddleware';
import { validIdValidationRules } from '../validators/sharedValidator';

const ProductsRouter = Router();
ProductsRouter.use(express.json());

// Product CRUD routes
ProductsRouter.post('/', createProductValidationRules, handleValidationErrors, productController.createProduct);
ProductsRouter.put('/:id',updateProductValidationRules, handleValidationErrors,  productController.editProduct);
ProductsRouter.delete('/:id',validIdValidationRules, handleValidationErrors, productController.deleteProduct);
ProductsRouter.get('/', productController.listProducts);
ProductsRouter.get('/:id', validIdValidationRules, handleValidationErrors, productController.getProductById);

export default ProductsRouter;
