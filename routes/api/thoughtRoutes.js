const router = require("express").Router();

const {
    getAllThoughts,
    getOneThought,
    newThought,
    updateThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts).post(newThought);

router.route("/:thoughtId").get(getOneThought).put(updateThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;