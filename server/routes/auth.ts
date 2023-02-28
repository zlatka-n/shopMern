import { Request, Response } from "express";
import { User } from "./types";
const express = require("express");
const router = express.Router();
const db = require("../db/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
require("dotenv").config({ path: "./config.env" });

const secretToken = process.env.SECRET_TOKEN;

router.post("/signup", (req: Request, res: Response) => {
 const saltRounds = 10;
 const { email, password, firstName, lastName } = req.body;

 db.getUsersCollection().findOne({ email }, function (err: Error, user: User) {
  if (err) return res.json(err);

  if (user) {
   res.status(409).json({
    message:
     "User already exists in db. Ensure that email is not already registered.",
   });
   return;
  }

  if (!user)
   bcrypt.hash(password, saltRounds, function (err: Error, hash: boolean) {
    if (err) return res.json(err);

    db
     .getUsersCollection()
     .insertOne(
      { firstName, lastName, email, password: hash },
      function (err: Error) {
       if (err) res.json(err);

       res.status(201).json({ message: "New user was created." });
      }
     );
   });
 });
});

router.post("/login", (req: Request, res: Response) => {
 const email = req.body.email;
 const password = req.body.password;

 db.getUsersCollection().findOne({ email }, function (err: Error, user: User) {
  if (err) return res.json(err);

  if (!user)
   return res.status(404).json({
    message: "User does not exist in db. Ensure that email is registered.",
   });

  if (user) {
   bcrypt.compare(
    password,
    user.password,
    function (err: Error, result: boolean) {
     if (err) return res.json(err);

     if (!result) return res.status(401).json({ message: "Wrong password." });

     if (result) {
      const userId = user._id.toString();

      const accessToken = jwt.sign(
       { email: user.email, id: userId },
       secretToken,
       { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
       { email: user.email, id: userId },
       secretToken,
       { expiresIn: "1d" }
      );

      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.cookie("isLoggedIn", true);

      return res.json({ message: "User was logged in.", userId });
     }
    }
   );
  }
 });
});

router.get("/logout", (req: Request, res: Response) => {
 const isUserLoggedIn = req.cookies && req.cookies.accessToken;

 if (!isUserLoggedIn)
  return res.status(403).json({
   message: "User is not logged in.",
  });

 res.clearCookie("accessToken");
 res.clearCookie("refreshToken");
 res.clearCookie("isLoggedIn");

 return res.json({ message: "User was logged out." });
});

router.get("/refresh", (req: Request, res: Response) => {
 const refreshToken = req.cookies && req.cookies.refreshToken;

 if (!refreshToken)
  return res.status(401).json({ message: "Refresh token is missing." });

 jwt.verify(refreshToken, secretToken, function (err: Error) {
  res.clearCookie("accessToken");

  if (err) {
   res.clearCookie("accessToken");
   res.clearCookie("refreshToken");
   res.clearCookie("isLoggedIn");

   return res.status(401).json({ status: "401", message: err });
  }

  const decodeToken = jwt_decode(refreshToken);
  const newAccessToken = jwt.sign(
   { email: decodeToken.email, id: decodeToken.id },
   secretToken,
   { expiresIn: "15m" }
  );

  res.cookie("accessToken", newAccessToken, { httpOnly: true });

  return res.json({ message: "New access token issued." });
 });
});

module.exports = router;
