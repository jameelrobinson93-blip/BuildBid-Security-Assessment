const express = require("express");

const router = express.Router();

const securityLog = require("../models/securityLogModel");

/* ===========================
   GET SECURITY LOGS
=========================== */

router.get("/logs", async (req, res) => {

  try {

    const logs = await securityLog.getLogs();

    res.json({

      success: true,

      logs

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      success: false,

      message: "Unable to load security logs."

    });

  }

});

module.exports = router;