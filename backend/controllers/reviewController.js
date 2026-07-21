const reviewModel = require("../models/reviewModel");
const securityLog = require("../models/securityLogModel");

/* =====================================================
   XSS DETECTION
===================================================== */

const XSS_PATTERN =
  /<script|javascript:|onerror=|onload=|<iframe|<img|<svg|<object|<embed|<link|<style/i;

/* =====================================================
   ADD REVIEW
===================================================== */

exports.addReview = async (req, res) => {
  try {

    const name = `${req.user.first_name} ${req.user.last_name}`;

    let { rating, comment } = req.body;

    comment = comment?.trim();
    rating = Number(rating);

    if (!comment || Number.isNaN(rating)) {
      return res.status(400).json({
        success: false,
        message: "Please complete all fields."
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5."
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
        message:
          "Potential malicious content detected. Review rejected."
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
      review
    });

  } catch (err) {

    console.error("Add Review Error:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to save review."
    });

  }
};

/* =====================================================
   GET REVIEWS
===================================================== */

exports.getReviews = async (req, res) => {

  try {

    const reviews = await reviewModel.getReviews();

    return res.json(reviews);

  } catch (err) {

    console.error("Get Reviews Error:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to load reviews."
    });

  }

};