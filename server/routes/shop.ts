const express = require("express");
const router = express.Router();
const shopControllers = require("../controllers/shop");

router.get("/", shopControllers.getShop);

router.get("/:id", shopControllers.getProduct);

module.exports = router;
