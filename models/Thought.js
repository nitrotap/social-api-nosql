const { Schema, Types, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
	{
		// set custom id to avoid confusion with parent Thought _id
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId()
		},
		reactionBody: {
			type: String,
			required: true,
			maxlength: 280
		},
		username: {
			type: String,
			required: true,
			trim: true
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: createdAtVal => dateFormat(createdAtVal)
		}
	},
	{
		toJSON: {
			getters: true,
			virtuals: true
		}
	}
);


const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 280
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: createdAtVal => dateFormat(createdAtVal)
		},
		username: {
			type: String,
			required: true,

		},
		reactions: [ReactionSchema]
	},
	{
		toJSON: {
			virtuals: true,
			getters: true
		},
		// prevents virtuals from creating duplicate of _id as `id`
		id: false
	}
);

// ThoughtSchema.virtual('replyCount').get(function () {
// 	return this.replies.length;
// });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
