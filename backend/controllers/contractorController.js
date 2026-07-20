const contractorModel = require("../models/contractorModel");

/* ===========================
   GET PUBLIC CONTRACTORS
=========================== */

exports.getContractors = async (req, res) => {
  try {
    const contractors = await contractorModel.getContractors();

    return res.json({
      success: true,
      contractors,
    });

  } catch (err) {

    console.error("Get Contractors:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to load contractors.",
    });

  }
};

/* ===========================
   ADMIN GET ALL CONTRACTORS
=========================== */

exports.getAllContractors = async (req, res) => {
  try {
    const contractors = await contractorModel.getAllContractors();

    return res.json({
      success: true,
      contractors,
    });

  } catch (err) {

    console.error("Get All Contractors:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to load contractors.",
    });

  }
};

/* ===========================
   GET CONTRACTOR BY ID
=========================== */

exports.getContractorById = async (req, res) => {
  try {
    const contractor = await contractorModel.getContractorById(
      req.params.id
    );

    if (!contractor) {
      return res.status(404).json({
        success: false,
        message: "Contractor not found.",
      });
    }

    return res.json({
      success: true,
      contractor,
    });

  } catch (err) {

    console.error("Get Contractor:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to load contractor.",
    });

  }
};

/* ===========================
   GET CONTRACTOR JOBS
=========================== */

exports.getContractorJobs = async (req, res) => {
  try {
    const jobs = await contractorModel.getContractorJobs(
      req.params.contractorId
    );

    return res.json({
      success: true,
      jobs,
    });

  } catch (err) {

    console.error("Get Contractor Jobs:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to load contractor jobs.",
    });

  }
};

/* ===========================
   ADD CONTRACTOR
=========================== */

exports.addContractor = async (req, res) => {
  try {

    const {
      company,
      specialty,
      city,
      phone
    } = req.body;

    if (!company || !specialty || !city || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields.",
      });
    }

    const contractor = await contractorModel.addContractor({
      company,
      specialty,
      city,
      phone,
    });

    return res.status(201).json({
      success: true,
      message: "Contractor added successfully.",
      contractor,
    });

  } catch (err) {

    console.error("Add Contractor:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to add contractor.",
    });

  }
};

/* ===========================
   UPDATE CONTRACTOR STATUS
=========================== */

exports.updateContractorStatus = async (req, res) => {
  try {

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    const contractor =
      await contractorModel.updateContractorStatus(
        req.params.id,
        status
      );

    if (!contractor) {
      return res.status(404).json({
        success: false,
        message: "Contractor not found.",
      });
    }

    return res.json({
      success: true,
      message: "Contractor updated successfully.",
      contractor,
    });

  } catch (err) {

    console.error("Update Contractor:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to update contractor.",
    });

  }
};

/* ===========================
   DELETE CONTRACTOR
=========================== */

exports.deleteContractor = async (req, res) => {
  try {

    const deleted = await contractorModel.deleteContractor(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Contractor not found.",
      });
    }

    return res.json({
      success: true,
      message: "Contractor deleted successfully.",
    });

  } catch (err) {

    console.error("Delete Contractor:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to delete contractor.",
    });

  }
};