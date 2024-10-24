/**
 * Build script.
 *
 * Execute by running `npm run build`.
 *
 * This script does the following:
 * 1. Remove the current build.
 * 2. Copy back-end files.
 * 3. Compile the project.
 *
 */

import childProcess from 'child_process';
import fs from 'fs-extra';
import logger from 'jet-logger';

import { version } from './package.json';

/**
 * Start
 */
(async () => {
  try {
    // Remove current build
    await remove('./dist/');
    // Copy back-end files
    await copy('./env/production.env', './dist/express/production.env');
    await exec(
      `echo "\n\nAPP_VERSION=${version}" >> ./dist/express/production.env`,
      './'
    );
    await exec('tsc --build tsconfig.prod.json', './');
  } catch (err) {
    logger.err(err);
    process.exit(1);
  }
})();

/**
 * Remove file
 */
function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, (err: any) => {
      return !!err ? rej(err) : res();
    });
  });
}

/**
 * Copy file.
 */
function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.copy(src, dest, (err: any) => {
      return !!err ? rej(err) : res();
    });
  });
}

/**
 * Do command line command.
 */
function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (!!stdout) {
        logger.info(stdout);
      }
      if (!!stderr) {
        logger.warn(stderr);
      }
      return !!err ? rej(err) : res();
    });
  });
}