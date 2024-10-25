import './express/pre-start'; // Must be the first import

import express from 'express';
import logger from 'jet-logger';
import env from './express/env-vars';
import ProductsRouter from './routes/productRoutes';
import ReviewsRouter from './routes/reviewRoutes';
import connectDB from './config/db';
import { messageService } from './services/messageService';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Connect to RabbitMQ and wait for average products rating
messageService.consumeAverageRatingMessages();

// Route handler
app.use('/api/products', ProductsRouter);
app.use('/api/reviews', ReviewsRouter);

// Start the server
app.listen(env.Port, () => {
  logger.info(`Server is running on http://localhost:${env.Port}`);
});
