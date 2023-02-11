/* eslint-disable */
const sc = require('./getCatalogue');
const apps = require('./app-list/app-list');
const { readPkgJson } = require('../deploy-utils/deployHelpers');

const fs = require('fs');
const envPath = require('path');
const path = `${__dirname}/data`;
require('dotenv').config({ path: envPath.resolve(__dirname, '.env') });

const getAppidFromCatalogue = (jsonFile, appIdList, checkVersion, url) => {
  const catalogues = [];
  jsonFile.forEach((arrayItem) => {
    const packages = arrayItem.packages;
    const item = [];

    packages.forEach((packageItem) => {
      const widgetId = `${packageItem.widget.id.substring(0, packageItem.widget.id.indexOf('$'))}`;
      const catalogueData = {
        entitlements: packageItem.entitlements,
        widgetId,
        version: packageItem.widget.version,
        configVersion: packageItem.widget.configVersion,
        name: packageItem.widget.name,
        location: arrayItem.locations.map((location) => `${url}${location}/softwarecatalogue.xml`),
      };

      if (appIdList.includes(widgetId)) {
        if (checkVersion) {
          if (packageItem.widget.version === appIdList[1]) {
            item.push(catalogueData);
          }
        } else {
          item.push(catalogueData);
        }
      }
    });

    if (item.length > 0) {
      const json = { [`${arrayItem.name}-${arrayItem.version}`]: item };

      catalogues.push(json);
    }
  });
  return JSON.stringify(catalogues, null, 2);
};



const getLocationUrl = (environment, territory) => {
  const locations = { STAGE: `stage.${territory.toLowerCase()}`, PROD: `${territory.toLowerCase()}`, INT: `integration.${territory.toLowerCase()}`, }
  return `http://content.${locations[environment]}.services.skyq.sky.com/softcat/`;
};

const generateJsonOfAppIdInCatalogue = async (loginDetails, appIdList, checkVersion) => {
  console.log('Downloading catalogue from softcat...');
  await sc.getSoftcatCatalogue(loginDetails);

  const files = fs.readdirSync(path);

  files.forEach((file) => {
    if (file.lastIndexOf('catalogue', 0) === 0) {
      console.log(`reading ${file}`);
      const json = JSON.parse(fs.readFileSync(`${path}/${file}`));
      console.log(
        `2] Extracted file has been generated at the following path: ${path}/converted-${file}`,
      );

      console.log('Generating json with catalogues of appIds provided...');

      fs.writeFileSync(
        `${path}/converted-${file}`,
        getAppidFromCatalogue(
          json,
          appIdList,
          checkVersion,
          getLocationUrl(loginDetails.environment, loginDetails.territory),
        ),
      );
    }
  });
};

const allApps = ['test.test.com'];

exports.filterCatalogueByAppId = async (opts) => {
  console.log(process.env.USERNAME);

  const loginDetails = {
    username: process.env.USERNAME || '',
    password: Buffer.from(process.env.PASSWORD, 'base64').toString() || '',
    authToken: process.env.AUTHTOKEN || '',
    token: null,
    environment: opts.environment || process.env.ENVIRONMENT,
    territory: opts.territory || process.env.TERRITORY,
  };

  const { name, version } = readPkgJson();
  const appName = opts.app || name;
  const appVersion = opts.appversion || version;

  // checks
  if (!appName) throw new Error('No app name defined');
  if (!loginDetails.username)
    throw new Error('No username defined. Please set your USERNAME in .env in root');
  if (!loginDetails.password)
    throw new Error('No password defined. Please set your PASSWORD in .env in root');
  if (!loginDetails.authToken)
    throw new Error('No auth token defined. Please set AUTHTOKEN in .env in root');
  if (!loginDetails.environment)
    throw new Error('No environment defined. Please set ENVIRONMENT in .env in root');
  if (!loginDetails.territory)
    throw new Error('No territory defined. Please set TERRITORY in .env in root');

  console.log(`Environment: ${loginDetails.environment} | Territory: ${loginDetails.territory}`);

  if (appName && appVersion) {
    await generateJsonOfAppIdInCatalogue(loginDetails, [`${appName}`, `${appVersion}`], true);
    console.log(`Generating for ${appName} ${appVersion} app...`);
    return;
  }

  if (appName) {
    await generateJsonOfAppIdInCatalogue(loginDetails, [`${appName}`], false);
    console.log(`Generating ${appName}, including all versions...`);
    return;
  }

  console.log('All done...');
};
