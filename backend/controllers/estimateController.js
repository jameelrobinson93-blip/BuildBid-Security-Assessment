const estimateModel = require("../models/estimateModel");

/* ===========================
   GET ALL ESTIMATES
=========================== */

exports.getAllEstimates = async (req, res) => {

  try {

    const estimates =
      await estimateModel.getAllEstimates();

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
   GET ESTIMATE BY ID
=========================== */

exports.getEstimateById = async (req, res) => {

  try {

    const estimate =
      await estimateModel.getEstimateById(
        req.params.id
      );

    if (!estimate) {

      return res.status(404).json({

        success: false,

        message: "Estimate not found."

      });

    }

    return res.json({

      success: true,

      estimate

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Unable to load estimate."

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

      address

    } = req.body;

    const estimate =
      await estimateModel.createEstimate(

        userId,

        projectType,

        description,

        budget,

        address

      );

    return res.status(201).json({

      success: true,

      estimate

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Unable to create estimate."

    });

  }

};

/* ===========================
   GET USER ESTIMATES
=========================== */

exports.getUserEstimates = async (req, res) => {

  try {

    const estimates =
      await estimateModel.getUserEstimates(
        req.params.userId
      );

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

    const estimate =
      await estimateModel.updateEstimate(

        req.params.id,

        req.body.projectType,

        req.body.description,

        req.body.budget,

        req.body.address

      );

    return res.json({

      success: true,

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
   UPDATE STATUS
=========================== */

exports.updateEstimateStatus = async (req, res) => {

  try {

    const estimate =
      await estimateModel.updateEstimateStatus(

        req.params.id,

        req.body.status

      );

    return res.json({

      success: true,

      estimate

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Unable to update status."

    });

  }

};

/* ===========================
   ASSIGN CONTRACTOR
=========================== */

exports.assignContractor = async (req, res) => {

  try {

    const estimate =
      await estimateModel.assignContractor(

        req.params.id,

        req.body.contractorId

      );

    return res.json({

      success: true,

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

    await estimateModel.deleteEstimate(
      req.params.id
    );

    return res.json({

      success: true,

      message: "Estimate deleted."

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Unable to delete estimate."

    });

  }

};