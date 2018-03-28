// @flow
import mongoose from 'mongoose';

const {Schema} = mongoose;

export default new Schema ({

	x: Number,
	y: Number,
	z: Number,

	content: String,

	created: {
		type: Date,
		default: Date.now
	}

});
