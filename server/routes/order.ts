const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order");

router.post("/create-checkout", orderControllers.postCheckoutSession);
router.get(/payment-intent/, orderControllers.getPaymentIntent);

module.exports = router;
