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
 const cart = req.session.cart.items;

 db
  .getProductsCollection()
  .findOne({ _id: addItemId }, (err: Error, product: Product) => {
   if (err) return res.json(err);

   if (!product)
    return res.status(404).json({
     message: "Product does not exist in db.",
    });

   const isInCart =
    cart.length > 0
     ? cart.some((item: CartItem) => {
        return item._id.equals(addItemId);
       })
     : false;

   let totalPrice: number;
   let totalQty: number;

   /// 1. item is not in the cart => add item + update totalQty, totalPrice
   if (!isInCart) {
    const addProduct = { ...product, qty: 1 };
    const updateItems = [...cart, addProduct];

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
    const changedItem = cart.find((item: CartItem) =>
     item._id.equals(addItemId)
    );

    const updateItemQty = { ...changedItem, qty: changedItem.qty + 1 };
    const previousItems = cart.filter(
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

   res.status(201).json({ cart: req.session.cart });
  });
});

router.delete("/:id", (req: any, res: Response) => {
 const id = new ObjectId(req.params.id);
 const cart = req.session.cart;

 const deleteItem = cart.items.find((product: CartItem) => {
  return product._id.equals(id);
 });

 const updateItems = cart.items.filter(
  (product: CartItem) => !product._id.equals(id)
 );

 req.session.cart = {
  items: updateItems,
  totalQty: cart.totalQty - deleteItem.qty,
  totalPrice: cart.totalPrice - deleteItem.price * deleteItem.qty,
 };

 res.status(204).json({ message: "Item deleted from the cart" });
});

router.put("/:id", (req: any, res: Response) => {
 const id = new ObjectId(req.params.id);
 const newQuantity = req.body.qty;
 const cart = req.session.cart;

 const itemToUpdate: CartItem = cart.items.find((product: CartItem) => {
  return product._id.equals(id);
 });

 const previousItems = cart.items.filter(
  (product: CartItem) => !product._id.equals(id)
 );

 const newCart = [...previousItems, { ...itemToUpdate, qty: newQuantity }];
 const totalQty = calculateTotalQty(newCart);
 const totalPrice = calculateTotalPrice(newCart);

 req.session.cart = {
  items: newCart,
  totalQty,
  totalPrice,
 };

 res.status(202).json({ message: "Quatity for item was updated" });
});

module.exports = router;
