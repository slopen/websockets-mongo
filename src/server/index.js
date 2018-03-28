// @flow

import path from 'path';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import compression from 'compression';
import connectMongo from 'connect-mongo';

import config from 'config';
import connectDb from './db';

import api from './api';
import ws from './ws';
import appSession from './session';

import type {
    $Request,
    $Response,
    NextFunction
} from 'express';

const {
    name: NAME,
    port: PORT,
    ws: WS,
    contentBase
}: {
    name: string,
    port: string,
    ws: {port: string},
    contentBase: string
} = config;

const PUBLIC_PATH = path.resolve (__dirname, contentBase);
const INDEX_PATH = path.resolve (PUBLIC_PATH, 'index.html');
const MongoStore = connectMongo (session);

(async (app) => {

    const mongooseConnection = await connectDb ();

    // express server
    app
        .all ('*', (req: $Request, res: $Response, next: NextFunction) => {
            res.header ('Access-Control-Allow-Credentials', 'true');
            res.header ('Access-Control-Allow-Origin', req.headers.origin || '*');
            res.header ('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header ('Access-Control-Allow-Headers', 'X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept');

            if (req.method === 'OPTIONS') {
                return res.send (200);
            }

            next ();
        })

        .use (compression ())

        .use (session ({
            resave: true,
            saveUninitialized: true,
            secret: 'secret do not tell',
            store: new MongoStore ({
                mongooseConnection
            })
        }))
        .use (cookieParser ())

        .use (express.static (PUBLIC_PATH))

        .use (bodyParser.urlencoded ({
            extended: true
        }))
        .use (bodyParser.json ())

        .use ('/api', api)
        .use ('/session', appSession)

        .get ('*', (req: $Request, res: $Response) =>
            res.sendFile (INDEX_PATH)
        );

    http
        .createServer (app)
        .listen (PORT, () => {
            const {name, port} = mongooseConnection;

            console.log (`* ${NAME} server started on port ${PORT}`);
            console.log (`* ${NAME} mongoose connected to ${port}/${name}`);
            console.log (`* ${NAME} websockets started on ${WS.port}${ws.path ()}`);
        });

}) (express ());