const contractorModel = require("../models/contractorModel");

/* ===========================
   PUBLIC CONTRACTORS
=========================== */

exports.getContractors = async (req, res) => {

  try {

    const contractors =
      await contractorModel.getContractors();

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
   ADMIN - GET ALL CONTRACTORS
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
   GET CONTRACTOR BY ID
=========================== */

exports.getContractorById = async (req, res) => {

  try {

    const contractor =
      await contractorModel.getContractorById(
        req.params.id
      );

    if (!contractor) {

      return res.status(404).json({

        success: false,

        message: "Contractor not found."

      });

    }

    return res.json({

      success: true,

      contractor

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Unable to load contractor."

    });

  }

};

/* ===========================
   GET CONTRACTOR JOBS
=========================== */

exports.getContractorJobs = async (req, res) => {

  try {

    const jobs =
      await contractorModel.getContractorJobs(
        req.params.contractorId
      );

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

/* ===========================
   UPDATE CONTRACTOR STATUS
=========================== */

exports.updateContractorStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const contractor =
      await contractorModel.updateContractorStatus(

        req.params.id,

        status

      );

    return res.json({

      success: true,

      message: "Contractor updated successfully.",

      contractor

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Unable to update contractor."

    });

  }

};

/* ===========================
   DELETE CONTRACTOR
=========================== */

exports.deleteContractor = async (req, res) => {

  try {

    await contractorModel.deleteContractor(
      req.params.id
    );

    return res.json({

      success: true,

      message: "Contractor deleted successfully."

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Unable to delete contractor."

    });

  }

};