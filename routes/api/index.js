const router = require("express").Router();
const uRoutes = require("./userRoutes");
const tRoutes = require("./thoughtRoutes");

router.use("/users", uRoutes);
router.use("/thoughts", tRoutes);

module.exports = router;