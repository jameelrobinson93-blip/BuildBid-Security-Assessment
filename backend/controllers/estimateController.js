const estimateModel = require("../models/estimateModel");

/* ===========================
   GET ALL ESTIMATES
=========================== */

exports.getAllEstimates = async (req, res) => {
  try {
    const estimates = await estimateModel.getAllEstimates();

    return res.json({
      success: true,
      estimates,
    });

  } catch (err) {

    console.error("Get Estimates:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to load estimates.",
    });

  }
};

/* ===========================
   GET ESTIMATE BY ID
=========================== */

exports.getEstimateById = async (req, res) => {
  try {

    const estimate = await estimateModel.getEstimateById(
      req.params.id
    );

    if (!estimate) {
      return res.status(404).json({
        success: false,
        message: "Estimate not found.",
      });
    }

    return res.json({
      success: true,
      estimate,
    });

  } catch (err) {

    console.error("Get Estimate:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to load estimate.",
    });

  }
};

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
      address,
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
        message: "Please complete all required fields.",
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
      message: "Estimate created successfully.",
      estimate,
    });

  } catch (err) {

    console.error("Create Estimate:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to create estimate.",
    });

  }
};

/* ===========================
   GET USER ESTIMATES
=========================== */

exports.getUserEstimates = async (req, res) => {
  try {

    const estimates = await estimateModel.getUserEstimates(
      req.params.userId
    );

    return res.json({
      success: true,
      estimates,
    });

  } catch (err) {

    console.error("Get User Estimates:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to load estimates.",
    });

  }
};

/* ===========================
   UPDATE ESTIMATE
=========================== */

exports.updateEstimate = async (req, res) => {
  try {

    const {
      projectType,
      description,
      budget,
      address,
    } = req.body;

    const estimate = await estimateModel.updateEstimate(
      req.params.id,
      projectType,
      description,
      budget,
      address
    );

    if (!estimate) {
      return res.status(404).json({
        success: false,
        message: "Estimate not found.",
      });
    }

    return res.json({
      success: true,
      message: "Estimate updated successfully.",
      estimate,
    });

  } catch (err) {

    console.error("Update Estimate:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to update estimate.",
    });

  }
};

/* ===========================
   UPDATE STATUS
=========================== */

exports.updateEstimateStatus = async (req, res) => {
  try {

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    const estimate = await estimateModel.updateEstimateStatus(
      req.params.id,
      status
    );

    if (!estimate) {
      return res.status(404).json({
        success: false,
        message: "Estimate not found.",
      });
    }

    return res.json({
      success: true,
      message: "Status updated successfully.",
      estimate,
    });

  } catch (err) {

    console.error("Update Estimate Status:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to update status.",
    });

  }
};

/* ===========================
   ASSIGN CONTRACTOR
=========================== */

exports.assignContractor = async (req, res) => {
  try {

    const { contractorId } = req.body;

    if (!contractorId) {
      return res.status(400).json({
        success: false,
        message: "Contractor is required.",
      });
    }

    const estimate = await estimateModel.assignContractor(
      req.params.id,
      contractorId
    );

    if (!estimate) {
      return res.status(404).json({
        success: false,
        message: "Estimate not found.",
      });
    }

    return res.json({
      success: true,
      message: "Contractor assigned successfully.",
      estimate,
    });

  } catch (err) {

    console.error("Assign Contractor:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to assign contractor.",
    });

  }
};

/* ===========================
   DELETE ESTIMATE
=========================== */

exports.deleteEstimate = async (req, res) => {
  try {

    const deleted = await estimateModel.deleteEstimate(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Estimate not found.",
      });
    }

    return res.json({
      success: true,
      message: "Estimate deleted successfully.",
    });

  } catch (err) {

    console.error("Delete Estimate:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to delete estimate.",
    });

  }
};