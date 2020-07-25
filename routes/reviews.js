const express = require("express");
//mergeParams=true because we are rerouting from another router: bootcamp
const router = express.Router({ mergeParams: true });

const { getReviews, getReview, addReview, updateReview, deleteReview } = require("../controllers/reviews");

//Model
const Review = require("../models/Review");

//Protect middleware
const { protect, authorize } = require("../middlewares/auth");
//advanced results middleware
const advancedResults = require("../middlewares/advancedResults");

router.route("/").get(
  advancedResults(Review, {
    path: "bootcamp",
    select: "name description",
  }),
  getReviews
).post(protect, authorize('user', 'admin'), addReview);

router.route("/:id").get(getReview)
    .put(protect, authorize("user", "admin"), updateReview)
    .delete(protect, authorize("user", "admin"), deleteReview);

module.exports = router;
