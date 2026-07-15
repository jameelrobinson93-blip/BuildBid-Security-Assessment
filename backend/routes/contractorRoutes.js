const express = require("express");

const router = express.Router();

const contractorController = require("../controllers/contractorController");

/* ===========================
   GET ALL CONTRACTORS
=========================== */

router.get(
  "/",
  contractorController.getAllContractors
);

/* ===========================
   GET CONTRACTOR JOBS
=========================== */

router.get(
  "/jobs/:contractorId",
  contractorController.getContractorJobs
);

module.exports = router;