const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const estimateController = require("../controllers/estimateController");

/* ===========================
   CUSTOMER ROUTES
=========================== */

// Create estimate
router.post(
  "/create",
  authMiddleware,
  estimateController.createEstimate
);

// View customer's estimates
router.get(
  "/user/:userId",
  authMiddleware,
  estimateController.getUserEstimates
);

// Edit estimate
router.put(
  "/edit/:id",
  authMiddleware,
  estimateController.updateEstimate
);

/* ===========================
   ADMIN ROUTES
=========================== */

// View all estimates
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  estimateController.getAllEstimates
);

// View single estimate
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  estimateController.getEstimateById
);

// Update estimate status
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  estimateController.updateEstimateStatus
);

// Assign contractor
router.put(
  "/:id/assign",
  authMiddleware,
  adminMiddleware,
  estimateController.assignContractor
);

// Delete estimate
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  estimateController.deleteEstimate
);

module.exports = router;