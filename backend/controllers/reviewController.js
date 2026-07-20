const reviewModel = require("../models/reviewModel");
const securityLog = require("../models/securityLogModel");

/* ===========================
   XSS DETECTION
=========================== */

const XSS_PATTERN =
  /<script|javascript:|onerror=|onload=|<iframe|<img|<svg|<object|<embed|<link|<style/i;

/* ===========================
   ADD REVIEW
=========================== */

exports.addReview = async (req, res) => {
  try {
    let { name, rating, comment } = req.body;

    name = name?.trim();
    comment = comment?.trim();
    rating = Number(rating);

    if (!name || !comment || Number.isNaN(rating)) {
      return res.status(400).json({
        success: false,
        message: "Please complete all fields.",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    if (XSS_PATTERN.test(comment)) {
      await securityLog.logEvent(
        name,
        "XSS_BLOCKED",
        req.ip
      );

      return res.status(400).json({
        success: false,
        message: "Potential malicious content detected. Review rejected.",
      });
    }

    const review = await reviewModel.createReview(
      name,
      rating,
      comment
    );

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      review,
    });

  } catch (err) {

    console.error("Add Review:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to save review.",
    });

  }
};

/* ===========================
   GET REVIEWS
=========================== */

exports.getReviews = async (req, res) => {
  try {

    const reviews = await reviewModel.getReviews();

    return res.json({
      success: true,
      reviews,
    });

  } catch (err) {

    console.error("Get Reviews:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to load reviews.",
    });

  }
};