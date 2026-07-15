const express = require("express");

const router = express.Router();

const estimateController = require("../controllers/estimateController");

/* ===========================
   ADMIN
=========================== */

// Get all estimates
router.get(
  "/",
  estimateController.getAllEstimates
);

// Get one estimate
router.get(
  "/:id",
  estimateController.getEstimateById
);

// Update estimate status
router.put(
  "/:id/status",
  estimateController.updateEstimateStatus
);

// Assign contractor
router.put(
  "/:id/assign",
  estimateController.assignContractor
);

// Delete estimate
router.delete(
  "/:id",
  estimateController.deleteEstimate
);

/* ===========================
   CUSTOMER
=========================== */

// Create estimate
router.post(
  "/create",
  estimateController.createEstimate
);

// Customer dashboard
router.get(
  "/user/:userId",
  estimateController.getUserEstimates
);

// Edit estimate
router.put(
  "/edit/:id",
  estimateController.updateEstimate
);

module.exports = router;