const { Thought, User } = require("../models");

const thController = {
    getAllThoughts(req, res) {
        Thought.find()
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "Invalid thought ID."});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    newThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: dbThoughtData._id}},
                {new: true}
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({message: "Thought was successfully created, but user ID is invalid."})
            }
            res.json({message: "Thought successfully created."})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateThought(req, res) {
        Thought.findOneUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true}
            )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: "Invalid thought ID."});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    addReaction(req, res) {
        Thought.findOneUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: {reactions: req.body} },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: "Invalid thought ID."});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteReaction(req, res) {
        Thought.findOneUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: {reactionId: req.params.reactionId}}},
            { runValidators: true, new: true}
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: "Invalid thought ID."});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = thController;