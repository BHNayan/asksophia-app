const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { paypalCallback, purchaseFun, payementSuccess } = require("../controllers/paypalController");

router.route("/callback").post(protect, paypalCallback);
router.route("/success").post(payementSuccess);
router.route("/pay").post(protect, purchaseFun);

module.exports = router;