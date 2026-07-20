const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const verifyAdmin = require("../middleware/verifyAdmin");

/* ===========================
   ADMIN USER ROUTES
=========================== */

// Get all users
router.get(
  "/users",
  verifyAdmin,
  adminController.getAllUsers
);

// Get a single user
router.get(
  "/users/:id",
  verifyAdmin,
  adminController.getUserById
);

// Delete a user
router.delete(
  "/users/:id",
  verifyAdmin,
  adminController.deleteUser
);

module.exports = router;