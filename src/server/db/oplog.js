// @flow
import config from 'config';
import MongoDB, {Timestamp} from 'mongodb';
import ws from '../ws';

import type {
	MongoClient,
	FindOneOptions
} from 'mongodb';

type OplogEntry = {
	ts: string,
	op: string,
	ns: string,
	o: {
		_id: string,
		$set?: Object
	},
	o2: {
		_id: string
	}
};

const ns: string = `${config.name}.boxes`;

const getTimestamp = () =>
	new Timestamp (0, Math.floor (
		new Date ().getTime () / 1000)
	);

const processInsert = ({o: {_id, ...rest}}: OplogEntry) =>
	ws.emit ('box:create', {id: _id, ...rest});

const processDelete = ({o}: OplogEntry) =>
	ws.emit ('box:delete', {id: o._id});

const processUpdate = ({o2: {_id}, o: {$set}}: OplogEntry) =>
	ws.emit ('box:update', {id: _id, ...$set});


const processData = (data: OplogEntry): void => {
	if (data.ns !== ns) {
		return;
	}

	switch (data.op) {
		case 'i':
			processInsert (data);
			break;
		case 'u':
			processUpdate (data);
			break;
		case 'd':
			processDelete (data);
	}
};

const oplogURI: string = config.mongodb.oplog;
const findOptions: FindOneOptions = {
	tailable: true,
	awaitdata: true,
	oplogReplay: true,
	numberOfRetries: -1
};


export default async () => {
	const client: MongoClient = await MongoDB
		.MongoClient
		.connect (oplogURI);

	const db = client.db ('local');
	const oplog = db.collection ('oplog.rs');

	const lastEntry: Promise <OplogEntry> = oplog
		.find ({}, {ts: 1})
		.sort ({$natural: -1})
		.limit (1)
		.next ();

	const lastDoc = await lastEntry;
	const ts = {$gt: (lastDoc && lastDoc.ts) || getTimestamp ()};

	oplog
		.find ({ts}, findOptions)
		.stream ()
		.on ('data', processData);

	return db;
}
