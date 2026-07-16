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
   ADD CONTRACTOR
=========================== */

router.post(
  "/",
  contractorController.addContractor
);

/* ===========================
   UPDATE CONTRACTOR STATUS
=========================== */

router.put(
  "/:id/status",
  contractorController.updateContractorStatus
);

/* ===========================
   GET SINGLE CONTRACTOR
=========================== */

router.get(
  "/:id",
  contractorController.getContractorById
);

/* ===========================
   GET CONTRACTOR JOBS
=========================== */

router.get(
  "/jobs/:contractorId",
  contractorController.getContractorJobs
);

/* ===========================
   DELETE CONTRACTOR
=========================== */

router.delete(
  "/:id",
  contractorController.deleteContractor
);

module.exports = router;