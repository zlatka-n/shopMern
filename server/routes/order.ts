const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order");

router.post("/pay", orderControllers.postPay);

module.exports = router;
