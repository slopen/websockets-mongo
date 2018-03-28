// @flow
import BaseModel from './';
import Schema from '../schemas/box';
import ws from '../ws';

import type {MongooseDocument} from 'mongoose';
import type {JsonDoc} from './index'


const Name: string = 'Box';

export const toJSON = BaseModel.toJSON;

class BoxModel extends BaseModel {
	async update (id: string, data: JsonDoc) {
		const result: ?MongooseDocument = await super.update (id, data);

		ws.emit ('box:update', toJSON (result));

		return result;
	}

	async create (data: JsonDoc) {
		const result: MongooseDocument = await super.create (data);

		ws.emit ('box:create', toJSON (result));

		return result;
	}

	async delete (data: Object) {
		const result: ?MongooseDocument = await super.delete (data);

		ws.emit ('box:delete', {id: data._id});

		return result;
	}
}


export default new BoxModel ({Name, Schema});