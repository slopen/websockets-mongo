// @flow
import throttle from 'lodash.throttle';
import request from 'components/lib/request';

import BaseAdapter from './';

import type {Box} from './';

type AwaitBoxes = () => Promise<Box[]>;
type AwaitBox = (item: Box) => Promise<Box>;


const DELAY: number = 100;

const getBoxes: AwaitBoxes = () =>
	request ({
		uri: '/api/boxes'
	});

const createBox: AwaitBox = (item: Box) =>
	request ({
		uri: '/api/boxes',
		method: 'POST',
		body: item
	});

const updateBox: AwaitBox = throttle ((item: Box) =>
	request ({
		uri: `/api/boxes/${item.id}`,
		method: 'PUT',
		body: item
	}), DELAY);

const deleteBox: AwaitBox = (item: Box) =>
	request ({
		uri: `/api/boxes/${item.id}`,
		method: 'DELETE'
	});


export default class XhrAdapter extends BaseAdapter {


	constructor (DELAY: number = 100) {
		super ();

		(this: any).update = throttle (
			this.update.bind (this), DELAY
		);
	}

	get () {
		return getBoxes ();
	}

	create (item: Box) {
		return createBox (item);
	}

	update (item: Box) {
		return updateBox (item);
	}

	delete (item: Box) {
		return deleteBox (item);
	}
}