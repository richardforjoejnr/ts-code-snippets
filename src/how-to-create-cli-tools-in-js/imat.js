#! /usr/bin/env node
/* eslint-disable no-undef */
/* eslint @typescript-eslint/no-var-requires: "off" */
const dotenv = require('dotenv');
const { Command } = require('commander');
require('colors').enable();

const { requestByStage } = require('./incident-management-api-tool/requestMethods');

// initialise environment
dotenv.config();

const VERSION = '1.0.0';

const program = new Command();
program
  .version(VERSION)
  .usage('<command> [options]')
  .description("Provides tools and utilities for ...'");

program
  .command('raise-spark-request')
  .description("Template for raising a Spark request.'")
  .option(
    '--stage <stage>',
    'Set the stage e.g. RAISE_CHANGE, UPDATE_TO_UNDER_IMPLIMENTATION, UPDATE_TO_POST_IMPLIMENTATION, RETRIEVE_TICKET',
  )
  .option(
    '--changeNumber <changeNumber>',
    'Set the status for the change which has been raised e.g. UPDATE_TO_UNDER_IMPLIMENTATION, UPDATE_TO_POST_IMPLIMENTATION',
  )
  .option(
    '--startDate <startDate>',
    'Set the start date e.g. 27/08/2022 - only needed for RAISE_CHANGE, UPDATE_TO_POST_IMPLIMENTATION',
  )
  .option(
    '--endDate <endDate>',
    'Set the end date e.g. 28/08/2022 - only needed for RAISE_CHANGE, UPDATE_TO_POST_IMPLIMENTATION',
  )
  .option(
    '--implementationCode <implementationCode>',
    'Set the implimentation code e.g. Successful | Successful with issues | Unsuccessful',
  )
  .option(
    '--justification <justification>',
    'Set the justification e.g. [Free text up to 4,000 characters]',
  )

  .action(async (opts) => {
    try {
      await requestByStage(opts);
    } catch (e) {
      console.error(`Failed: ${e.message || e}`.red);
      process.exit(1);
    }
  });

program.parse(process.argv);
