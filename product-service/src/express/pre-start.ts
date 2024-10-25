/**
 * Pre-start is where we want to place things that must run BEFORE the express
 * server is started. This is useful for environment variables, command-line
 * arguments, and cron-jobs.
 */

// NOTE: DO NOT IMPORT ANY SOURCE CODE HERE
import dotenv from 'dotenv';
import path from 'path';
import { parse } from 'ts-command-line-args';

// **** Types **** //

interface IArgs {
  env: string;
}

// **** Setup **** //

// Command line arguments
const args = parse<IArgs>({
  env: {
    type: String,
    defaultValue: 'development',
    alias: 'e',
  },
});

// Set the env file
const envFolderLocation = args.env === 'production' ? '.' : '../../env';
const result2 = dotenv.config({
  path: path.join(__dirname, `${envFolderLocation}/${args.env}.env`),
});
if (result2.error) {
  throw result2.error;
}
