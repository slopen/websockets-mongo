// @flow
import socketIO from 'socket.io';
import config from 'config';

import Box, {toJSON} from '../models/box';

import type {JsonDoc} from '../models';

import type {
	Socket,
	SocketNamespace
} from 'socket.io';


type Client = SocketNamespace & Socket;

const {port, path}: {
	port: string,
	path: string
} = config.ws;

const io = socketIO ({path});

io
	.on ('connection', (client: Client) => {
		console.log ('* connected client', client.id);

		client
			.on ('disconnect', () => {
				console.log ('* disconnect client', client.id);
			});

		// websockets api

		client
			.on ('box:items', async () =>
				io.emit ('box:items', toJSON (await Box.find ()))
			);
		client
			.on ('box:create', async (item: JsonDoc) =>
				await Box.create (item)
			);
		client
			.on ('box:update', async (item: JsonDoc) =>
				await Box.update (item.id, item)
			);
		client
			.on ('box:delete', async (item: JsonDoc) =>
				await Box.delete ({_id: item.id})
			);

	});

io
	.listen (port);


export default io