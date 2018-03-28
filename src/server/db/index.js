// @flow
import config from 'config';
import mongoose from 'mongoose';
import oplogSubscribe from './oplog';

type MongoOptions = {
	connstr: string;
	options: Object;
};

const opts: MongoOptions = config.mongodb;
const {connstr, options} = opts;

mongoose.Promise = Promise;

export default () => {
	oplogSubscribe ();

	return mongoose
		.connect (connstr, options)
		.then (() => mongoose.connection);
}
