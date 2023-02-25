import { Response, Request } from "express";
import { NextFunction } from "express";
import { Address, User } from "./types";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db/conn");
const jwt_decode = require("jwt-decode");
const ObjectId = require("mongodb").ObjectId;

function authenticateToken(req: Request, res: Response, next: NextFunction) {
 const tokenFromCookie = req.cookies && req.cookies.accessToken;

 if (!tokenFromCookie)
  return res.status(401).json({ message: "No access token was received." });

 jwt.verify(
  tokenFromCookie,
  process.env.SECRET_TOKEN,
  (err: Error, user: User) => {
   if (err)
    return res
     .status(403)
     .json({ message: err, detail: "Token could not be verified." });
   res.locals.user = user;

   next();
  }
 );
}

function getUserId(req: Request, res: Response, next: NextFunction) {
 const accessToken = req.cookies && req.cookies.accessToken;
 const decodedJwt = jwt_decode(accessToken);

 if (!decodedJwt.id)
  return res.status(401).json({ message: "User id is missing." });

 res.locals.userId = new ObjectId(decodedJwt.id);

 next();
}

router.get("/", authenticateToken, (req: Request, res: Response) => {
 const authenticatedUser = res.locals.user?.email;
 if (authenticatedUser) {
  db
   .getUsersCollection()
   .findOne({ email: authenticatedUser }, (err: Error, user: User) => {
    if (err)
     return res
      .status(404)
      .json({ message: err, detail: "User was not found." });

    return res.json({ email: authenticatedUser, firstName: user.firstName });
   });
 }
});

router.get(
 "/adresses",
 authenticateToken,
 getUserId,
 (req: Request, res: Response) => {
  const userId = res.locals.userId;

  db
   .getAddressesCollection()
   .aggregate([
    {
     $match: { _id: userId },
    },
    { $project: { "addresses.created": 0 } },
    {
     $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      pipeline: [{ $project: { firstName: 1, lastName: 1 } }],
      as: "userInfo",
     },
    },
    {
     $unwind: "$userInfo",
    },
   ])
   .toArray(function (err: Error, userAddresses: Address[]) {
    if (err)
     return res.status(404).json({ message: "User addresses not found" });

    return res.json(userAddresses[0]);
   });
 }
);

router.put(
 "/adresses/:id",
 authenticateToken,
 (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);

  const addressId = req.body._id;
  const { address, zipCode, city, country } = req.body;

  db.getAddressesCollection().updateOne(
   { _id: ObjectId(userId), "addresses._id": ObjectId(addressId) },
   {
    $set: {
     "addresses.$.address": address,
     "addresses.$.zipCode": zipCode,
     "addresses.$.city": city,
     "addresses.$.country": country,
    },
   },
   (err: Error, response: Response) => {
    if (err) return res.json(err);

    return res.json(response);
   }
  );
 }
);

router.post(
 "/adresses/:id",
 authenticateToken,
 (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);

  db.getAddressesCollection().updateOne(
   { _id: userId },
   {
    $push: {
     addresses: { ...req.body, _id: ObjectId(), created: new Date(Date.now()) },
    },
   },
   (err: Error, response: Response) => {
    if (err)
     return res
      .status(422)
      .json({ message: err, detail: "New address could not be created." });

    return res.status(201).json(response);
   }
  );
 }
);

router.delete(
 "/adresses/:id",
 authenticateToken,
 (req: Request, res: Response) => {
  const { _id } = req.body;
  const userId = new ObjectId(req.params.id);

  db.getAddressesCollection().updateOne(
   { _id: userId },
   {
    $pull: { addresses: { _id: ObjectId(_id) } },
   },
   (err: Error, removedAddress: Response) => {
    if (err)
     res
      .status(404)
      .json({ message: err, detail: "Address could not be deleted" });

    return res.json(removedAddress);
   }
  );
 }
);

module.exports = router;
