import logger from 'jet-logger';
import env from './setup/env-vars';

const main = () => {
  logger.info(`Running: ${env.AppVersion}`);
};

main();
