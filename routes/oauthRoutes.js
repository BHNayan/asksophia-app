const express = require("express");
const router = express.Router();
const { signupGoogle, loginGoogle } = require("../controllers/oauthController");


router.post("/google/login", loginGoogle);
router.post("/google/signup", signupGoogle);


module.exports = router;