/* eslint-disable no-prototype-builtins */

/* eslint-disable no-undef */
/* eslint @typescript-eslint/no-var-requires: "off" */
const axios = require('axios');
const qs = require('qs');
const fs = require('fs');

const ENVIRONMENTS = {
  PROD: '',
  UAT: '',
};

const SERVICE = {
  RETRIEVE_TICKET: { id: '3800', method: 'get' },
  RAISE_CHANGE_TICKET: { id: '3401', method: 'post' },
  UPDATE_CHANGE_TICKET: { id: '3402', method: 'post' },
};

const _getEnvironment = (environment, service) => {
  if (ENVIRONMENTS.hasOwnProperty(environment) && SERVICE.hasOwnProperty(service)) {
    return {
      url: `${ENVIRONMENTS[environment]}/service${SERVICE[service].id}/request`,
      method: SERVICE[service].method,
    };
  }
  throw new Error(
    `${environment} ${service} is not valid as environment: PROD, UAT | service: RETRIEVE_TICKET, RAISE_CHANGE, UPDATE_CHANGE`,
  );
};

const config = (environment, data) => {
  return {
    method: _getEnvironment(environment, data.service).method,
    url: _getEnvironment(environment, data.service).url,
    params: data.params,
    headers: {
      'Ocp-Apim-Subscription-Key':
        environment === 'PROD' ? process.env.spark_api_key_prod : process.env.spark_api_key_uat,
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(data.body),
  };
};

exports.raiseRequest = async (environment = 'UAT', serviceDataConfig) => {
  console.log(serviceDataConfig);
  let changeNumber = '';
  let status = '';

  const getResponse = await axios(config(environment, serviceDataConfig));
  console.log(getResponse.data);

  if (getResponse.data.result.hasOwnProperty('details')) {
    const str = getResponse.data.result.details;
    changeNumber = str.split(' ')[0];
    status = str.split(' ')[1];
    console.log(changeNumber, status);

    if (status === '(RAISED)') {
      fs.mkdirSync('./release', { recursive: true });

      fs.writeFileSync(`./release/CHANGENUMBER.txt`, changeNumber);
    }
  }
  if (getResponse.data.result.hasOwnProperty('error_details')) {
    console.log(getResponse.data.result.error_details);
  }
  return { changeNumber, status };
};
