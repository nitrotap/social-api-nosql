const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
	{
		// set custom id to avoid confusion with parent comment _id
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

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;
