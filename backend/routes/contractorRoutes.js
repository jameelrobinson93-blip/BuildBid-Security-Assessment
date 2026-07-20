const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const contractorController = require("../controllers/contractorController");

/* ===========================
   PUBLIC ROUTES
=========================== */

// View all contractors
router.get(
  "/",
  contractorController.getContractors
);

// View a single contractor
router.get(
  "/:id",
  contractorController.getContractorById
);

// View contractor jobs
router.get(
  "/jobs/:contractorId",
  contractorController.getContractorJobs
);

/* ===========================
   ADMIN ROUTES
=========================== */

// Add contractor
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  contractorController.addContractor
);

// Update contractor status
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  contractorController.updateContractorStatus
);

// Delete contractor
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  contractorController.deleteContractor
);

module.exports = router;