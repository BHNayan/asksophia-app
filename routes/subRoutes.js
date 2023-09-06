const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {startSubscription, paypalWebhook
} = require("../controllers/subscriptionController");

router.route("/").post(protect, startSubscription);
router.route("/webhook").post(paypalWebhook);


module.exports = router;