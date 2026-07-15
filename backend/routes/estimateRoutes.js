const express = require("express");

const router = express.Router();

const estimateController = require("../controllers/estimateController");

/* ===========================
   CREATE ESTIMATE
=========================== */

router.post(
  "/",
  estimateController.createEstimate
);

/* ===========================
   GET ALL ESTIMATES
=========================== */

router.get(
  "/",
  estimateController.getAllEstimates
);

/* ===========================
   GET USER ESTIMATES
=========================== */

router.get(
  "/user/:userId",
  estimateController.getUserEstimates
);

/* ===========================
   ASSIGN CONTRACTOR
=========================== */

router.put(
  "/assign",
  estimateController.assignContractor
);

/* ===========================
   UPDATE ESTIMATE
=========================== */

router.put(
  "/:id",
  estimateController.updateEstimate
);

/* ===========================
   DELETE ESTIMATE
=========================== */

router.delete(
  "/:id",
  estimateController.deleteEstimate
);

module.exports = router;