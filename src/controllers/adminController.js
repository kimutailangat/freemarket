const prisma = require("../prisma");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, isAvailable: true },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Update user availability (e.g., brokers)
const updateUserAvailability = async (req, res) => {
  const { userId, isAvailable } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isAvailable },
    });
    res.status(200).json({ message: "User availability updated.", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user." });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(userId, 10) } });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user." });
  }
};

module.exports = { getAllUsers, updateUserAvailability, deleteUser };
