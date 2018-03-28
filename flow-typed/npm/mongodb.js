// @flow


declare module 'mongodb' {
	declare class EventEmitter extends events$EventEmitter {}
	declare class Readable extends stream$Readable {}
	declare class Writable extends stream$Readable {}

	declare export class ObjectID {

		/**
		* Create a new ObjectID instance
		* @param {(string|number|ObjectID)} id Can be a 24 byte hex string, 12 byte binary string or a Number.
		*/

		constructor(id?: string | number | ObjectID): this;

		/** The generation time of this ObjectID instance */
		generationTime: number;

		/**
		* Creates an ObjectID from a hex string representation of an ObjectID.
		* @param {string} hexString create a ObjectID from a passed in 24 byte hexstring.
		* @return {ObjectID} return the created ObjectID
		*/
		static createFromHexString(hexString: string): ObjectID;

		/**
		* Creates an ObjectID from a second based number, with the rest of the ObjectID zeroed out. Used for comparisons or sorting the ObjectID.
		* @param {number} time an integer number representing a number of seconds.
		* @return {ObjectID} return the created ObjectID
		*/
		static createFromTime(time: number): ObjectID;

		/**
		* Checks if a value is a valid bson ObjectID
		*
		* @return {boolean} return true if the value is a valid bson ObjectID, return false otherwise.
		*/
		static isValid(id: string | number | ObjectID): boolean;

		/**
		* Compares the equality of this ObjectID with `otherID`.
		* @param {object} otherID ObjectID instance to compare against.
		* @return {boolean} the result of comparing two ObjectID's
		*/
		equals(otherID: ObjectID): boolean;

		/**
		* Generate a 12 byte id string used in ObjectID's
		* @param {number} time optional parameter allowing to pass in a second based timestamp.
		* @return {string} return the 12 byte id binary string.
		*/
		generate(time?: number): string;

		/**
		* Returns the generation date (accurate up to the second) that this ID was generated.
		* @return {date} the generation date
		*/
		getTimestamp(): Date;

		/**
		* Return the ObjectID id as a 24 byte hex string representation
		* @return {string} return the 24 byte hex string representation.
		*/
		toHexString(): string;
	}

	declare export class MongoClient {
		constructor(): this;
		connect(uri: string, callback: MongoCallback<Db>): void;
		connect(uri: string, options?: MongoClientOptions): Promise<MongoClient>;
		connect(uri: string, options: MongoClientOptions, callback: MongoCallback<Db>): void;
		db(dbName: string): Db;
	}

	declare export interface MongoCallback<T>{
		(error: MongoError, result: T): void
	}

	declare export class MongoError mixins Error {
		constructor(message: string): this;
		create(options: Object): MongoError;
		code: number;
	}

	declare export type MongoClientOptions = {
		loggerLevel?: string,
		logger?: Object,
		validateOptions?: Object
	} & DbCreateOptions & ServerOptions & MongosOptions & ReplSetOptions & SocketOptions & SSLOptions & HighAvailabilityOptions;

	declare export interface SSLOptions {
		poolSize?: number,
		ssl?: boolean,
		sslValidate?: Object,
		checkServerIdentity?: boolean | Function,
		sslCA?: Array<Buffer | string>,
		sslCRL?: Buffer,
		sslCert?: Buffer | string,
		sslKey?: Buffer | string,
		sslPass?: Buffer | string,
		servername?: string
	}

	declare export interface HighAvailabilityOptions {
		ha?: boolean,
		haInterval?: number,
		domainsEnabled?: boolean
	}

	declare export class ReadPreference {
		constructor(mode: string, tags: Object): this;
		mode: string;
		tags: any;
		options: {
			maxStalenessSeconds?: number
		};
		PRIMARY: string;
		PRIMARY_PREFERRED: string;
		SECONDARY: string;
		SECONDARY_PREFERRED: string;
		NEAREST: string;
		isValid(mode: string): boolean;
		isValid(mode: string): boolean;
	}

	declare export interface DbCreateOptions {
		authSource?: string,
		w?: number | string,
		wtimeout?: number,
		j?: boolean,
		forceServerObjectId?: boolean,
		native_parser?: boolean,
		serializeFunctions?: boolean,
		ignoreUndefined?: boolean,
		raw?: boolean,
		promoteLongs?: boolean,
		promoteBuffers?: number,
		readPreference?: ReadPreference | string,
		promoteValues?: Object,
		pkFactory?: Object,
		promiseLibrary?: Object,
		readConcern?: {
			level?: Object
		},
		bufferMaxEntries?: number
	}

	declare export interface SocketOptions {
		autoReconnect?: boolean,
		noDelay?: boolean,
		keepAlive?: number,
		connectTimeoutMS?: number,
		socketTimeoutMS?: number
	}

	declare export type ServerOptions = {
		reconnectTries?: number,
		reconnectInterval?: number,
		monitoring?: boolean,
		socketOptions?: SocketOptions,
		haInterval?: number,
		domainsEnabled?: boolean
	} & SSLOptions;

	declare export type MongosOptions = {
		acceptableLatencyMS?: number,
		socketOptions?: SocketOptions
	} & SSLOptions & HighAvailabilityOptions;

	declare export type ReplSetOptions = {
		maxStalenessSeconds?: number,
		replicaSet?: string,
		secondaryAcceptableLatencyMS?: number,
		connectWithNoPrimary?: boolean,
		socketOptions?: SocketOptions
	} & SSLOptions & HighAvailabilityOptions;

	declare export class Db extends EventEmitter {
		constructor(databaseName: string, serverConfig: Server | ReplSet | Mongos, options?: DbCreateOptions): this;
		serverConfig: Server | ReplSet | Mongos;
		bufferMaxEntries: number;
		databaseName: string;
		options: any;
		native_parser: boolean;
		slaveOk: boolean;
		writeConcern: any;
		addUser(username: string, password: string, callback: MongoCallback<any>): void;
		addUser(username: string, password: string, options?: DbAddUserOptions): Promise<any>;
		addUser(
			username: string,
			password: string,
			options: DbAddUserOptions,
			callback: MongoCallback<any>): void;
		admin(): Admin;
		authenticate(userName: string, password: string, callback: MongoCallback<any>): void;
		authenticate(
			userName: string,
			password: string,
			options?: {
				authMechanism: string
			}): Promise<any>;
		authenticate(
			userName: string,
			password: string,
			options: {
				authMechanism: string
			},
			callback: MongoCallback<any>): void;
		close(callback: MongoCallback<void>): void;
		close(forceClose?: boolean): Promise<void>;
		close(forceClose: boolean, callback: MongoCallback<void>): void;
		collection<TSchema>(name: string): Collection<TSchema>;
		collection<TSchema>(
			name: string,
			callback: MongoCallback<Collection<TSchema>>): Collection<TSchema>;
		collection<TSchema>(
			name: string,
			options: DbCollectionOptions,
			callback: MongoCallback<Collection<TSchema>>): Collection<TSchema>;
		collections(): Promise<Collection<Default>[]>;
		collections(callback: MongoCallback<Collection<Default>[]>): void;
		command(command: Object, callback: MongoCallback<any>): void;
		command(
			command: Object,
			options?: {
				readPreference: ReadPreference | string
			}): Promise<any>;
		command(
			command: Object,
			options: {
				readPreference: ReadPreference | string
			},
			callback: MongoCallback<any>): void;
		createCollection<TSchema>(name: string, callback: MongoCallback<Collection<TSchema>>): void;
		createCollection<TSchema>(
			name: string,
			options?: CollectionCreateOptions): Promise<Collection<TSchema>>;
		createCollection<TSchema>(
			name: string,
			options: CollectionCreateOptions,
			callback: MongoCallback<Collection<TSchema>>): void;
		createIndex(name: string, fieldOrSpec: string | Object, callback: MongoCallback<any>): void;
		createIndex(
			name: string,
			fieldOrSpec: string | Object,
			options?: IndexOptions): Promise<any>;
		createIndex(
			name: string,
			fieldOrSpec: string | Object,
			options: IndexOptions,
			callback: MongoCallback<any>): void;
		db(dbName: string): Db;
		db(
			dbName: string,
			options: {
				noListener?: boolean,
				returnNonCachedInstance?: boolean
			}): Db;
		dropCollection(name: string): Promise<boolean>;
		dropCollection(name: string, callback: MongoCallback<boolean>): void;
		dropDatabase(): Promise<any>;
		dropDatabase(callback: MongoCallback<any>): void;
		executeDbAdminCommand(command: Object, callback: MongoCallback<any>): void;
		executeDbAdminCommand(
			command: Object,
			options?: {
				readPreference?: ReadPreference | string,
				maxTimeMS?: number
			}): Promise<any>;
		executeDbAdminCommand(
			command: Object,
			options: {
				readPreference?: ReadPreference | string,
				maxTimeMS?: number
			},
			callback: MongoCallback<any>): void;
		indexInformation(name: string, callback: MongoCallback<any>): void;
		indexInformation(
			name: string,
			options?: {
				full?: boolean,
				readPreference?: ReadPreference | string
			}): Promise<any>;
		indexInformation(
			name: string,
			options: {
				full?: boolean,
				readPreference?: ReadPreference | string
			},
			callback: MongoCallback<any>): void;
		listCollections(
			filter?: Object,
			options?: {
				batchSize?: number,
				readPreference?: ReadPreference | string
			}): CommandCursor;
		logout(callback: MongoCallback<any>): void;
		logout(options?: {
			dbName?: string
		}): Promise<any>;
		logout(options: {
			dbName?: string
		}, callback: MongoCallback<any>): void;
		open(): Promise<Db>;
		open(callback: MongoCallback<Db>): void;
		removeUser(username: string, callback: MongoCallback<any>): void;
		removeUser(
			username: string,
			options?: {
				w?: number | string,
				wtimeout?: number,
				j?: boolean
			}): Promise<any>;
		removeUser(
			username: string,
			options: {
				w?: number | string,
				wtimeout?: number,
				j?: boolean
			},
			callback: MongoCallback<any>): void;
		renameCollection<TSchema>(
			fromCollection: string,
			toCollection: string,
			callback: MongoCallback<Collection<TSchema>>): void;
		renameCollection<TSchema>(
			fromCollection: string,
			toCollection: string,
			options?: {
				dropTarget?: boolean
			}): Promise<Collection<TSchema>>;
		renameCollection<TSchema>(
			fromCollection: string,
			toCollection: string,
			options: {
				dropTarget?: boolean
			},
			callback: MongoCallback<Collection<TSchema>>): void;
		stats(callback: MongoCallback<any>): void;
		stats(options?: {
			scale?: number
		}): Promise<any>;
		stats(options: {
			scale?: number
		}, callback: MongoCallback<any>): void;
	}

	declare export class Server extends EventEmitter {
		port: number;
		constructor(host: string, port: number, options?: ServerOptions): this;
		connections(): Array<any >;
	}

	declare export class ReplSet extends EventEmitter {
		port: number;
		constructor(servers: Array<Server>, options?: ReplSetOptions): this;
		connections(): Array<any >;
	}

	declare export class Mongos extends EventEmitter {
		port: number;
		constructor(servers: Array<Server>, options?: MongosOptions): this;
		connections(): Array<any >;
	}

	declare export interface DbAddUserOptions {
		w?: string | number,
		wtimeout?: number,
		j?: boolean,
		customData?: Object,
		roles?: Object[]
	}

	declare export interface CollectionCreateOptions {
		w?: number | string,
		wtimeout?: number,
		j?: boolean,
		raw?: boolean,
		pkFactory?: Object,
		readPreference?: ReadPreference | string,
		serializeFunctions?: boolean,
		strict?: boolean,
		capped?: boolean,
		autoIndexId?: boolean,
		size?: number,
		max?: number,
		flags?: number,
		storageEngine?: "NO PRINT IMPLEMENTED: ObjectKeyword",
		validator?: "NO PRINT IMPLEMENTED: ObjectKeyword",
		validationLevel?: 'off' | 'strict' | 'moderate',
		validationAction?: 'error' | 'warn',
		indexOptionDefaults?: "NO PRINT IMPLEMENTED: ObjectKeyword",
		viewOn?: string,
		pipeline?: any[],
		collation?: "NO PRINT IMPLEMENTED: ObjectKeyword"
	}

	declare export interface DbCollectionOptions {
		w?: number | string,
		wtimeout?: number,
		j?: boolean,
		raw?: boolean,
		pkFactory?: Object,
		readPreference?: ReadPreference | string,
		serializeFunctions?: boolean,
		strict?: boolean,
		readConcern?: {
			level: Object
		}
	}

	declare export interface IndexOptions {
		w?: number | string,
		wtimeout?: number,
		j?: boolean,
		unique?: boolean,
		sparse?: boolean,
		background?: boolean,
		dropDups?: boolean,
		min?: number,
		max?: number,
		v?: number,
		expireAfterSeconds?: number,
		name?: string,
		partialFilterExpression?: any
	}

	declare export interface Admin {
		addUser(username: string, password: string, callback: MongoCallback<any>): void,
		addUser(username: string, password: string, options?: AddUserOptions): Promise<any>,
		addUser(
			username: string,
			password: string,
			options: AddUserOptions,
			callback: MongoCallback<any>): void,
		authenticate(username: string, callback: MongoCallback<any>): void,
		authenticate(username: string, password?: string): Promise<any>,
		authenticate(username: string, password: string, callback: MongoCallback<any>): void,
		buildInfo(): Promise<any>,
		buildInfo(callback: MongoCallback<any>): void,
		command(command: Object, callback: MongoCallback<any>): void,
		command(
			command: Object,
			options?: {
				readPreference?: ReadPreference | string,
				maxTimeMS?: number
			}): Promise<any>,
		command(
			command: Object,
			options: {
				readPreference?: ReadPreference | string,
				maxTimeMS?: number
			},
			callback: MongoCallback<any>): void,
		listDatabases(): Promise<any>,
		listDatabases(callback: MongoCallback<any>): void,
		logout(): Promise<any>,
		logout(callback: MongoCallback<any>): void,
		ping(): Promise<any>,
		ping(callback: MongoCallback<any>): void,
		profilingInfo(): Promise<any>,
		profilingInfo(callback: MongoCallback<any>): void,
		profilingLevel(): Promise<any>,
		profilingLevel(callback: MongoCallback<any>): void,
		removeUser(username: string, callback: MongoCallback<any>): void,
		removeUser(username: string, options?: FSyncOptions): Promise<any>,
		removeUser(username: string, options: FSyncOptions, callback: MongoCallback<any>): void,
		replSetGetStatus(): Promise<any>,
		replSetGetStatus(callback: MongoCallback<any>): void,
		serverInfo(): Promise<any>,
		serverInfo(callback: MongoCallback<any>): void,
		serverStatus(): Promise<any>,
		serverStatus(callback: MongoCallback<any>): void,
		setProfilingLevel(level: string): Promise<any>,
		setProfilingLevel(level: string, callback: MongoCallback<any>): void,
		validateCollection(collectionNme: string, callback: MongoCallback<any>): void,
		validateCollection(collectionNme: string, options?: Object): Promise<any>,
		validateCollection(collectionNme: string, options: Object, callback: MongoCallback<any>): void
	}
	declare export interface AddUserOptions {
		w?: number | string,
		wtimeout?: number,
		j?: boolean,
		fsync: boolean,
		customData?: Object,
		roles?: Object[]
	}

	declare export interface FSyncOptions {
		w?: number | string,
		wtimeout?: number,
		j?: boolean,
		fsync?: boolean
	}

	declare export interface Collection<TSchema>{
		collectionName: string,
		namespace: string,
		writeConcern: any,
		readConcern: any,
		hint: any,
		aggregate<T>(pipeline: Object[], callback: MongoCallback<T[]>): AggregationCursor<T>,
		aggregate<T>(
			pipeline: Object[],
			options?: CollectionAggregationOptions,
			callback?: MongoCallback<T[]>): AggregationCursor<T>,
		bulkWrite(operations: Object[], callback: MongoCallback<BulkWriteOpResultObject>): void,
		bulkWrite(
			operations: Object[],
			options?: CollectionBluckWriteOptions): Promise<BulkWriteOpResultObject>,
		bulkWrite(
			operations: Object[],
			options: CollectionBluckWriteOptions,
			callback: MongoCallback<BulkWriteOpResultObject>): void,
		count(query: Object, callback: MongoCallback<number>): void,
		count(query: Object, options?: MongoCountPreferences): Promise<number>,
		count(
			query: Object,
			options: MongoCountPreferences,
			callback: MongoCallback<number>): void,
		createIndex(fieldOrSpec: string | any, callback: MongoCallback<string>): void,
		createIndex(fieldOrSpec: string | any, options?: IndexOptions): Promise<string>,
		createIndex(
			fieldOrSpec: string | any,
			options: IndexOptions,
			callback: MongoCallback<string>): void,
		createIndexes(indexSpecs: Object[]): Promise<any>,
		createIndexes(indexSpecs: Object[], callback: MongoCallback<any>): void,
		deleteMany(filter: Object, callback: MongoCallback<DeleteWriteOpResultObject>): void,
		deleteMany(
			filter: Object,
			options?: CollectionOptions): Promise<DeleteWriteOpResultObject>,
		deleteMany(
			filter: Object,
			options: CollectionOptions,
			callback: MongoCallback<DeleteWriteOpResultObject>): void,
		deleteOne(filter: Object, callback: MongoCallback<DeleteWriteOpResultObject>): void,
		deleteOne(
			filter: Object,
			options?: {
				w?: number | string,
				wtimmeout?: number,
				j?: boolean,
				bypassDocumentValidation?: boolean
			}): Promise<DeleteWriteOpResultObject>,
		deleteOne(
			filter: Object,
			options: {
				w?: number | string,
				wtimmeout?: number,
				j?: boolean,
				bypassDocumentValidation?: boolean
			},
			callback: MongoCallback<DeleteWriteOpResultObject>): void,
		distinct(key: string, query: Object, callback: MongoCallback<any>): void,
		distinct(
			key: string,
			query: Object,
			options?: {
				readPreference?: ReadPreference | string
			}): Promise<any>,
		distinct(
			key: string,
			query: Object,
			options: {
				readPreference?: ReadPreference | string
			},
			callback: MongoCallback<any>): void,
		drop(): Promise<any>,
		drop(callback: MongoCallback<any>): void,
		dropIndex(indexName: string, callback: MongoCallback<any>): void,
		dropIndex(indexName: string, options?: CollectionOptions): Promise<any>,
		dropIndex(
			indexName: string,
			options: CollectionOptions,
			callback: MongoCallback<any>): void,
		dropIndexes(): Promise<any>,
		dropIndexes(callback?: MongoCallback<any>): void,
		find<T>(query?: Object): Cursor<T>,

		/**
		 *
		 * @deprecated  undefined
		 */
		find<T>(
			query: Object,
			fields?: Object,
			skip?: number,
			limit?: number,
			timeout?: number): Cursor<T>,
		findOne<T>(filter: Object, callback: MongoCallback<T | null>): void,
		findOne<T>(filter: Object, options?: FindOneOptions): Promise<T | null>,
		findOne<T>(
			filter: Object,
			options: FindOneOptions,
			callback: MongoCallback<T | null>): void,
		findOneAndDelete(
			filter: Object,
			callback: MongoCallback<FindAndModifyWriteOpResultObject<TSchema>>): void,
		findOneAndDelete(
			filter: Object,
			options?: {
				projection?: Object,
				sort?: Object,
				maxTimeMS?: number
			}): Promise<FindAndModifyWriteOpResultObject<TSchema>>,
		findOneAndDelete(
			filter: Object,
			options: {
				projection?: Object,
				sort?: Object,
				maxTimeMS?: number
			},
			callback: MongoCallback<FindAndModifyWriteOpResultObject<TSchema>>): void,
		findOneAndReplace(
			filter: Object,
			replacement: Object,
			callback: MongoCallback<FindAndModifyWriteOpResultObject<TSchema>>): void,
		findOneAndReplace(
			filter: Object,
			replacement: Object,
			options?: FindOneAndReplaceOption): Promise<FindAndModifyWriteOpResultObject<TSchema>>,
		findOneAndReplace(
			filter: Object,
			replacement: Object,
			options: FindOneAndReplaceOption,
			callback: MongoCallback<FindAndModifyWriteOpResultObject<TSchema>>): void,
		findOneAndUpdate(
			filter: Object,
			update: Object,
			callback: MongoCallback<FindAndModifyWriteOpResultObject<TSchema>>): void,
		findOneAndUpdate(
			filter: Object,
			update: Object,
			options?: FindOneAndReplaceOption): Promise<FindAndModifyWriteOpResultObject<TSchema>>,
		findOneAndUpdate(
			filter: Object,
			update: Object,
			options: FindOneAndReplaceOption,
			callback: MongoCallback<FindAndModifyWriteOpResultObject<TSchema>>): void,
		geoHaystackSearch(x: number, y: number, callback: MongoCallback<any>): void,
		geoHaystackSearch(x: number, y: number, options?: GeoHaystackSearchOptions): Promise<any>,
		geoHaystackSearch(
			x: number,
			y: number,
			options: GeoHaystackSearchOptions,
			callback: MongoCallback<any>): void,
		geoNear(x: number, y: number, callback: MongoCallback<any>): void,
		geoNear(x: number, y: number, options?: GeoNearOptions): Promise<any>,
		geoNear(
			x: number,
			y: number,
			options: GeoNearOptions,
			callback: MongoCallback<any>): void,
		group(
			keys: Object | Array<any>| Function | Code,
			condition: Object,
			initial: Object,
			reduce: Function | Code,
			finalize: Function | Code,
			command: boolean,
			callback: MongoCallback<any>): void,
		group(
			keys: Object | Array<any>| Function | Code,
			condition: Object,
			initial: Object,
			reduce: Function | Code,
			finalize: Function | Code,
			command: boolean,
			options?: {
				readPreference?: ReadPreference | string
			}): Promise<any>,
		group(
			keys: Object | Array<any>| Function | Code,
			condition: Object,
			initial: Object,
			reduce: Function | Code,
			finalize: Function | Code,
			command: boolean,
			options: {
				readPreference?: ReadPreference | string
			},
			callback: MongoCallback<any>): void,
		indexes(): Promise<any>,
		indexes(callback: MongoCallback<any>): void,
		indexExists(indexes: string | string[]): Promise<boolean>,
		indexExists(indexes: string | string[], callback: MongoCallback<boolean>): void,
		indexInformation(callback: MongoCallback<any>): void,
		indexInformation(options?: {
			full: boolean
		}): Promise<any>,
		indexInformation(options: {
			full: boolean
		}, callback: MongoCallback<any>): void,
		initializeOrderedBulkOp(options?: CollectionOptions): OrderedBulkOperation,
		initializeUnorderedBulkOp(options?: CollectionOptions): UnorderedBulkOperation,

		/**
		 *
		 * @deprecated  Use insertOne, insertMany or bulkWrite
		 */
		insert(docs: Object, callback: MongoCallback<InsertOneWriteOpResult>): void,

		/**
		 *
		 * @deprecated  Use insertOne, insertMany or bulkWrite
		 */
		insert(
			docs: Object,
			options?: CollectionInsertOneOptions): Promise<InsertOneWriteOpResult>,

		/**
		 *
		 * @deprecated  Use insertOne, insertMany or bulkWrite
		 */
		insert(
			docs: Object,
			options: CollectionInsertOneOptions,
			callback: MongoCallback<InsertOneWriteOpResult>): void,
		insertMany(docs: Object[], callback: MongoCallback<InsertWriteOpResult>): void,
		insertMany(
			docs: Object[],
			options?: CollectionInsertManyOptions): Promise<InsertWriteOpResult>,
		insertMany(
			docs: Object[],
			options: CollectionInsertManyOptions,
			callback: MongoCallback<InsertWriteOpResult>): void,
		insertOne(docs: Object, callback: MongoCallback<InsertOneWriteOpResult>): void,
		insertOne(
			docs: Object,
			options?: CollectionInsertOneOptions): Promise<InsertOneWriteOpResult>,
		insertOne(
			docs: Object,
			options: CollectionInsertOneOptions,
			callback: MongoCallback<InsertOneWriteOpResult>): void,
		isCapped(): Promise<any>,
		isCapped(callback: MongoCallback<any>): void,
		listIndexes(
			options?: {
				batchSize?: number,
				readPreference?: ReadPreference | string
			}): CommandCursor,
		mapReduce(
			map: Function | string,
			reduce: Function | string,
			callback: MongoCallback<any>): void,
		mapReduce(
			map: Function | string,
			reduce: Function | string,
			options?: MapReduceOptions): Promise<any>,
		mapReduce(
			map: Function | string,
			reduce: Function | string,
			options: MapReduceOptions,
			callback: MongoCallback<any>): void,
		options(): Promise<any>,
		options(callback: MongoCallback<any>): void,
		parallelCollectionScan(callback: MongoCallback<Cursor<any>[]>): void,
		parallelCollectionScan(options?: ParallelCollectionScanOptions): Promise<Cursor<any>[]>,
		parallelCollectionScan(
			options: ParallelCollectionScanOptions,
			callback: MongoCallback<Cursor<any>[]>): void,
		reIndex(): Promise<any>,
		reIndex(callback: MongoCallback<any>): void,

		/**
		 *
		 * @deprecated  Use use deleteOne, deleteMany or bulkWrite
		 */
		remove(selector: Object, callback: MongoCallback<WriteOpResult>): void,

		/**
		 *
		 * @deprecated  Use use deleteOne, deleteMany or bulkWrite
		 */
		remove(
			selector: Object,
			options?: CollectionOptions & {
				single?: boolean
			}): Promise<WriteOpResult>,

		/**
		 *
		 * @deprecated  Use use deleteOne, deleteMany or bulkWrite
		*/

		remove(
			selector: Object,
			options?: CollectionOptions & {
				single?: boolean
			},
			callback?: MongoCallback<WriteOpResult>): void,
		rename(newName: string, callback: MongoCallback<Collection<TSchema>>): void,
		rename(
			newName: string,
			options?: {
				dropTarget?: boolean
			}): Promise<Collection<TSchema>>,
		rename(
			newName: string,
			options: {
				dropTarget?: boolean
			},
			callback: MongoCallback<Collection<TSchema>>): void,
		replaceOne(
			filter: Object,
			doc: Object,
			callback: MongoCallback<ReplaceWriteOpResult>): void,
		replaceOne(
			filter: Object,
			doc: Object,
			options?: ReplaceOneOptions): Promise<ReplaceWriteOpResult>,
		replaceOne(
			filter: Object,
			doc: Object,
			options: ReplaceOneOptions,
			callback: MongoCallback<ReplaceWriteOpResult>): void,

		/**
		 *
		 * @deprecated  Use insertOne, insertMany, updateOne or updateMany
		 */
		save(doc: Object, callback: MongoCallback<WriteOpResult>): void,

		/**
		 *
		 * @deprecated  Use insertOne, insertMany, updateOne or updateMany
		 */
		save(doc: Object, options?: CollectionOptions): Promise<WriteOpResult>,

		/**
		 *
		 * @deprecated  Use insertOne, insertMany, updateOne or updateMany
		 */
		save(
			doc: Object,
			options: CollectionOptions,
			callback: MongoCallback<WriteOpResult>): void,
		stats(callback: MongoCallback<CollStats>): void,
		stats(options?: {
			scale: number
		}): Promise<CollStats>,
		stats(options: {
			scale: number
		}, callback: MongoCallback<CollStats>): void,

		/**
		 *
		 * @deprecated  use updateOne, updateMany or bulkWrite
		 */
		update(filter: Object, update: Object, callback: MongoCallback<WriteOpResult>): void,

		/**
		 *
		 * @deprecated  use updateOne, updateMany or bulkWrite
		 */
		update(
			filter: Object,
			update: Object,
			options?: ReplaceOneOptions & {
				multi?: boolean
			}): Promise<WriteOpResult>,

		/**
		 *
		 * @deprecated  use updateOne, updateMany or bulkWrite
		 */
		update(
			filter: Object,
			update: Object,
			options: ReplaceOneOptions & {
				multi?: boolean
			},
			callback: MongoCallback<WriteOpResult>): void,
		updateMany(
			filter: Object,
			update: Object,
			callback: MongoCallback<UpdateWriteOpResult>): void,
		updateMany(
			filter: Object,
			update: Object,
			options?: {
				upsert?: boolean,
				w?: any,
				wtimeout?: number,
				j?: boolean
			}): Promise<UpdateWriteOpResult>,
		updateMany(
			filter: Object,
			update: Object,
			options: {
				upsert?: boolean,
				w?: any,
				wtimeout?: number,
				j?: boolean
			},
			callback: MongoCallback<UpdateWriteOpResult>): void,
		updateOne(
			filter: Object,
			update: Object,
			callback: MongoCallback<UpdateWriteOpResult>): void,
		updateOne(
			filter: Object,
			update: Object,
			options?: ReplaceOneOptions): Promise<UpdateWriteOpResult>,
		updateOne(
			filter: Object,
			update: Object,
			options: ReplaceOneOptions,
			callback: MongoCallback<UpdateWriteOpResult>): void
	}

	declare export interface CollStats {
		ns: string,
		count: number,
		size: number,
		avgObjSize: number,
		storageSize: number,
		numExtents: number,
		nindexes: number,
		lastExtentSize: number,
		paddingFactor: number,
		userFlags?: number,
		totalIndexSize: number,
		indexSizes: {
			_id_: number,
			[index: string]: number
		},
		capped: boolean,
		max: number,
		maxSize: number,
		wiredTiger?: WiredTigerData,
		indexDetails?: any,
		ok: number
	}

	declare export interface WiredTigerData {
		LSM: {
			'bloom filter false positives': number,
			'bloom filter hits': number,
			'bloom filter misses': number,
			'bloom filter pages evicted from cache': number,
			'bloom filter pages read into cache': number,
			'bloom filters in the LSM tree': number,
			'chunks in the LSM tree': number,
			'highest merge generation in the LSM tree': number,
			'queries that could have benefited from a Bloom filter that did not exist': number,
			'sleep for LSM checkpoint throttle': number,
			'sleep for LSM merge throttle': number,
			'total size of bloom filters': number
		},
		block_manager: {
			'allocations requiring file extension': number,
			'blocks allocated': number,
			'blocks freed': number,
			'checkpoint size': number,
			'file allocation unit size': number,
			'file bytes available for reuse': number,
			'file magic number': number,
			'file major version number': number,
			'file size in bytes': number,
			'minor version number': number
		},
		btree: {
			'btree checkpoint generation': number,
			'column - store fixed - size leaf pages': number,
			'column - store internal pages': number,
			'column - store variable - size RLE encoded values': number,
			'column - store variable - size deleted values': number,
			'column - store variable - size leaf pages': number,
			'fixed - record size': number,
			'maximum internal page key size': number,
			'maximum internal page size': number,
			'maximum leaf page key size': number,
			'maximum leaf page size': number,
			'maximum leaf page value size': number,
			'maximum tree depth': number,
			'number of key / value pairs': number,
			'overflow pages': number,
			'pages rewritten by compaction': number,
			'row - store internal pages': number,
			'row - store leaf pages': number
		},
		cache: {
			'bytes currently in the cache': number,
			'bytes read into cache': number,
			'bytes written from cache': number,
			'checkpoint blocked page eviction': number,
			'data source pages selected for eviction unable to be evicted': number,
			'hazard pointer blocked page eviction': number,
			'in -memory page passed criteria to be split': number,
			'in -memory page splits': number,
			'internal pages evicted': number,
			'internal pages split during eviction': number,
			'leaf pages split during eviction': number,
			'modified pages evicted': number,
			'overflow pages read into cache': number,
			'overflow values cached in memory': number,
			'page split during eviction deepened the tree': number,
			'page written requiring lookaside records': number,
			'pages read into cache': number,
			'pages read into cache requiring lookaside entries': number,
			'pages requested from the cache': number,
			'pages written from cache': number,
			'pages written requiring in -memory restoration': number,
			'tracked dirty bytes in the cache': number,
			'unmodified pages evicted': number
		},
		cache_walk: {
			'Average difference between current eviction generation when the page was last considered': number,
			'Average on - disk page image size seen': number,
			'Clean pages currently in cache': number,
			'Current eviction generation': number,
			'Dirty pages currently in cache': number,
			'Entries in the root page': number,
			'Internal pages currently in cache': number,
			'Leaf pages currently in cache': number,
			'Maximum difference between current eviction generation when the page was last considered': number,
			'Maximum page size seen': number,
			'Minimum on - disk page image size seen': number,
			'On - disk page image sizes smaller than a single allocation unit': number,
			'Pages created in memory and never written': number,
			'Pages currently queued for eviction': number,
			'Pages that could not be queued for eviction': number,
			'Refs skipped during cache traversal': number,
			'Size of the root page': number,
			'Total number of pages currently in cache': number
		},
		compression: {
			'compressed pages read': number,
			'compressed pages written': number,
			'page written failed to compress': number,
			'page written was too small to compress': number,
			'raw compression call failed additional data available': number,
			'raw compression call failed no additional data available': number,
			'raw compression call succeeded': number
		},
		cursor: {
			'bulk - loaded cursor - insert calls': number,
			'create calls': number,
			'cursor - insert key and value bytes inserted': number,
			'cursor - remove key bytes removed': number,
			'cursor - update value bytes updated': number,
			'insert calls': number,
			'next calls': number,
			'prev calls': number,
			'remove calls': number,
			'reset calls': number,
			'restarted searches': number,
			'search calls': number,
			'search near calls': number,
			'truncate calls': number,
			'update calls': number
		},
		reconciliation: {
			'dictionary matches': number,
			'fast - path pages deleted': number,
			'internal page key bytes discarded using suffix compression': number,
			'internal page multi - block writes': number,
			'internal - page overflow keys': number,
			'leaf page key bytes discarded using prefix compression': number,
			'leaf page multi - block writes': number,
			'leaf - page overflow keys': number,
			'maximum blocks required for a page': number,
			'overflow values written': number,
			'page checksum matches': number,
			'page reconciliation calls': number,
			'page reconciliation calls for eviction': number,
			'pages deleted': number
		}
	}

	declare export interface CollectionAggregationOptions {
		readPreference?: ReadPreference | string,
		cursor?: {
			batchSize: number
		},
		explain?: boolean,
		allowDiskUse?: boolean,
		maxTimeMS?: number,
		bypassDocumentValidation?: boolean
	}

	declare export interface CollectionInsertManyOptions {
		w?: number | string,
		wtimeout?: number,
		j?: boolean,
		serializeFunctions?: boolean,
		forceServerObjectId?: boolean,
		bypassDocumentValidation?: boolean,
		ordered?: boolean
	}

	declare export interface CollectionBluckWriteOptions {
		w?: number | string,
		wtimeout?: number,
		j?: boolean,
		serializeFunctions?: boolean,
		ordered?: boolean,
		bypassDocumentValidation?: boolean
	}

	declare export interface BulkWriteOpResultObject {
		insertedCount?: number,
		matchedCount?: number,
		modifiedCount?: number,
		deletedCount?: number,
		upsertedCount?: number,
		insertedIds?: any,
		upsertedIds?: any,
		result?: any
	}

	declare export interface MongoCountPreferences {
		limit?: number,
		skip?: boolean,
		hint?: string,
		readPreference?: ReadPreference | string
	}

	declare export interface DeleteWriteOpResultObject {
		result: {
			ok?: number,
			n?: number
		},
		connection?: any,
		deletedCount?: number
	}

	declare export interface FindAndModifyWriteOpResultObject<TSchema>{
		value?: TSchema,
		lastErrorObject?: any,
		ok?: number
	}

	declare export interface FindOneAndReplaceOption {
		projection?: Object,
		sort?: Object,
		maxTimeMS?: number,
		upsert?: boolean,
		returnOriginal?: boolean
	}

	declare export interface GeoHaystackSearchOptions {
		readPreference?: ReadPreference | string,
		maxDistance?: number,
		search?: Object,
		limit?: number
	}

	declare export interface GeoNearOptions {
		readPreference?: ReadPreference | string,
		num?: number,
		minDistance?: number,
		maxDistance?: number,
		distanceMultiplier?: number,
		query?: Object,
		spherical?: boolean,
		uniqueDocs?: boolean,
		includeLocs?: boolean
	}

	declare export class Code {
		constructor(code: string | Function, scope?: Object): this;
		code: string | Function;
		scope: any;
	}

	declare export interface CollectionOptions {
		w?: number | string,
		wtimeout?: number,
		j?: boolean
	}

	declare export interface OrderedBulkOperation {
		length: number,
		execute(callback: MongoCallback<BulkWriteResult>): void,
		execute(options?: FSyncOptions): Promise<BulkWriteResult>,
		execute(options: FSyncOptions, callback: MongoCallback<BulkWriteResult>): void,
		find(selector: Object): FindOperatorsOrdered,
		insert(doc: Object): OrderedBulkOperation
	}

	declare export interface BulkWriteResult {
		ok: number,
		nInserted: number,
		nUpdated: number,
		nUpserted: number,
		nModified: number,
		nRemoved: number,
		getInsertedIds(): Array<Object>,
		getLastOp(): Object,
		getRawResponse(): Object,
		getUpsertedIdAt(index: number): Object,
		getUpsertedIds(): Array<Object>,
		getWriteConcernError(): WriteConcernError,
		getWriteErrorAt(index: number): WriteError,
		getWriteErrorCount(): number,
		getWriteErrors(): Array<Object>,
		hasWriteErrors(): boolean
	}

	declare export interface WriteError {
		code: number,
		index: number,
		errmsg: string
	}

	declare export interface WriteConcernError {
		code: number,
		errmsg: string
	}

	declare export interface FindOperatorsOrdered {
		delete(): OrderedBulkOperation,
		deleteOne(): OrderedBulkOperation,
		replaceOne(doc: Object): OrderedBulkOperation,
		update(doc: Object): OrderedBulkOperation,
		updateOne(doc: Object): OrderedBulkOperation,
		upsert(): FindOperatorsOrdered
	}

	declare export interface UnorderedBulkOperation {
		length: number,
		execute(callback: MongoCallback<BulkWriteResult>): void,
		execute(options?: FSyncOptions): Promise<BulkWriteResult>,
		execute(options: FSyncOptions, callback: MongoCallback<BulkWriteResult>): void,
		find(selector: Object): FindOperatorsUnordered,
		insert(doc: Object): UnorderedBulkOperation
	}

	declare export interface FindOperatorsUnordered {
		length: number,
		remove(): UnorderedBulkOperation,
		removeOne(): UnorderedBulkOperation,
		replaceOne(doc: Object): UnorderedBulkOperation,
		update(doc: Object): UnorderedBulkOperation,
		updateOne(doc: Object): UnorderedBulkOperation,
		upsert(): FindOperatorsUnordered
	}

	declare export interface FindOneOptions {
		limit?: number,
		sort?: Array<any>| Object,
		fields?: Object,
		skip?: number,
		hint?: Object,
		explain?: boolean,
		snapshot?: boolean,
		timeout?: boolean,
		tailable?: boolean,
		batchSize?: number,
		returnKey?: boolean,
		maxScan?: number,
		min?: number,
		max?: number,
		showDiskLoc?: boolean,
		comment?: string,
		raw?: boolean,
		readPreference?: ReadPreference | string,
		partial?: boolean,
		maxTimeMs?: number
	}

	declare export interface InsertWriteOpResult {
		insertedCount: number,
		ops: Array<any>,
		insertedIds: Array<ObjectID>,
		connection: any,
		result: {
			ok: number,
			n: number
		}
	}

	declare export interface CollectionInsertOneOptions {
		w?: number | string,
		wtimeout?: number,
		j?: boolean,
		serializeFunctions?: boolean,
		forceServerObjectId?: boolean,
		bypassDocumentValidation?: boolean
	}

	declare export interface InsertOneWriteOpResult {
		insertedCount: number,
		ops: Array<any>,
		insertedId: ObjectID,
		connection: any,
		result: {
			ok: number,
			n: number
		}
	}

	declare export interface ParallelCollectionScanOptions {
		readPreference?: ReadPreference | string,
		batchSize?: number,
		numCursors?: number,
		raw?: boolean
	}

	declare export interface ReplaceOneOptions {
		upsert?: boolean,
		w?: number | string,
		wtimeout?: number,
		j?: boolean,
		bypassDocumentValidation?: boolean
	}

	declare export interface UpdateWriteOpResult {
		result: {
			ok: number,
			n: number,
			nModified: number
		},
		connection: any,
		matchedCount: number,
		modifiedCount: number,
		upsertedCount: number,
		upsertedId: {
			_id: ObjectID
		}
	}

	declare export type ReplaceWriteOpResult = {
		ops: Array<any >
	} & UpdateWriteOpResult;

	declare export interface MapReduceOptions {
		readPreference?: ReadPreference | string,
		out?: Object,
		query?: Object,
		sort?: Object,
		limit?: number,
		keeptemp?: boolean,
		finalize?: Function | string,
		scope?: Object,
		jsMode?: boolean,
		verbose?: boolean,
		bypassDocumentValidation?: boolean
	}

	declare export interface WriteOpResult {
		ops: Array<any>,
		connection: any,
		result: any
	}

	declare export type CursorResult = any | void | boolean;

	declare export type Default = any;

	declare export class Cursor<T> extends Readable {
		sortValue: string;
		timeout: boolean;
		readPreference: ReadPreference;
		addCursorFlag(flag: string, value: boolean): Cursor<T>;
		addQueryModifier(name: string, value: boolean): Cursor<T>;
		batchSize(value: number): Cursor<T>;
		clone(): Cursor<T>;
		close(): Promise<CursorResult>;
		close(callback: MongoCallback<CursorResult>): void;
		comment(value: string): Cursor<T>;
		count(callback: MongoCallback<number>): void;
		count(applySkipLimit: boolean, callback: MongoCallback<number>): void;
		count(options: CursorCommentOptions, callback: MongoCallback<number>): void;
		count(
			applySkipLimit: boolean,
			options: CursorCommentOptions,
			callback: MongoCallback<number>): void;
		count(applySkipLimit?: boolean, options?: CursorCommentOptions): Promise<number>;
		explain(): Promise<CursorResult>;
		explain(callback: MongoCallback<CursorResult>): void;
		filter(filter: Object): Cursor<T>;
		forEach(iterator: IteratorCallback<T>, callback: EndCallback): void;
		hasNext(): Promise<boolean>;
		hasNext(callback: MongoCallback<boolean>): void;
		hint(hint: Object): Cursor<T>;
		isClosed(): boolean;
		limit(value: number): Cursor<T>;
		map(transform: Function): Cursor<T>;
		max(max: number): Cursor<T>;
		maxAwaitTimeMS(value: number): Cursor<T>;
		maxScan(maxScan: Object): Cursor<T>;
		maxTimeMS(value: number): Cursor<T>;
		min(min: number): Cursor<T>;
		next(): Promise<T>;
		next(callback: MongoCallback<T>): void;
		project(value: Object): Cursor<T>;
		read(size?: number): ?(string | Buffer);
		returnKey(returnKey: Object): Cursor<T>;
		rewind(): void;
		setCursorOption(field: string, value: Object): Cursor<T>;
		setReadPreference(readPreference: string | ReadPreference): Cursor<T>;
		showRecordId(showRecordId: Object): Cursor<T>;
		skip(value: number): Cursor<T>;
		snapshot(snapshot: Object): Cursor<T>;
		sort(keyOrList: string | Object[] | Object, direction?: number): Cursor<T>;
		stream(options?: {
			transform?: Function
		}): Cursor<T>;
		toArray(): Promise<T[]>;
		toArray(callback: MongoCallback<T[]>): void;
		unshift(stream: Buffer | string): void;
	}

	declare export interface CursorCommentOptions {
		skip?: number,
		limit?: number,
		maxTimeMS?: number,
		hint?: string,
		readPreference?: ReadPreference | string
	}

	declare export interface IteratorCallback<T>{
		(doc: T): void
	}

	declare export interface EndCallback {
		(error: MongoError): void
	}

	declare export type AggregationCursorResult = any | void;

	declare export class AggregationCursor<T> extends Readable {
		batchSize(value: number): AggregationCursor<T>;
		clone(): AggregationCursor<T>;
		close(): Promise<AggregationCursorResult>;
		close(callback: MongoCallback<AggregationCursorResult>): void;
		each(callback: MongoCallback<AggregationCursorResult>): void;
		explain(): Promise<AggregationCursorResult>;
		explain(callback: MongoCallback<AggregationCursorResult>): void;
		geoNear(document: Object): AggregationCursor<T>;
		group(document: Object): AggregationCursor<T>;
		isClosed(): boolean;
		limit(value: number): AggregationCursor<T>;
		match(document: Object): AggregationCursor<T>;
		maxTimeMS(value: number): AggregationCursor<T>;
		next(): Promise<T>;
		next(callback: MongoCallback<T>): void;
		out(destination: string): AggregationCursor<T>;
		project(document: Object): AggregationCursor<T>;
		read(size?: number): ?(string | Buffer);
		redact(document: Object): AggregationCursor<T>;
		rewind(): AggregationCursor<T>;
		skip(value: number): AggregationCursor<T>;
		sort(document: Object): AggregationCursor<T>;
		toArray(): Promise<T[]>;
		toArray(callback: MongoCallback<T[]>): void;
		unshift(stream: Buffer | string): void;
		unwind(field: string): AggregationCursor<T >;
	}

	declare export class CommandCursor extends Readable {
		batchSize(value: number): CommandCursor;
		clone(): CommandCursor;
		close(): Promise<AggregationCursorResult>;
		close(callback: MongoCallback<AggregationCursorResult>): void;
		each(callback: MongoCallback<AggregationCursorResult>): void;
		isClosed(): boolean;
		maxTimeMS(value: number): CommandCursor;
		next(): Promise<AggregationCursorResult>;
		next(callback: MongoCallback<AggregationCursorResult>): void;
		read(size?: number): ?(string | Buffer);
		rewind(): CommandCursor;
		setReadPreference(readPreference: string | ReadPreference): CommandCursor;
		toArray(): Promise<any[]>;
		toArray(callback: MongoCallback<any[]>): void;
		unshift(stream: Buffer | string): void;
	}

	declare export class GridFSBucket {
		constructor(db: Db, options?: GridFSBucketOptions): this;
		delete(id: ObjectID, callback?: GridFSBucketErrorCallback): void;
		drop(callback?: GridFSBucketErrorCallback): void;
		find(filter?: Object, options?: GridFSBucketFindOptions): Cursor<any>;
		openDownloadStream(id: ObjectID, options?: {
			start: number,
			end: number
		}): GridFSBucketReadStream;
		openDownloadStreamByName(
			filename: string,
			options?: {
				revision: number,
				start: number,
				end: number
			}): GridFSBucketReadStream;
		openUploadStream(
			filename: string,
			options?: GridFSBucketOpenUploadStreamOptions): GridFSBucketWriteStream;
		openUploadStreamWithId(
			id: GridFSBucketWriteStreamId,
			filename: string,
			options?: GridFSBucketOpenUploadStreamOptions): GridFSBucketWriteStream;
		rename(id: ObjectID, filename: string, callback?: GridFSBucketErrorCallback): void;
	}

	declare export interface GridFSBucketOptions {
		bucketName?: string,
		chunkSizeBytes?: number,
		writeConcern?: Object,
		ReadPreference?: Object
	}

	declare export interface GridFSBucketErrorCallback {
		(err?: MongoError): void
	}

	declare export interface GridFSBucketFindOptions {
		batchSize?: number,
		limit?: number,
		maxTimeMS?: number,
		noCursorTimeout?: boolean,
		skip?: number,
		sort?: Object
	}

	declare export interface GridFSBucketOpenUploadStreamOptions {
		chunkSizeBytes?: number,
		metadata?: Object,
		contentType?: string,
		aliases?: Array<string>
	}

	declare export class GridFSBucketReadStream extends Readable {
		id: ObjectID;
		constructor(chunks: Collection<any>, files: Collection<any>, readPreference: Object, filter: Object, options?: GridFSBucketReadStreamOptions): this;
	}

	declare export interface GridFSBucketReadStreamOptions {
		sort?: number,
		skip?: number,
		start?: number,
		end?: number
	}

	declare export class GridFSBucketWriteStream extends Writable {
		id: GridFSBucketWriteStreamId;
		constructor(bucket: GridFSBucket, filename: string, options?: GridFSBucketWriteStreamOptions): this;
	}

	declare export interface GridFSBucketWriteStreamOptions {
		id?: GridFSBucketWriteStreamId,
		chunkSizeBytes?: number,
		w?: number,
		wtimeout?: number,
		j?: number
	}

	declare export type GridFSBucketWriteStreamId = string | number | Object | ObjectID;

	declare export function connect (uri: string, options?: MongoClientOptions): Promise<MongoClient>;

	declare export type MongoDB = {
		Admin: Admin,
		// BSONRegExp: BSONRegExp,
		// Binary: Binary,
		// Chunk: Chunk,
		Code: Code,
		// Collection: Collection,
		connect: connect,
		// CoreConnection: CoreConnection,
		// CoreServer: CoreServer,
		// Cursor: Cursor,
		// DBRef: DBRef,
		Db: Db,
		// Decimal128: Decimal128,
		// Double: Double,
		GridFSBucket: GridFSBucket,
		// GridStore: GridStore,
		// instrument: instrument,
		// Int32: Int32,
		// Logger: Logger,
		// Long: Long,
		// Map: Map,
		// MaxKey: MaxKey,
		// MinKey: MinKey,
		MongoClient: MongoClient,
		MongoError: MongoError,
		Mongos: Mongos,
		ObjectID: Class<ObjectID>,
		ObjectId: Class<ObjectID>,
		ReadPreference: ReadPreference,
		ReplSet: ReplSet,
		Server: Server,
		// Symbol: Symbol,
		Timestamp: any
	};

	declare export class Timestamp {
		constructor (a: number, b: number): this;
	}

	declare export default MongoDB
}