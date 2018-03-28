// @flow
import throttle from 'lodash.throttle';

import IOSocket from 'components/lib/socket';
import BaseAdapter from './';

import type {Box, Subscribable} from './';

type AwaitBoxes = (socket: IOSocket) => Promise<Box[]>;
type AwaitBox = (socket: IOSocket, item: Box) => Promise<Box>;


const DELAY: number = 10;

const getBoxes: AwaitBoxes = (socket: IOSocket) => {
	socket.publish ('box:items');

	return Promise.resolve ([]);
}

const createBox: AwaitBox = (socket: IOSocket, item: Box) => {
	socket.publish ('box:create', item);

	return Promise.resolve (item);
}

const updateBox: AwaitBox = throttle ((socket: IOSocket, item: Box) => {
	socket.publish ('box:update', item);

	return Promise.resolve (item);
}, DELAY);

const deleteBox: AwaitBox = (socket: IOSocket, item: Box) => {
	socket.publish ('box:delete', item);

	return Promise.resolve (item);
}


export default class WebsocketsAdapter extends BaseAdapter implements Subscribable {

	_socket: IOSocket;

	constructor (DELAY: number = 10) {
		super ();

		this._socket = new IOSocket ();

		(this: any).update = throttle (this.update.bind (this), DELAY);
	}

	get () {
		return getBoxes (this._socket);
	}

	create (item: Box) {
		return createBox (this._socket, item);
	}

	update (item: Box) {
		return updateBox (this._socket, item);
	}

	delete (item: Box) {
		return deleteBox (this._socket, item);
	}


	subscribe (name: string, callback: Function) {
		this._socket.subscribe (name, callback);

		return this;
	}

	unsubscribe (name: string, callback: Function) {
		this._socket.subscribe (name, callback);

		return this;
	}

}