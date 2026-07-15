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

    return res.status(201).json({
      success: true,
      message: "Estimate submitted successfully.",
      estimate
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to submit estimate."
    });

  }

};

/* ===========================
   GET ALL ESTIMATES
=========================== */

exports.getAllEstimates = async (req, res) => {

  try {

    const estimates = await estimateModel.getAllEstimates();

    return res.json({
      success: true,
      estimates
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to load estimates."
    });

  }

};

/* ===========================
   GET USER ESTIMATES
=========================== */

exports.getUserEstimates = async (req, res) => {

  try {

    const userId = req.params.userId;

    const estimates =
      await estimateModel.getUserEstimates(userId);

    return res.json({
      success: true,
      estimates
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to load estimates."
    });

  }

};

/* ===========================
   UPDATE ESTIMATE
=========================== */

exports.updateEstimate = async (req, res) => {

  try {

    const id = req.params.id;

    const {
      projectType,
      description,
      budget,
      address
    } = req.body;

    const estimate =
      await estimateModel.updateEstimate(
        id,
        projectType,
        description,
        budget,
        address
      );

    return res.json({
      success: true,
      message: "Estimate updated successfully.",
      estimate
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to update estimate."
    });

  }

};

/* ===========================
   ASSIGN CONTRACTOR
=========================== */

exports.assignContractor = async (req, res) => {

  try {

    const {
      estimateId,
      contractorId
    } = req.body;

    const estimate =
      await estimateModel.assignContractor(
        estimateId,
        contractorId
      );

    return res.json({
      success: true,
      message: "Contractor assigned successfully.",
      estimate
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to assign contractor."
    });

  }

};

/* ===========================
   DELETE ESTIMATE
=========================== */

exports.deleteEstimate = async (req, res) => {

  try {

    const id = req.params.id;

    await estimateModel.deleteEstimate(id);

    return res.json({
      success: true,
      message: "Estimate deleted successfully."
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to delete estimate."
    });

  }

};