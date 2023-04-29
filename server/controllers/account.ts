import { Request, Response } from "express";
import { Address, User } from "../routes/types";

const db = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const getAccount = (req: Request, res: Response) => {
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
};

const getAddresses = (req: Request, res: Response) => {
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
};

const putAddress = (req: Request, res: Response) => {
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
};

const postAddress = (req: Request, res: Response) => {
 const userId = new ObjectId(req.params.id);

 db.getAddressesCollection().updateOne(
  { _id: userId },
  {
   $push: {
    addresses: { ...req.body, _id: ObjectId(), created: new Date(Date.now()) },
   },
  },
  { upsert: true },
  (err: Error, response: Response) => {
   if (err)
    return res
     .status(422)
     .json({ message: err, detail: "New address could not be created." });

   return res.status(201).json(response);
  }
 );
};

const deleteAddress = (req: Request, res: Response) => {
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
};

module.exports = {
 getAccount,
 getAddresses,
 putAddress,
 postAddress,
 deleteAddress,
};
