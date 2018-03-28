// @flow

declare module 'express-session' {
  import type {
    CookieOptions,
    Middleware,
    NextFunction,
    RequestParams,
    $Response,
    $Request
  } from 'express';

  declare class EventEmitter extends events$EventEmitter {}

  declare export interface Request {
    session?: Session;
    sessionID?: string;
  }

  declare export interface SessionData {
    [key: string]: any;
    cookie: SessionCookie;
  }

  declare type SessionCookieData = {
    originalMaxAge: number;
    path: string;
    maxAge: number | null;
    secure?: boolean;
    httpOnly: boolean;
    domain?: string;
    expires: Date | boolean;
    serialize (name: string, value: string): string;
  };

  declare interface SessionCookie extends SessionCookieData {
    serialize (name: string, value: string): string;
  }

  declare export interface Session extends SessionData {
    id: string;
    regenerate (callback: (err: any) => void): void;
    destroy (callback: (err: any) => void): void;
    reload (callback: (err: any) => void): void;
    save (callback: (err: any) => void): void;
    touch (callback: (err: any) => void): void;
    cookie: SessionCookie;
  }

  declare export type SessionOptions = {
    secret: Array<string> | string;
    name?: string;
    store?: Store | MemoryStore;
    cookie?: CookieOptions;
    genid?: (req: $Request) => string;
    rolling?: boolean;
    resave?: boolean;
    proxy?: boolean;
    saveUninitialized?: boolean;
    unset?: string;
  };

  declare export interface BaseMemoryStore {
    get: (sid: string, callback: (err: any, session: SessionData) => void) => void;
    set: (sid: string, session: Session, callback: (err: any) => void) => void;
    destroy: (sid: string, callback: (err: any) => void) => void;
    length?: (callback: (err: any, length: number) => void) => void;
    clear?: (callback: (err: any) => void) => void;
  }


  declare export class Store extends EventEmitter {
    constructor (config?: any): void;

    regenerate: (req: $Request, fn: (err: any) => any) => void;
    load: (sid: string, fn: (err: any, session: Session) => any) => void;
    createSession: (req: $Request, sess: SessionData) => void;

    get: (sid: string, callback: (err: any, session: Session) => void) => void;
    set: (sid: string, session: Session, callback: (err: any) => void) => void;
    destroy: (sid: string, callback: (err: any) => void) => void;
    all: (callback: (err: any, obj: { [sid: string]: Session; }) => void) => void;
    length: (callback: (err: any, length: number) => void) => void;
    clear: (callback: (err: any) => void) => void;
  }

  declare export class MemoryStore implements BaseMemoryStore {
    get: (sid: string, callback: (err: any, session: SessionData) => void) => void;
    set: (sid: string, session: Session, callback: (err: any) => void) => void;
    destroy: (sid: string, callback: (err: any) => void) => void;
    all: (callback: (err: any, obj: { [sid: string]: Session; }) => void) => void;
    length: (callback: (err: any, length: number) => void) => void;
    clear: (callback: (err: any) => void) => void;
  }


  declare export default (options?: SessionOptions) => Middleware;
}