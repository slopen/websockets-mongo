// @flow

declare module 'cookie-parser' {
	import type {Middleware} from 'express';

	declare interface CookieParseOptions {
		decode?: (val: string) => string;
	}

	declare function JSONCookie (jsonCookie: string): ?Object;
	declare function signedCookie (cookie: string, secret: string | string[]): string | false;

	declare function JSONCookies <T: {[key: string]: string}> (jsonCookies: T): $Shape<T>;
	declare function signedCookies <T: {[key: string]: string}> (cookies: T, secret: string | string[]): $Shape<T>;

	declare export default (secret?: string | string[], options?: CookieParseOptions) => Middleware;
}