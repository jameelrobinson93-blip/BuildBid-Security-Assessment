const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const securityLog = require("../models/securityLogModel");

/* ===========================
   GET SECURITY LOGS
=========================== */

router.get(
  "/logs",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {

      const logs = await securityLog.getLogs();

      return res.json({
        success: true,
        logs,
      });

    } catch (err) {

      console.error("Security Logs:", err);

      return res.status(500).json({
        success: false,
        message: "Unable to load security logs.",
      });

    }
  }
);

module.exports = router;