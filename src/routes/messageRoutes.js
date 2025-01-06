const express = require("express");
const { saveMessage, getMessages } = require("../controllers/messageController");

const router = express.Router();

router.post("/", saveMessage); // Save a message
router.get("/:senderId/:receiverId", getMessages); // Get messages between two users

module.exports = router;
