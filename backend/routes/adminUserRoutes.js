const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

/* ===========================
   USERS
=========================== */

// Get all users
router.get(
  "/users",
  adminController.getAllUsers
);

// Delete a user
router.delete(
  "/users/:id",
  adminController.deleteUser
);

module.exports = router;