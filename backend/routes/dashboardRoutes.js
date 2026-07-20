const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const dashboardController = require("../controllers/dashboardController");

/* ===========================
   ADMIN DASHBOARD
=========================== */

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  dashboardController.getDashboardStats
);

module.exports = router;