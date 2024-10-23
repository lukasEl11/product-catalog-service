import './express/pre-start'; // Must be the first import

import express from 'express';
import env from './express/env-vars';
import ProductsRouter from './routes/productRoutes';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route handler
app.use('/api', ProductsRouter);

// Start the server
app.listen(env.Port, () => {
  console.log(`Server is running on http://localhost:${env.Port}`);
});
