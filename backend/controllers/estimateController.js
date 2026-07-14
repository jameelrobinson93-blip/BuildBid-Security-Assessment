const estimateModel = require("../models/estimateModel");

/* ===========================
   CREATE ESTIMATE
=========================== */

exports.createEstimate = async (req, res) => {
  try {

    const {
      userId,
      projectType,
      description,
      budget,
      address
    } = req.body;

    console.log("");
    console.log("========== CREATE ESTIMATE ==========");
    console.table(req.body);

    if (
      !userId ||
      !projectType ||
      !description ||
      !budget ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all fields."
      });
    }

    const estimate = await estimateModel.createEstimate(
      userId,
      projectType,
      description,
      budget,
      address
    );

    console.log("✅ ESTIMATE CREATED");
    console.table([estimate]);

    return res.status(201).json({
      success: true,
      message: "Estimate submitted successfully!",
      estimate
    });

  } catch (err) {

    console.log("");
    console.log("========== CREATE ESTIMATE ERROR ==========");
    console.error(err);
    console.log("");

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

/* ===========================
   GET USER ESTIMATES
=========================== */

exports.getUserEstimates = async (req, res) => {
  try {

    const { userId } = req.params;

    console.log("");
    console.log("========== GET ESTIMATES ==========");
    console.log("User ID:", userId);

    const estimates = await estimateModel.getUserEstimates(userId);

    console.log("Estimates Found:", estimates.length);

    return res.status(200).json({
      success: true,
      estimates
    });

  } catch (err) {

    console.log("");
    console.log("========== GET ESTIMATES ERROR ==========");
    console.error(err);
    console.log("");

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
};