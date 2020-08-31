console.log('Hello world!')

const apiMocker = require('apimocker')

//////////////////////////////////////////////////////////////////////////////////
// Mock api config - sets path of input files
//////////////////////////////////////////////////////////////////////////////////
const apiMockerConfigJsonPath = `${process.cwd()}/src/how-to-setup-api-mocker/apimocker/apimocker.json`;
const mocker = apiMocker.createServer({ quiet: true }).setConfigFile(apiMockerConfigJsonPath);

mocker.start(null);
mocker.stop();