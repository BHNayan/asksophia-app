const asyncHandler = require("express-async-handler");
const Subscription = require("../models/subscriptionModel");
const axios = require("axios");

const startSubscription = async (req, res) => {
  const today = new Date();
  const nextPaymentDate = new Date(today);
  nextPaymentDate.setDate(today.getDate() + 30);
  try {
    const { subscriptionID, plan } = req.body;
    const url = `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
    if (response.data) {
      const newSubscription = await new Subscription({
        user: req.user._id,
        subscriptionID: subscriptionID,
        plan: plan,
        startDate: response.data.start_time,
        nextPaymentDate: nextPaymentDate,
        status: response.data.status,
      });

      await newSubscription.save();

      res.status(201).json(newSubscription);
    }
  } catch (error) {
    console.error("Error saving subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


async function getAccessToken() {
  const basicAuth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          Accept: "application/json",
          "Accept-Language": "en_US",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error.response.data);
    throw error;
  }
}

const getUnpaidSubscriptions = asyncHandler(async () => {
  const currentDate = new Date();

  const unpaidSubscriptions = await Subscription.find({
    nextPaymentDate: { $lt: currentDate },
    status: "ACTIVE",
  }).populate("user", "email");
  return unpaidSubscriptions;
});


const paypalWebhook = async (req, res) => {
    // console.log(req.body.event_type)
    const eventType = req.body.event_type;
    
    if (eventType === "PAYMENT.SALE.COMPLETED") {
        const subscriptionId = req.body.resource.billing_agreement_id;
        updatePaidSubscriptions(subscriptionId);
    
        res.sendStatus(200);
      }
  
    
  };
  

const updatePaidSubscriptions = asyncHandler(async (subscriptionID) => {
    console.log(subscriptionID)
  const sub = await Subscription.findOne({subscriptionID});
  const today = new Date();
  const nextPaymentDate = new Date(today);
  nextPaymentDate.setDate(today.getDate() + 30);

  if (!sub) {
    throw Error("sub not found");
  }
  await Subscription.findByIdAndUpdate(
    sub._id,
    { nextPaymentDate },
    { new: true }
  );
});

module.exports = {
  startSubscription,
  getUnpaidSubscriptions,
  paypalWebhook,
};
