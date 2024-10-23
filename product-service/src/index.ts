import './express/pre-start'; // Must be the first import

import express from 'express';
import logger from 'jet-logger';
import env from './express/env-vars';
import ProductsRouter from './routes/productRoutes';
import connectDB from './config/db';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Route handler
app.use('/api', ProductsRouter);

// Start the server
app.listen(env.Port, () => {
  logger.info(`Server is running on http://localhost:${env.Port}`);
});
