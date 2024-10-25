import './setup/pre-start'; // Must be the first import

import connectDB from './config/db';
import { messageService } from './services/messageService';

// Connect to MongoDB
connectDB();

// Connect to RabbitMQ and wait for reviews
messageService.consumeReviewMessages();
