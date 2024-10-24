import express, { Router} from 'express';
import { productController } from '../controllers/productController';

const ProductsRouter = Router();
ProductsRouter.use(express.json());

// Product CRUD routes
ProductsRouter.post('/', productController.createProduct);
ProductsRouter.put('/:id', productController.editProduct);
ProductsRouter.delete('/:id', productController.deleteProduct);
ProductsRouter.get('/', productController.listProducts);
ProductsRouter.get('/:id', productController.getProductById);

export default ProductsRouter;
