const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cart");

router.get("/", cartControllers.getCart);

router.post("/", cartControllers.postCartItem);

router.delete("/:id", cartControllers.deleteCartItem);

router.put("/:id", cartControllers.putCartItem);

router.post("/create-checkout", cartControllers.postCheckoutSession);

module.exports = router;
