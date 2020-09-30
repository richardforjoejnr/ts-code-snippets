import express from 'express';
import * as http from 'http';
// import { startPolling } from '../test/e2e/utils/apiMockerPollingService';


let server: any;

const handleTimeline = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = req.query.id;
    switch (id) {
        case 'game:6093345001149716201':
            res.sendFile('./test/e2e/support_files/stubData/golfMockData/pollingData/golfPollingTimeline.json');
            break;
        case 'football':
            res.sendFile('./stub-server/mocks/timeline/Football.json');
            break;
        case 'cricket':
            res.sendFile('./stub-server/mocks/timeline/Cricket.json');
            break;
    }
};

const handleSchedule = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.sendFile('./stub-server/mocks/schedule.json');
};

const logUrl = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`===== FETCHING URL =====> ${req.originalUrl}`);
    next();
};
export const start = async (): Promise<any> => {
    const app = express();
    const port = '8055';

    server = http.createServer(app);

    // app.use('/mocks', express.static('./stub-server/mocks'));
    app.all('*', logUrl);
    app.get('/timeline', handleTimeline);
    app.get('/schedule', handleSchedule);
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
    // await startPolling('golf', 100, 4, 5000);
};

export const stop = async (): Promise<any> => {
    server.close();
    Promise.resolve();
};
