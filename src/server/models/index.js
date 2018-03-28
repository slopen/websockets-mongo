// @flow
import mongoose from 'mongoose';

import type {
	BSONObjectId,
	MongooseModel,
	MongooseDocument,
	MongooseSchema,
	MongooseQuery
} from 'mongoose';

export type ModelOptions = {|
	Name: string,
	Schema: MongooseSchema <MongooseDocument>
|};

export type JsonDoc = {
	id: string,
	[key: string]: any
};

export type JsonData = JsonDoc | Array <JsonDoc>;
export type Query = MongooseQuery <Array <MongooseDocument>, MongooseDocument>;

type MongooseObject = {
	_id: BSONObjectId,
	__v: string,
	[key: string]: any
};

type MongooseData = MongooseDocument | Array <MongooseDocument>;

const {ObjectId} = mongoose.Types;

const toJSON = (doc: MongooseDocument): JsonDoc => {
	// eslint-disable-next-line no-unused-vars
	const {_id, __v, ...data}: MongooseObject = doc.toObject ();

	return {id: _id.toString (), ...data};
};

export default class Model {

	Name: string;
	Model: MongooseModel;

	static toJSON (data: ?MongooseData): ?JsonData {
		if (!data || typeof data !== 'object') {
			return;
		}

		if (Array.isArray (data)) {
			return data.map ((item: MongooseDocument) =>
				toJSON (item)
			);
		}

		return toJSON (data);
	}

	constructor ({Name, Schema}: ModelOptions) {
		if (!Name || !Schema) {
			throw new Error ('name and schema are required');
		}

		this.Name = Name;
		this.Model = mongoose
			.model (Name, Schema);
	}

	async find (query?: Query) {
		const {Model} = this;

		return await Model.find (query || {});
	}

	async findById (id: string) {
		if (!ObjectId.isValid (id)) {
			throw new Error ('id is invalid ' + id);
		}

		return await this.Model.findById (id);
	}

	async update (_id: string, data: JsonDoc) {
		const {Model} = this;

		return await Model.findOneAndUpdate ({_id}, data, {new: true});
	}

	async create (data: JsonDoc) {
		const {Model} = this;
		const doc: MongooseDocument = new Model (data);

		return await doc.save ();
	}

	async delete (query: Query) {
		const {Model} = this;

		return await Model.find (query).remove ();
	}

}