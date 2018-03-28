// @flow

export type JSONObject = {[key: string]: JSONValue};
export type JSONValue = | null | boolean | string | number | JSONValue[] | JSONObject;

export type Box = {
	id: string,
	x?: number,
	y?: number,
	z?: number,
	content?: string
} & JSONObject;

type SubscribableFn = (name: string, callback: Function) => Subscribable;

export interface Subscribable {
	+subscribe: SubscribableFn,
	+unsubscribe: SubscribableFn
}

export interface Adapter {
	get (): Promise<Box[]>,
	create (item: Object): Promise<Box>,
	update (item: Box): Promise<Box>,
	delete (item: Box): Promise<Box>,

	subscribe?: SubscribableFn,
	unsubscribe?: SubscribableFn
}

export default class BaseAdapter implements Adapter {

	static findIndex (data: Box[], itemId: string): number {
		return data.findIndex (({id}) => id === itemId)
	}

	constructor () {
		(this: any).get = this.get.bind (this);
		(this: any).create = this.create.bind (this);
		(this: any).update = this.update.bind (this);
		(this: any).delete = this.delete.bind (this);
	}

	async get () {
		console.log ('get items');

		return [];
	}

	async create (item: Object) {
		console.log ('create item', item);

		return item;
	}

	async update (item: Box) {
		console.log ('update item', item);

		return item;
	}

	async delete (item: Box) {
		console.log ('delete item', item);

		return item;
	}

}