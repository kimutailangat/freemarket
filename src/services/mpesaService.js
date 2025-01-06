const axios = require("axios");
require("dotenv").config();

const M_PESA_BASE_URL = "https://sandbox.safaricom.co.ke"; // Use production URL in live environments

// Get Access Token
const getAccessToken = async () => {
  try {
    const response = await axios.get(`${M_PESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
      auth: {
        username: process.env.YAuA3L7g6x3PlKuRG1MwbIDOmPGyP4IKsQL7s1QtwCg2lPbD,
        password: process.env.cGo0uKa4VIFXHyFbL8NDiq24MMMJeRbuKotRUGf9hPT3waP5w2pP1bgyVsup2ZMy,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting M-Pesa access token:", error);
    throw new Error("Failed to get M-Pesa access token.");
  }
};

// Initiate STK Push
const initiatePayment = async ({ phoneNumber, amount, accountReference }) => {
  try {
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const response = await axios.post(
      `${M_PESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: `${process.env.BASE_URL}/api/payments/mpesa-callback`,
        AccountReference: accountReference,
        TransactionDesc: "Marketplace Payment",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error initiating payment:", error.response.data || error);
    throw new Error("Failed to initiate payment.");
  }
};

// Disburse Payment
const disbursePayment = async ({ recipientPhoneNumber, amount }) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.post(
      `${M_PESA_BASE_URL}/mpesa/b2c/v1/paymentrequest`,
      {
        InitiatorName: process.env.MPESA_INITIATOR_NAME,
        SecurityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
        CommandID: "BusinessPayment",
        Amount: amount,
        PartyA: process.env.MPESA_SHORTCODE,
        PartyB: recipientPhoneNumber,
        Remarks: "Payment disbursement",
        QueueTimeOutURL: `${process.env.BASE_URL}/api/payments/mpesa-timeout`,
        ResultURL: `${process.env.BASE_URL}/api/payments/mpesa-result`,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error disbursing payment:", error.response.data || error);
    throw new Error("Failed to disburse payment.");
  }
};

module.exports = { initiatePayment, disbursePayment };
