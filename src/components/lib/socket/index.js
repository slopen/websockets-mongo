// @flow
import openSocket from 'socket.io-client';
import type {Socket} from 'socket.io-client';

const defaults = {
	path: '/ws/data',
	transports: ['websocket'],
	reconnectionAttempts: 10
};


export default class IOSocket {

	_socket: Socket;

	constructor (options?: Object = {}) {
		this._socket = openSocket ('/', {
			...defaults,
			...options
		});
	}

	emit (...args: Array <any>) {
		this._socket.emit (...args);
	}

	subscribe (name: string, callback: Function) {
		this._socket.on (name, callback);

		return this;
	}

	unsubscribe (name: string, callback: Function) {
		this._socket.off (name, callback);

		return this;
	}

	publish (name: string, data?: Object) {
		this._socket.emit (name, data);

		return this;
	}

}