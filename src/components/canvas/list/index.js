// @flow
import BaseAdapter from './adapter';
import type {Adapter, Box} from './adapter';

type ListUpdateFunc = (list: Box[], data: Box, callback: Function) => Box[];


const itemData = {
	x: 10,
	y: 10,
	content: 'change me text'
};

const maxZIndex: (data: Box[]) => number = (data: Box[]) =>
	data.reduce ((current: number, next: Box) =>
		Math.max (current, next.z || 0), 0
	);

const create: ListUpdateFunc = (list: Box[], data: Box, callback?: (data: Box) => void) => {
	const index: number = BaseAdapter.findIndex (list, data.id);

	if (index === -1) {
		list.push (data);

		if (callback) {
			callback (data);
		}
	}

	return list;
}

const update: ListUpdateFunc = (list: Box[], data: Box, callback: (data: Box) => void) => {
	const index: number = BaseAdapter.findIndex (list, data.id);

	if (index !== -1) {
		const item: Box = {
			...list [index],
			...data
		};

		list [index] = item;

		if (callback) {
			callback (item);
		}
	}

	return list;
}

const remove: ListUpdateFunc = (list: Box[], data: Box, callback: (data: Box) => void) => {
	const index: number = BaseAdapter.findIndex (list, data.id);

	if (index !== -1) {
		list.splice (index, 1);

		if (callback) {
			callback (data);
		}
	}

	return list;
}

export default class List {

	_list: Box[];
	_adapter: Adapter;
	_onUpdate: () => void;

	constructor (adapter?: Adapter, onUpdate?: (Box[]) => void) {
		this._list = [];
		this._adapter = adapter || new BaseAdapter ();

		if (typeof onUpdate === 'function') {
			const updater: (Box[]) => void = onUpdate;

			this._onUpdate = () => updater (this._list);
			this._subscribeUpdates ();
		}
	}

	_subscribeUpdates (): void {
		if (typeof this._adapter.subscribe === 'function') {
			this._adapter
				.subscribe ('box:items', (items: Box []) => {
					this._list = items;
					this._onUpdate ();
				})
				.subscribe ('box:create', (data: Box) =>
					create (this._list, data, this._onUpdate)
				)
				.subscribe ('box:update', (data: Box) =>
					update (this._list, data, this._onUpdate)
				)
				.subscribe ('box:delete', (data: Box) =>
					remove (this._list, data, this._onUpdate)
				);
		}
	}

	async sync () {
		this._list = await this._adapter.get ();
	}

	items (): Box[] {
		return [...this._list];
	}

	createItem (): Box[] {
		const z: number = maxZIndex (this._list) + 1;

		this._adapter.create ({...itemData, z});

		return this._list;
	}

	updateItem (id: string, data: Box): Box[] {
		return update (this._list, {id, ...data}, this._adapter.update);
	}

	removeItem (id: string): Box[] {
		return remove (this._list, {id}, this._adapter.delete);
	}

	setMaxIndex (id: string): Box[] {
		const z: number = maxZIndex (this._list) + 1;

		return this.updateItem (id, {id, z});
	}

}