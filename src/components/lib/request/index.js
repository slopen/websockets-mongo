// @flow

type RequestParams = {
	uri: string,
	headers?: {[key: string]: string},
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS',
	body?: Object
};

type ErrorResponse = {
	message?: string,
	error?: string
};

const stringify = (body: Object) =>
	typeof body === 'object'
		? JSON.stringify (body)
		: null;

export default ({
	uri,
	method = 'GET',
	headers = {},
	body
}: RequestParams): Promise<any> =>
	fetch (uri, {
		method,
		headers: {
			...headers,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		cache: 'default',

		body: method !== 'GET' && body
			? stringify (body)
			: null,
		credentials: 'include',
		mode: 'cors'
	})
		.catch (() => {
			throw new Error (`cannot fetch ${uri}`);
		})
		.then ((res) => {
			if (res.ok) {
				return res.json ();
			}

			return res.json ()
				.then ((res: ErrorResponse) =>
					Promise.reject (
						res.message || res.error || res
					)
				);
		});