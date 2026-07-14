const express = require("express");
const router = express.Router();

const estimateController = require("../controllers/estimateController");

// Create Estimate
router.post("/", estimateController.createEstimate);

// Get Estimates for a User
router.get("/:userId", estimateController.getUserEstimates);

module.exports = router;