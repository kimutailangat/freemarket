const express = require("express");
const { getAvailableBrokers, assignBroker } = require("../controllers/brokerController");

const router = express.Router();

// Get available brokers
router.get("/", getAvailableBrokers);

// Assign a broker
router.post("/assign", assignBroker);

module.exports = router;
