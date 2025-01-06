const express = require("express");
const { getPlatformAnalytics } = require("../controllers/analyticsController");

const router = express.Router();

// Admin: Get platform analytics
router.get("/", getPlatformAnalytics);

module.exports = router;
