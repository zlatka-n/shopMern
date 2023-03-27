import { Request, Response } from "express";
import { UpdateOneResult, User, UserValue } from "./types";
const express = require("express");
const router = express.Router();
const db = require("../db/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const crypto = require("crypto");
const ObjectId = require("mongodb").ObjectId;

require("dotenv").config({ path: "./config.env" });
const secretToken = process.env.SECRET_TOKEN;
const sendGridApiKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;
const frontEndUrl = process.env.FRONTEND_URL;

const transport = nodemailer.createTransport(
 nodemailerSendgrid({
  apiKey: sendGridApiKey,
 })
);

const saltRounds = 10;

router.post("/signup", (req: Request, res: Response) => {
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
   bcrypt.hash(password, saltRounds, function (err: Error, hash: string) {
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

router.post("/forgotPassword", (req: Request, response: Response) => {
 const email = req.body.email;
 const resetToken = crypto.randomBytes(32).toString("hex");

 const resetTokenExpiration = new Date().getTime() + 10_800_000; // 3 hours expiration

 db
  .getUsersCollection()
  .findOneAndUpdate(
   { email },
   { $set: { resetToken, resetTokenExpiration } },
   (err: Error, user: UserValue) => {
    const { _id } = user.value;
    const link = `${frontEndUrl}/passwordReset?token=${resetToken}&userId=${_id.toString()}`;

    if (!user) {
     return response.status(404).json({
      message: "User does not exist in db. Ensure that email is registered.",
     });
    }

    transport
     .sendMail({
      from: senderEmail,
      to: email,
      subject: "Reset your password",
      html: `<p>You've asked us to reset your password. Please click on the link below to enter a new password:
     ${link}. Please note that the link will expire in 24 hours. 
     </p>`,
     })
     .then(([res]: any) => {
      console.log("Message delivered with code %s %s", res.statusCode);

      response.status(202).json({ message: "Reset email was sent" });
     })
     .catch((error: any) => {
      response
       .status(500)
       .json({ message: "Errors occurred, failed to deliver reset email." });
     });
   }
  );
});

router.post("/resetPassword", (req: Request, res: Response) => {
 const resetToken = req.body.resetToken;
 const userId = new ObjectId(req.body.userId);
 const resetTime = new Date().getTime();
 const password = req.body.password;

 bcrypt.hash(password, saltRounds, function (hashErr: Error, hash: string) {
  if (hashErr)
   return res.status(500).json({ message: "Password could not be hashed" });

  // find user and compare reset token expiration
  db.getUsersCollection().findOneAndUpdate(
   { resetToken, _id: userId, resetTokenExpiration: { $gt: resetTime } },
   {
    $set: {
     "resetToken": null,
     "resetTokenExpiration": null,
     "password": hash,
    },
   },
   (err: Error, user: any) => {
    if (err || !user.value)
     return res
      .status(404)
      .json({ "message": "User not found or token expired." });

    return res.status(202).json({ message: "New password was saved." });
   }
  );
 });
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
