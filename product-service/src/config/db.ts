import mongoose from 'mongoose';
import env from '../express/env-vars';
import logger from 'jet-logger';

/**
 * MongoDB connection
 *
 * @return {*}  {Promise<void>}
 */
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.db.MONGO_URI as string);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.err(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
