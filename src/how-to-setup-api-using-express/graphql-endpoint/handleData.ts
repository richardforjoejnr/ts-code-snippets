/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';
import * as Queries from './Queries/Queries'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handleData = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    console.log(req.body.query);
    console.log(req.body.variables);

    const query = req.body.query
    const queryPath = './Response';
    const queries = new Map();

    queries.set(Queries.QUERY_DATA, `${queryPath}/mock.json`);
    if (queries.has(query)) {
        res.sendfile(queries.get(query));
    } else {
        res.end('No matching response found for', query);
    }

};
