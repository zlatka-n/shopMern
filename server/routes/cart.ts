import { Request, Response } from "express";
import { CartItem } from "./types";

const express = require("express");
const router = express.Router();
const db = require("../db/conn");

router.get("/", (req: any, res: Response) => {
 const defaultCart = {
  items: [],
  totalQty: undefined,
  totalPrice: undefined,
 };

 if (!req.session.cart) req.session.cart = defaultCart;

 res.status(200).json({ cart: req.session.cart });
});

router.post("/", (req: any, res: Response) => {
 //cart model:
 //  const cart = {
 //   items: [{productId: string, qty: number, price: number}],
 //   totalQty: number,
 //   totalPrice: number
 //  }

 const addItemId = req.body.itemId;
 const itemsInCart = req.session.cart.items;

 const isInCart =
  itemsInCart.length > 0
   ? itemsInCart.some((item: CartItem) => item.productId === addItemId)
   : false;

 /// 1. item is not in the cart => add item + update totalQty, totalPrice

 if (!isInCart) {
  req.session.cart = {
   items: [...itemsInCart, { productId: addItemId, qty: 1, price: 12 }],
   totalQty: 1,
   totalPrice: 12,
  };
 }

 /// 2. item is already in cart => update only qty, totalQty, totalPrice
 //  req.session.cart = {
 //   items: [{ productId: "Book title", qty: 1, price: 12 }],
 //   totalQty: 1,
 //   totalPrice: 12,
 //  };

 res.status(201).json({ cart: req.session.cart });
});

module.exports = router;
