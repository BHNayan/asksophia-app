const User = require("../models/userModel");
const Prompt = require("../models/promptModel");
const Purchase = require("../models/purchaseModel");
const paypal = require('@paypal/checkout-server-sdk');

let environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID,  process.env.PAYPAL_CLIENT_SECRET);
let client = new paypal.core.PayPalHttpClient(environment);

const paypalCallback =  async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if(!user){
        res.send(404);
        throw Error("User not found");
    }
     await User.findByIdAndUpdate(
        req.user._id,
        {paypalAccountEmail:req.body.email, isPaypalConnected:true},
        { new: true }
    );
    res.status(200).json({response:"success"});
  } catch (error) {
    console.error('Error while connecting to Stripe:', error.message);
    res.status(500).send('Error connecting to Stripe.');
  }
}
// N4FUZYFYRHNZQ

let promptInfo = {
  pricePaid:"",
  userId:"",
  promptId:"",
}

const purchaseFun = async (req, res) => {
  const { sellerPaypalEmail, promptId, price } = req.body;

  promptInfo = {
    pricePaid:price,
    userId:req.user._id,
    promptId,
  }
  // Convert all to float and then calculate
  const serviceFeeFloat = parseFloat(2);
  const priceFloat = parseFloat(price);
  
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
request.requestBody({
  "intent": "CAPTURE",
  "purchase_units": [
    {
      "reference_id": "seller_unit",  // Add this line
      "amount": {
        "currency_code": "USD",
        "value": priceFloat.toFixed(2),
      },
      "payee": {
        "email_address": sellerPaypalEmail
      }
    },
    {
      "reference_id": "platform_unit",  // Add this line
      "amount": {
        "currency_code": "USD",
        "value": serviceFeeFloat.toFixed(2),
      },
      "payee": {
        "email_address": process.env.ADMIN_EMAIL  // Platform's PayPal email
      }
    }
  ],
  "application_context": {
    "return_url": `${process.env.NODE_ENV === "production" ?
     `${process.env.DOMAIN_PROD}/success` : 'http://localhost:3000/success' }`,
    "cancel_url": `${process.env.NODE_ENV === "production" ?
    `${process.env.DOMAIN_PROD}/cancel` : 'http://localhost:3000/cancel' }`,
  }
});

  try {
    const order = await client.execute(request);
    let approval_url;
    for (const link of order.result.links) {
      if (link.rel === 'approve') {
        approval_url = link.href;
        break;
      }
    }

    if (approval_url) {
      res.json({
        orderID: order.result.id,
        approval_url: approval_url
      });
    } else {
      res.status(400).json({ error: 'No approval URL found in PayPal response' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const payementSuccess = async (req, res) => {
  const orderId = req.body.token; 
  const request = new paypal.orders.OrdersCaptureRequest(orderId);

  try {
    const capture = await client.execute(request);
    // console.log(JSON.stringify(capture.result, null, 2));
    if (capture.result.status === "COMPLETED") {
     try {
      const prompt = await Prompt.findById(promptInfo.promptId);
      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }
      
      prompt.purchasedBy.push(promptInfo.userId);
      await prompt.save();
      
      const newPurchase = new Purchase({
        user: promptInfo.userId,
        prompt: promptInfo.promptId,
        pricePaid: promptInfo.pricePaid,
        transactionDate: new Date()
      })
      await newPurchase.save();
     } catch (error) {
      console.log(error)
     }
      res.status(200).json({promptId:promptInfo.promptId})
    } else {
      res.status(400).json({ status: "failed", details: capture.result });
    }

  } catch (error) {
    // console.error(error);
    res.status(500).send("Error during payment execution.");
  }
};

const getPurchasedPrompts = async (req, res) => {
    const userId = req.user._id; 
    const promptId = req.params.promptId;

    try {
        const purchase = await Purchase.findOne({ userId, promptId });

        if (purchase) {
            // User has purchased the prompt. Fetch and send the full prompt data.
            const prompt = await Prompt.findById(promptId);
            if (!prompt) {
                res.status(404).send("Prompt not found.");
                return;
            }
            res.status(200).json(prompt);
        } else {
            // User has not purchased the prompt.
            res.status(403).send("You need to purchase this prompt to view its content.");
        }
    } catch(err) {
        console.error("Database error:", err);
        res.status(500).send("Error fetching data.");
    }
}

module.exports={ paypalCallback, purchaseFun, payementSuccess }




