#! /usr/bin/env node
/* eslint-disable no-undef */
/* eslint @typescript-eslint/no-var-requires: "off" */
const dotenv = require('dotenv');
const { Command } = require('commander');
require('colors').enable();

const { filterCatalogueByAppId } = require('./data-extract-api-tool/generateJsonOfAppIdInCatalogues');

// initialise environment
dotenv.config();

const VERSION = '1.0.0';

const program = new Command();
program
  .version(VERSION)
  .usage('<command> [options]')
  .description(
    'Provides a utility for identifying which catalogues contains a specific app or app & app version and gives catalogue url for the apps. Supports these territories GB, DE, IT and these environments...\
    \n- `PROD` for Prod softcat\n- `STAGE` for stage softcat and \n- `INT` for integration softcat.\
    \n\nThe environments variables with your softcat username and password as base64 encoded are required to use this. Softcat authentication token is also required to use this.\
    \n For a base64 encoded password use the encode-base64 command',
  );

program
  .command('get-app-catalogue')
  .description(
    'Gets the catalogues with the app-id passed. When run inside an app folder, some options are taken from the package.json.\
    \n\nExample: ./softcat.js get-app-catalogue PROD GB --app "com.sky.app" --version "1.0.0"',
  )
  .option('--environment <environment>', 'Set the environment e.g. PROD, STAGE, INT')
  .option('--territory <territory>', 'Set the territory e.g. GB, DE, IT')
  .option(
    '--app <app>',
    'Set this to all if you want to check all the tv-apps app under our team. luna gives all our Luna apps and lightning gives all our Lightning apps. Set a specific appId if you want to check a specific app.',
  )
  .option('--appversion <appversion>', 'Set a version of the app you want to check.')

  .action(async (opts) => {
    try {
      await filterCatalogueByAppId(opts);
    } catch (e) {
      console.error(`Failed: ${e.message || e}`.red);
      process.exit(1);
    }
  });

program
  .command('encode-base64 <password>')
  .description(
    "Converts your password to a base64 encoded password needed for the get-app-catalogue call.\
    \n\nExample: ./softcat.js encode-base64 'test'",
  )
  .action((password) => {
    console.log(`PASSWORD=${Buffer.from(password).toString('base64')}`);
  });

program.parse(process.argv);
