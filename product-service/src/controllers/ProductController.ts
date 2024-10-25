import { Request, Response } from 'express';
import logger from 'jet-logger';

import { productService } from '../services/productService';
import ProductDto from '../models/productDto';

class ProductController {
  /**
   * Create product Endpoit
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  public createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, price } = req.body;

    try {
      const product = await productService.createProduct({
        name,
        description,
        price,
      });
      res.status(201).json(new ProductDto(product));
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  /**
   * Edit product endpoint
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  public editProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
      const updatedProduct = await productService.updateProduct(id, {
        name,
        description,
        price,
      });
      if (!updatedProduct) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(new ProductDto(updatedProduct));
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  /**
   * Delete product endpoint
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  public deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const success = await productService.deleteProduct(id);
      if (!success) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  /**
   * Get all products endpoint
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  public listProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products.map((product) => new ProductDto(product)));
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  /**
   * Get product by ID endpoint
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  public getProductById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;

    try {
      const product = await productService.getProductById(id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
}

export const productController = new ProductController();
