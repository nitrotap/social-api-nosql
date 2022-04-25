const { Thought, User } = require('../models');

const ThoughtController = {

	getAllThought(req, res) {
		Thought.find({})
			.select('-__v')
			.sort({ _id: -1 })
			.then(dbThoughtData => res.json(dbThoughtData))
			.catch(err => {
				console.log(err);
				res.sendStatus(400);
			});
	},
	// add Thought to User
	addThought({ params, body }, res) {
		console.log(params);
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.UserId },
					{ $push: { Thoughts: _id } },
					{ new: true }
				);
			})
			.then(dbUserData => {
				console.log(dbUserData);
				if (!dbUserData) {
					res.status(404).json({ message: 'No User found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.json(err));
	},

	// add Reaction to Thought
	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.ThoughtId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
		)
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No User found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.json(err));
	},

	// remove Thought
	removeThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.ThoughtId })
			.then(deletedThought => {
				if (!deletedThought) {
					return res.status(404).json({ message: 'No Thought with this id!' });
				}
				return User.findOneAndUpdate(
					{ _id: params.UserId },
					{ $pull: { Thoughts: params.ThoughtId } },
					{ new: true }
				);
			})
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No User found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.json(err));
	},
	// remove Reaction
	removeReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.ThoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then(dbUserData => res.json(dbUserData))
			.catch(err => res.json(err));
	}
};

module.exports = ThoughtController;
