import { Request, Response } from 'express';
import logger from 'jet-logger';
import { reviewService } from '../services/reviewService';
import ReviewDto from '../models/reviewDto';

class ReviewController {
  public submitReview = async (req: Request, res: Response): Promise<void> => {
    const { productId, firstName, lastName, reviewText, rating } = req.body;

    try {
      const review = await reviewService.createReview({
        productId,
        firstName,
        lastName,
        reviewText,
        rating,
      });
      res.status(201).json(new ReviewDto(review));
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public editReview = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { firstName, lastName, reviewText, rating } = req.body;

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
      res.status(200).json(new ReviewDto(updatedReview));
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  public deleteReview = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
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

    try {
      const reviews = await reviewService.getReviewsForProduct(productId);
      res.status(200).json(reviews.map((review) => new ReviewDto(review)));
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
}

export const reviewController = new ReviewController();
