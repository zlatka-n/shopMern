import { ObjectId } from "bson";
import { Request, Response } from "express";
import { Product, ProductDetails } from "./types";

const express = require("express");
const router = express.Router();
const db = require("../db/conn");

router.get("/", (req: Request, res: Response) => {
 db
  .getProductsCollection()
  .find()
  .toArray((err: Error, product: Product) => {
   if (err)
    return res
     .status(404)
     .send({ status: "404", message: "resource not found" });

   return res.json(product);
  });
});

router.get("/:id", (req: Request, res: Response) => {
 const productId = new ObjectId(req.params.id);

 db
  .getDb()
  .collection("productsDetails")
  .aggregate([
   {
    $match: { _id: productId },
   },
   {
    $lookup: {
     from: "products",
     localField: "_id",
     foreignField: "_id",
     as: "basicInfo",
    },
   },
   {
    $unwind: "$basicInfo",
   },
  ])
  .toArray(function (err: Error, productDetails: ProductDetails[]) {
   if (err)
    return res
     .status(404)
     .json({ message: `Product with id ${productId} could not be found.` });

   return res.json(productDetails[0]);
  });
});

module.exports = router;
