import { Request, Response } from 'express';
import mongoose from 'mongoose';
import logger from 'jet-logger';

import { productService } from '../services/productService';

class ProductController {
  public createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    try {
      const product = await productService.createProduct({
        name,
        description,
        price,
      });
      res.status(201).json(product);
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public editProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Product not found' });
      return;
    }

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
      res.status(200).json(updatedProduct);
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid id format' });
      return;
    }

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

  public listProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getProductById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Product not found' });
      return;
    }

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
