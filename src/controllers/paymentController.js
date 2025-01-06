const { initiatePayment, disbursePayment } = require("../services/mpesaService");

// Handle payment initiation
const handlePayment = async (req, res) => {
  const { buyerPhoneNumber, amount, accountReference } = req.body;

  try {
    const paymentResponse = await initiatePayment({ phoneNumber: buyerPhoneNumber, amount, accountReference });
    res.status(200).json({ message: "Payment initiated successfully", paymentResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Disburse funds to seller and broker
const disburseFunds = async (req, res) => {
  const { sellerPhoneNumber, brokerPhoneNumber, totalAmount } = req.body;
  const platformFee = 0.05 * totalAmount;
  const sellerAmount = 0.9 * totalAmount; // Example split: 90% to seller
  const brokerAmount = 0.05 * totalAmount; // 5% to broker

  try {
    // Disburse to seller
    await disbursePayment({ recipientPhoneNumber: sellerPhoneNumber, amount: sellerAmount });

    // Disburse to broker
    await disbursePayment({ recipientPhoneNumber: brokerPhoneNumber, amount: brokerAmount });

    res.status(200).json({ message: "Funds disbursed successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handlePayment, disburseFunds };
