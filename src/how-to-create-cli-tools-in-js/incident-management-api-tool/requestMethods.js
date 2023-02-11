/* eslint-disable */
const { raiseRequest } = require('./apiServiceRequest');

const { RAISE_CHANGE, UPDATE_CHANGE_UIR, UPDATE_CHANGE_PIR, RETRIEVE_TICKET } = require('./data/serviceDataConfigs');

const fs = require('fs');
const envPath = require('path');
const path = `${__dirname}/release`;
require('dotenv').config({ path: envPath.resolve(__dirname, '.env') });

exports.requestByStage = async (opts) => {
  console.log(opts.stage, opts.startDate ? opts.startDate : '', opts.endDate ? opts.endDate : '');
  console.log('path exists', fs.existsSync('./release/CHANGENUMBER.txt'));
  const changeNumber = fs.existsSync('./release/CHANGENUMBER.txt') ? fs.readFileSync(`./release/CHANGENUMBER.txt`).toString() : '';
  console.log(changeNumber);

  if (opts.stage === 'RETRIEVE_TICKET') {
    raiseRequest(opts.environment || 'UAT', RETRIEVE_TICKET(opts.changeNumber || changeNumber));
  }

  if (opts.stage === 'RAISE_CHANGE') {
    raiseRequest(opts.environment || 'UAT', RAISE_CHANGE(opts.justification, opts.startDate, opts.endDate));

  }

  if (opts.stage === 'UPDATE_TO_UNDER_IMPLIMENTATION') {
    console.log(opts.changeNumber || changeNumber)
    raiseRequest(opts.environment || 'UAT', UPDATE_CHANGE_UIR(opts.changeNumber || changeNumber));

  }

  if (opts.stage === 'UPDATE_TO_POST_IMPLIMENTATION') {
    console.log(opts.changeNumber || changeNumber, opts.implementationCode, opts.startDate, opts.endDate)
    raiseRequest(opts.environment || 'UAT', UPDATE_CHANGE_PIR(opts.changeNumber || changeNumber, opts.implementationCode, opts.startDate, opts.endDate));
  }

  console.log('All done...');
};
