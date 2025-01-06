const prisma = require("../prisma");

// Get platform revenue and analytics
const getPlatformAnalytics = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();
    const totalRevenue = transactions.reduce((sum, tx) => sum + tx.platformFee, 0);

    const analytics = {
      totalUsers: await prisma.user.count(),
      totalTransactions: transactions.length,
      totalRevenue,
    };

    res.status(200).json(analytics);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Failed to fetch analytics." });
  }
};

module.exports = { getPlatformAnalytics };
