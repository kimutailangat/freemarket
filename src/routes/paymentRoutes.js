const express = require("express");
const { handlePayment, disburseFunds } = require("../controllers/paymentController");

const router = express.Router();

// Payment initiation
router.post("/initiate", handlePayment);

// Disbursement
router.post("/disburse", disburseFunds);

module.exports = router;
