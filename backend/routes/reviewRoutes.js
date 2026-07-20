const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const reviewController = require("../controllers/reviewController");

/* ===========================
   PUBLIC ROUTES
=========================== */

// View reviews
router.get(
  "/",
  reviewController.getReviews
);

/* ===========================
   AUTHENTICATED ROUTES
=========================== */

// Submit a review
router.post(
  "/",
  authMiddleware,
  reviewController.addReview
);

module.exports = router;