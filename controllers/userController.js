const { Thought, User } = require("../models");

const userController = {
    getAllUsers(req, res) {
        User.find()
        .select("-__v")
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getOneUser(req, res) {
        User.findOne({_id: req.params.userId})
        .select("-__v")
        .populate("friends")
        .populate("thoughts")
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({message: "Invalid user ID."});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    newUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({message: "Invalid user ID."});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({message: "Invalid user ID."});
            }
        })
        .then(() => {
            res.json({message: "Selected user deleted."});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$adToSet: {friens: req.params.friendId}},
            {new: true}
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({message: "Invalid user ID."});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({message: "Invalid user ID."});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = userController;