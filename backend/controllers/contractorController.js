const contractorModel = require("../models/contractorModel");

/* ===========================
   GET ALL CONTRACTORS
=========================== */

exports.getAllContractors = async (req, res) => {

  try {

    const contractors =
      await contractorModel.getAllContractors();

    return res.json({
      success: true,
      contractors
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to load contractors."
    });

  }

};

/* ===========================
   GET CONTRACTOR JOBS
=========================== */

exports.getContractorJobs = async (req, res) => {

  try {

    const contractorId = req.params.contractorId;

    const jobs =
      await contractorModel.getContractorJobs(contractorId);

    return res.json({
      success: true,
      jobs
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to load contractor jobs."
    });

  }

};