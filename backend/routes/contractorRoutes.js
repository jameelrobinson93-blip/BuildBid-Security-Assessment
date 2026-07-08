const express = require("express");
const router = express.Router();

const contractorController = require("../controllers/contractorController");

router.get("/", contractorController.getContractors);

module.exports = router;