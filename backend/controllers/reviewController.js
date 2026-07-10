const reviewModel = require("../models/reviewModel");
const securityLog = require("../models/securityLogModel");

// Add Review
exports.addReview = (req, res) => {

  const { name, rating, comment } = req.body;

  if (!name || !rating || !comment) {
    return res.status(400).json({
      success: false,
      message: "Please complete all fields."
    });
  }

  // Basic XSS detection
  const xssPattern = /<script|javascript:|onerror=|onload=|<iframe|<img/i;

  if (xssPattern.test(comment)) {

    console.log("");
    console.log("🚨 XSS ATTEMPT DETECTED 🚨");
    console.log("User:", name);
    console.log("Comment:", comment);
    console.log("==========================");

    securityLog.logEvent(
      name,
      "XSS_BLOCKED",
      req.ip,
      () => {}
    );

    return res.status(400).json({
      success: false,
      message: "Potential malicious content detected. Review rejected."
    });

  }

  reviewModel.createReview(
    name,
    rating,
    comment,
    (err) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: "Unable to save review."
        });

      }

      res.json({
        success: true,
        message: "Review submitted."
      });

    }
  );

};

// Get Reviews
exports.getReviews = (req, res) => {

  reviewModel.getReviews((err, rows) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);

  });

};