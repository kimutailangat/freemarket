const prisma = require("../prisma");

// Save a message
const saveMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const message = await prisma.message.create({
      data: { senderId, receiverId, content },
    });
    res.status(201).json({ message: "Message saved successfully", message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving message." });
  }
};

// Get messages between two users
const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: parseInt(senderId, 10), receiverId: parseInt(receiverId, 10) },
          { senderId: parseInt(receiverId, 10), receiverId: parseInt(senderId, 10) },
        ],
      },
      orderBy: { timestamp: "asc" },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching messages." });
  }
};

module.exports = { saveMessage, getMessages };
