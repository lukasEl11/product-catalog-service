import { Request, Response } from 'express';
import mongoose from 'mongoose';
import logger from 'jet-logger';
import { reviewService } from '../services/reviewService';
import { productService } from '../services/productService';

class ReviewController {
  public submitReview = async (req: Request, res: Response): Promise<void> => {
    const { productId, firstName, lastName, reviewText, rating } = req.body;

    if (!productId || !firstName || !lastName || !reviewText || !rating) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    if (rating < 1 || rating > 5) {
      res.status(400).json({ message: 'Rating must be between 1 and 5' });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Product not found' });
      return;
    }

    const product = await productService.getProductById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    try {
      const review = await reviewService.createReview({
        productId,
        firstName,
        lastName,
        reviewText,
        rating,
      });
      res.status(201).json(review);
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public editReview = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { firstName, lastName, reviewText, rating } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Review not found' });
      return;
    }

    if (rating < 1 || rating > 5) {
      res.status(400).json({ message: 'Rating must be between 1 and 5' });
      return;
    }

    try {
      const updatedReview = await reviewService.updateReview(id, {
        firstName,
        lastName,
        reviewText,
        rating,
      });
      if (!updatedReview) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }
      res.status(200).json(updatedReview);
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public deleteReview = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Review not found' });
      return;
    }

    try {
      const success = await reviewService.deleteReview(id);
      if (!success) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public getReviewsForProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Invalid product id' });
      return;
    }

    try {
      const products = await reviewService.getReviewsForProduct(productId);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
}

export const reviewController = new ReviewController();
