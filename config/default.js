const {name, port} = require ('./defaults.json');

module.exports = {

	name,
	port,

	devPort: 8050,

	contentBase: '../',

	ws: {
		port: 5050,
		path: '/ws/data'
	},

	mongodb: {
		connstr: 'mongodb://localhost:27017/' + name,

		options: {
			autoReconnect: true,
			reconnectInterval: 1000
		}
	}
};