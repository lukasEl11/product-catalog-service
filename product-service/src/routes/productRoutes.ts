import express, { Router} from 'express';
import { productController } from '../controllers/ProductController';

const ProductsRouter = Router();
ProductsRouter.use(express.json());

// Product CRUD routes
ProductsRouter.post('/products', productController.createProduct);
ProductsRouter.put('/products/:id', productController.editProduct);
ProductsRouter.delete('/products/:id', productController.deleteProduct);
ProductsRouter.get('/products', productController.listProducts);
ProductsRouter.get('/products/:id', productController.getProductById);

export default ProductsRouter;
