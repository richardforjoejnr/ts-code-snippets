import * as express from 'express';

export const handlePollingEndpoint = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = req.query.id;
    const method = req.method;
    const path = `${method}:${req.params[0]}`;
    
    switch (id) {
        case 'TEST':
            res.sendFile('mocks/polledResponse.json',{root: __dirname});
            break;
    }
};