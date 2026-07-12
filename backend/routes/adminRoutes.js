const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");
const verifyAdmin = require("../middleware/verifyAdmin");

router.get(
  "/overview",
  verifyAdmin,
  adminController.getOverview
);

router.get(
  "/security-events",
  verifyAdmin,
  adminController.getSecurityEvents
);

module.exports = router;