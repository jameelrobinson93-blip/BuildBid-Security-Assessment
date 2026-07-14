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
   GET USER ESTIMATES
=========================== */

router.get(
  "/:userId",
  estimateController.getUserEstimates
);

/* ===========================
   UPDATE ESTIMATE
=========================== */

router.put(
  "/:id",
  estimateController.updateEstimate
);

module.exports = router;