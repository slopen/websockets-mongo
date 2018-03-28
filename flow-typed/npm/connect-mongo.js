// @flow

import {Store as expressSession$Store} from 'express-session';

declare module 'connect-mongo' {
    import type {MongoClientOptions, Db} from 'mongodb';
    import type {MongooseConnection}  from 'mongoose';

    import type {Middleware} from 'express';
    import type {Session, SessionOptions} from 'express-session';

    declare class Store extends expressSession$Store {}

    declare interface DefaultOptions {

        /**
         * The hostname of the database you are connecting to.
         * (Default: '127.0.0.1')
        */
        host?: string;

        /**
         * The port number to connect to.
         * (Default: 27017)
         */
        port?: string;

        /**
         * (Default: false)
         */
        autoReconnect?: boolean;

        /**
         * (Default: true)
         */
        ssl?: boolean;

        /**
         * (Default: 1)
         */
        w?: number;

        /**
         * The colletion of the database you are connecting to.
         * (Default: sessions)
         */
        collection?: string;

        /**
         * Serialize sessions using JSON.stringify and deserialize them with JSON.parse.
         * (Default: true)
         */
        stringify?: boolean;

        /**
         * Default: false
         */
        hash?: boolean;

        /**
         * Default: 14 days (60 * 60 * 24 * 14)
         */
        ttl?: number;

        /**
         * Automatically remove expired sessions.
         * (Default: 'native')
         */
        autoRemove?: string;

        /**
         * (Default: 10)
         */
        autoRemoveInterval?: number;

        /**
         * don't save session if unmodified
         */
        touchAfter?: number;
    }

    declare interface MongoUrlOptions extends DefaultOptions {
        url: string;
        mongoOptions?: MongoClientOptions;
    }

    declare interface MogooseConnectionOptions extends DefaultOptions {
        mongooseConnection: MongooseConnection;
    }

    declare interface NativeMongoOptions extends DefaultOptions {
        db: Db;
    }

    declare interface NativeMongoPromiseOptions extends DefaultOptions {
        dbPromise: Promise<Db>;
    }

    declare class MongoStore extends Store {
        constructor (options: MongoUrlOptions | MogooseConnectionOptions | NativeMongoOptions | NativeMongoPromiseOptions): MongoStore;
        get: (sid: string, callback: (err: any, session: Session) => void) => void;
        set: (sid: string, session: Session, callback: (err: any) => void) => void;
        destroy: (sid: string, callback: (err: any) => void) => void;
        length: (callback: (err: any, length: number) => void) => void;
        clear: (callback: (err: any) => void) => void;
        touch: (sid: string, session: Session, callback: (err: any) => void) => void;
    }

    declare export default (connect: (options?: SessionOptions) => Middleware) => Class <MongoStore>;
}