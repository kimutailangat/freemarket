const prisma = require("../prisma");

// Get all available brokers
const getAvailableBrokers = async (req, res) => {
  try {
    const brokers = await prisma.user.findMany({
      where: { role: "broker", isAvailable: true },
      select: {
        id: true,
        name: true,
        email: true,
        specialization: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    // Calculate average rating for each broker
    const brokersWithRatings = brokers.map((broker) => {
      const averageRating =
        broker.reviews.reduce((sum, review) => sum + review.rating, 0) /
        (broker.reviews.length || 1);
      return { ...broker, averageRating };
    });

    res.status(200).json(brokersWithRatings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching brokers." });
  }
};

// Assign a broker to a buyer
const assignBroker = async (req, res) => {
  const { buyerId, brokerId } = req.body;
  try {
    const broker = await prisma.user.findUnique({ where: { id: brokerId } });
    if (!broker || broker.role !== "broker" || !broker.isAvailable) {
      return res.status(400).json({ error: "Broker is not available." });
    }

    // Mark broker as unavailable and assign to buyer
    await prisma.user.update({
      where: { id: brokerId },
      data: { isAvailable: false },
    });

    res.status(200).json({ message: "Broker assigned successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error assigning broker." });
  }
};

module.exports = { getAvailableBrokers, assignBroker };
