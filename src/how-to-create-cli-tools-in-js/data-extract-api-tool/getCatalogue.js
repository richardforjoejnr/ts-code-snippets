const fs = require('fs');

const axios = require('axios');
const qs = require('qs');

const ENVIRONMENTS = {
  PROD: '',
  STAGE: '.stage',
  INT: '.integration',
};

const TERRITORY = {
  GB: 'gb',
  DE: 'de',
  IT: 'it',
};

const _getEnvironment = (environment, territory) => {
  if (ENVIRONMENTS.hasOwnProperty(environment) && TERRITORY.hasOwnProperty(territory)) {
    return `secure-softcat${ENVIRONMENTS[environment]}.${TERRITORY[territory]}.services.skyq.sky.com`;
  }
  throw new Error(
    `${environment} ${territory} is not valid as environment: PROD, STAGE, INT | territory: GB, DE, IT`,
  );
};

const loginData = (data) => {
  return qs.stringify({
    username: data.username,
    password: data.password,
    grant_type: 'password',
    scope: 'read write',
  });
};

const oauthToken = (data) => {
  const urlHost = _getEnvironment(data.environment, data.territory);
  return {
    method: 'post',
    url: `https://${urlHost}/api/oauth/token`,
    headers: {
      Authorization: `Basic ${data.authToken}`,
      'X-HTTP-Method-Override': 'POST',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data: loginData(data),
  };
};

const catalogueConfig = (token, data) => {
  const urlHost = _getEnvironment(data.environment, data.territory);
  if (token) {
    return {
      method: 'post',
      url: `https://${urlHost}/api/catalogues/`,
      headers: {
        Authorization: `Bearer ${token}`,
        'X-HTTP-Method-Override': 'GET',
        'Content-Type': 'application/json',
      },
      data: ' ',
    };
  }
  throw new Error(`A valid token is required`);
};

exports.getSoftcatCatalogue = async (loginDetails) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  let authResponse = '';
  const dir = `${__dirname}/data`;

  !fs.existsSync(dir) ? fs.mkdirSync(dir) : null;

  loginDetails.username && loginDetails.password
    ? (authResponse = await axios(oauthToken(loginDetails)))
    : '';
  const getCatalogueResponse = await axios(
    catalogueConfig(loginDetails.token || authResponse.data.access_token, loginDetails),
  );

  const formatYmd = (date) => date.toISOString().slice(0, 10);

  console.log(
    `1] Softcat catalogue file has been generated at the following path: ${dir}/catalogue-prod-${formatYmd(
      new Date(),
    )}.json`,
  );

  return fs.writeFileSync(
    `${dir}/catalogue-${loginDetails.environment}-${loginDetails.territory}-${formatYmd(
      new Date(),
    )}.json`,
    JSON.stringify(getCatalogueResponse.data),
  );
};
