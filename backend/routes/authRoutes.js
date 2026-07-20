const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

/* ===========================
   PUBLIC AUTH ROUTES
=========================== */

router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;