import mongoose from 'mongoose';
import env from '../setup/env-vars';
import logger from 'jet-logger';

const connectDB = async () => {
  try {
    await mongoose.connect(env.db.MONGO_URI as string);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.err(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
