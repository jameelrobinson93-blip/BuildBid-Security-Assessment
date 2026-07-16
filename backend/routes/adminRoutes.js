const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");
const verifyAdmin = require("../middleware/verifyAdmin");

/* ===========================
   USERS
=========================== */

router.get(
  "/users",
  verifyAdmin,
  adminController.getAllUsers
);

router.get(
  "/users/:id",
  verifyAdmin,
  adminController.getUserById
);

router.delete(
  "/users/:id",
  verifyAdmin,
  adminController.deleteUser
);

module.exports = router;