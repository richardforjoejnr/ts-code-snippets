import express from 'express';
import * as http from 'http';
import { startPolling } from '../how-to-setup-dynamic-api-using-express/apiDynamicPollingService'


let server: any;

const handleTimeline = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = req.query.id;
    switch (id) {
        case 'TEST':
            res.sendFile('mocks/polledResponse.json',{root: __dirname});
            break;
    }
};

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
    app.get('/endpoint', handleTimeline);
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
    await startPolling(10,5000);
};

export const stop = async (): Promise<any> => {
    server.close();
    Promise.resolve();
};
