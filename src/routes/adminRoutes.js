const express = require("express");
const { getAllUsers, updateUserAvailability, deleteUser } = require("../controllers/adminController");

const router = express.Router();

// Admin: Get all users
router.get("/users", getAllUsers);

// Admin: Update user availability
router.put("/users/availability", updateUserAvailability);

// Admin: Delete a user
router.delete("/users/:userId", deleteUser);

module.exports = router;
