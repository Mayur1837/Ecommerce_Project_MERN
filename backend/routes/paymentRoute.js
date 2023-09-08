const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middleware/Auth");
const {
  processPayment,
  sendStripApiKey,
} = require("../controllers/paymentControllers");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripApiKey);

module.exports = router;
