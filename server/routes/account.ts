import { Response, Request } from "express";
import { NextFunction } from "express";
import { User } from "./types";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const ObjectId = require("mongodb").ObjectId;

const accountControllers = require("../controllers/account");

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

router.get("/", authenticateToken, accountControllers.getAccount);

router.get(
 "/adresses",
 authenticateToken,
 getUserId,
 accountControllers.getAddresses
);

router.put("/adresses/:id", authenticateToken, accountControllers.putAddress);

router.post("/adresses/:id", authenticateToken, accountControllers.postAddress);

router.delete(
 "/adresses/:id",
 authenticateToken,
 accountControllers.deleteAddress
);

module.exports = router;
