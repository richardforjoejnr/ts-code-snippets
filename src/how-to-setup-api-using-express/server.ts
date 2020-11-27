import express from 'express';
import * as http from 'http';
import { startPolling } from './dynamic-rest-api/apiDynamicPollingService'
import {handlePollingEndpoint} from './dynamic-rest-api/handlePollingEndpoint'
import {handleToken} from './graphql-endpoint/handleToken'
import {handleData} from './graphql-endpoint/handleData'


let server: any;
const enablePolling = false;

const logUrl = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`===== FETCHING URL =====> ${req.originalUrl}`);
    next();
};

export const start = async (): Promise<any> => {
    const app = express();
    const port = '8055';

    server = http.createServer(app);

    // app.use('/mocks', express.static('./mocks'));
    app.all('*', logUrl);
    app.get('/endpoint', handlePollingEndpoint);

    // GRAPHQL MOCKS - Token + Query
    app.post('/token', handleToken);
    app.post('/Data', handleData);
    server.listen(port, () => {
        console.info(`[Mock Server] Listening on Port: ${port}`);
        Promise.resolve();
    });

    server.on('error', (err: any) => {
        console.log(`[Stub Server] Connection error: `, err);
        if (err.code === 'EADDRINUSE') {
            server.close();
            Promise.reject();
        }
        
    });
    // Start polling - number of items & polling interval in ms
    // endpoint: http://localhost:8055/endpoint?id=TEST
    (enablePolling) ? await startPolling(10,5000) : {};
};

export const stop = async (): Promise<any> => {
    server.close();
    Promise.resolve();
};
