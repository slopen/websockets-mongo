// @flow
const apiBase: string = 'https://websockets.mongo';

export default {

	apiBase,

	apiAuth: {

		logout: {
			uri: `${apiBase}/session`,
			method: 'DELETE'
		},

		session: {
			uri: `${apiBase}/session`,
			method: 'GET'
		}
	}
};