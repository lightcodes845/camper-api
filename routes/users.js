const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

//Model
const User = require("../models/User");

//Protect middleware
const { protect, authorize } = require("../middlewares/auth");
//advanced results middleware
const advancedResults = require("../middlewares/advancedResults");

router.use(protect);
router.use(authorize("admin"));

router.route("/").get(advancedResults(User), getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
