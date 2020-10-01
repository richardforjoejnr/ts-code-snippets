console.log('Hello world!')

import { createServer, start, stop} from 'apimocker';

//////////////////////////////////////////////////////////////////////////////////
// Mock api config - sets path of input files
//////////////////////////////////////////////////////////////////////////////////
const apiMockerConfigJsonPath = `${process.cwd()}/src/how-to-setup-api-mocker/apimocker/apimocker.json`;
createServer({ quiet: true }).setConfigFile(apiMockerConfigJsonPath);

start(7575);
stop();