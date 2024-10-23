import { Request, Response } from 'express';

class ProductController {
  public createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    try {
      res.status(201).json('Product created');
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  public editProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
      res.status(200).json(`Product ${id} edited`);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  public deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  public listProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json(['product1', 'product2']);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getProductById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;

    try {
      res.status(200).json(`Product with id:${id}`);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
}

export const productController = new ProductController();
