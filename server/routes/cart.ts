import { Response } from "express";
import { CartItem, Product } from "./types";
const express = require("express");
const router = express.Router();
const db = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const { calculateTotalPrice, calculateTotalQty } = require("../shared/utils");

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
 const addItemId = new ObjectId(req.body.itemId);
 const itemsInCart = req.session.cart.items;

 db
  .getProductsCollection()
  .findOne({ _id: addItemId }, (err: Error, product: Product) => {
   if (err) return res.json(err);

   if (!product)
    return res.status(404).json({
     message: "Product does not exist in db.",
    });

   const isInCart =
    itemsInCart.length > 0
     ? itemsInCart.some((item: CartItem) => {
        return item._id.equals(addItemId);
       })
     : false;

   let totalPrice: number;
   let totalQty: number;

   /// 1. item is not in the cart => add item + update totalQty, totalPrice
   if (!isInCart) {
    const addProduct = { ...product, qty: 1 };
    const updateItems = [...itemsInCart, addProduct];

    totalPrice = calculateTotalPrice(updateItems);
    totalQty = calculateTotalQty(updateItems);

    req.session.cart = {
     items: updateItems,
     totalQty,
     totalPrice,
    };
   }

   /// 2. item is already in cart => update only item qty, totalQty, totalPrice
   if (isInCart) {
    const changedItem = itemsInCart.find((item: CartItem) =>
     item._id.equals(addItemId)
    );

    const updateItemQty = { ...changedItem, qty: changedItem.qty + 1 };
    const previousItems = itemsInCart.filter(
     (item: CartItem) => !item._id.equals(addItemId)
    );
    const updateItems = [...previousItems, updateItemQty];

    totalPrice = calculateTotalPrice(updateItems);
    totalQty = calculateTotalQty(updateItems);

    req.session.cart = {
     items: updateItems,
     totalQty,
     totalPrice,
    };
   }

   res.status(201).json({ message: "Item added to the cart" });
  });
});

module.exports = router;
