const express = require("express");
const router = express.Router();

const securityLog = require("../models/securityLogModel");

router.get("/logs", (req, res) => {

    securityLog.getLogs((err, rows) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);

    });

});

module.exports = router;