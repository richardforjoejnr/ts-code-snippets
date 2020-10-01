"use strict";
console.log('Hello world!');
var apiMocker = require('apimocker');
//////////////////////////////////////////////////////////////////////////////////
// Mock api config - sets path of input files
//////////////////////////////////////////////////////////////////////////////////
var apiMockerConfigJsonPath = process.cwd() + "/src/how-to-setup-api-mocker/apimocker/apimocker.json";
var mocker = apiMocker.createServer({ quiet: true }).setConfigFile(apiMockerConfigJsonPath);
mocker.start(null);
mocker.stop();
