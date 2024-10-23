import './express/pre-start'; // Must be the first import

import express, { Request, Response } from 'express';
import env from './express/env-vars';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Simple route handler
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Start the server
app.listen(env.Port, () => {
  console.log(`Server is running on http://localhost:${env.Port}`);
});
