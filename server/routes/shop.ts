import { Request, Response } from "express";
import { Product } from "./types";

const express = require("express");
const router = express.Router();
const db = require("../db/conn");

router.get("/", (req: Request, res: Response) => {
 db
  .getDb()
  .collection("products")
  .find()
  .toArray((err: Error, product: Product) => {
   if (err)
    return res
     .status(404)
     .send({ status: "404", message: "resource not found" });

   return res.json(product);
  });
});

module.exports = router;
