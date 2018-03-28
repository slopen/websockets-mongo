// @flow
import debounce from 'lodash.debounce';
import BaseAdapter from './';
import type {JSONValue, Box} from './';


const setBoxes: (boxes: Box[]) => void = debounce (
	(boxes: Box[]) => sessionStorage.setItem ('boxes',
		boxes ? JSON.stringify (boxes) : '[]'
	), 250);

const getBoxes = (): Box[] => {
	try {
		const data: JSONValue = JSON.parse (
			sessionStorage.getItem ('boxes') || '[]'
		);

		if (Array.isArray (data)) {
			return (data: any);
		}

		return [];
	} catch (e) {
		return [];
	}
}

export default class LocalStorageAdapter extends BaseAdapter {

	async get () {
		return getBoxes ();
	}

	async create (item: Box) {
		const boxes = getBoxes ();
		const id = new Date ()
			.getTime ()
			.toString ();

		boxes.push ({id, ...item});
		setBoxes (boxes);

		return item;
	}

	async update (item: Box) {
		const boxes = getBoxes ();
		const index = this.constructor.findIndex (boxes, item.id);

		boxes [index] = item;
		setBoxes (boxes);

		return item;
	}

	async delete (item: Box) {
		const boxes = getBoxes ();
		const index = this.constructor.findIndex (boxes, item.id);

		boxes.splice (index, 1);
		setBoxes (boxes);

		return item;
	}
}