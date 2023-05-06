import { Request, Response } from "express";
import { User, UserValue } from "../routes/types";
import { ObjectId } from "mongodb";
const bcrypt = require("bcrypt");
const db = require("../db/conn");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const jwt_decode = require("jwt-decode");

const saltRounds = 10;
const secretToken = process.env.SECRET_TOKEN;
const sendGridApiKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;
const frontEndUrl = process.env.FRONTEND_URL;

const transport = nodemailer.createTransport(
 nodemailerSendgrid({
  apiKey: sendGridApiKey,
 })
);

const postSignUp = (req: Request, res: Response) => {
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

  if (!user) {
   bcrypt.hash(password, saltRounds, function (err: Error, hash: string) {
    if (err) return res.json(err);
    const signUpToken = crypto.randomBytes(32).toString("hex");
    const signUpTokenExpiration = new Date().getTime() + 86_400_000; // 24 hours expiration

    db.getUsersCollection().insertOne(
     {
      firstName,
      lastName,
      email,
      password: hash,
      isVerified: false,
      signUpToken,
      signUpTokenExpiration,
     },
     function (err: Error, newUserResponse: any) {
      if (err) res.json(err);

      const link = `${frontEndUrl}/verifyAccount?token=${signUpToken}&email=${email}`;

      transport
       .sendMail({
        from: senderEmail,
        to: email,
        subject: "Verify your account",
        html: `<p>Please click on the link below to verify your account:
      ${link}. Please note that the link will expire in 24 hours. 
      </p>`,
       })
       .then(([emailResponse]: any) => {
        res.status(202).json({ message: "Reset email was sent" });
       })
       .catch((error: any) => {
        console.log("Failed to deliver email");

        res
         .status(500)
         .json({ message: "Errors occurred, failed to deliver reset email." });
       });
     }
    );
   });
  }
 });
};

const postLogin = (req: Request, res: Response) => {
 const email = req.body.email;
 const password = req.body.password;

 db.getUsersCollection().findOne({ email }, function (err: Error, user: User) {
  if (err) return res.json(err);

  const isVerified = user && user.isVerified;

  if (!user)
   return res.status(404).json({
    message: "User does not exist in db. Ensure that email is registered.",
   });

  if (!isVerified) {
   return res.status(401).json({
    message: "Account is not verified",
   });
  }

  if (user && isVerified) {
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
};

const postLogout = (req: any, res: Response) => {
 const isUserLoggedIn = req.cookies && req.cookies.accessToken;

 if (!isUserLoggedIn)
  return res.status(403).json({
   message: "User is not logged in.",
  });

 req.session.cart = null;
 req.session.destroy();

 res.clearCookie("accessToken");
 res.clearCookie("refreshToken");
 res.clearCookie("isLoggedIn");

 return res.json({ message: "User was logged out." });
};

const postForgotPassword = (req: Request, response: Response) => {
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
};

const postResetPassword = (req: Request, res: Response) => {
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
};

const postVerifyAccount = (req: Request, res: Response) => {
 const signUpToken = req.body.token;
 const email = req.body.email;
 const timeOfRequest = new Date().getTime();

 db.getUsersCollection().findOneAndUpdate(
  {
   signUpToken,
   email,
   signUpTokenExpiration: { $gt: timeOfRequest },
  },
  {
   $set: {
    "isVerified": true,
    "signUpToken": null,
    "signUpTokenExpiration": null,
   },
  },
  (err: Error, user: any) => {
   if (err || !user.value) {
    return res
     .status(404)
     .json({ "message": "Account could not be verified." });
   }

   return res.status(200).json({ message: "Account was verified." });
  }
 );
};

const getRefreshToken = (req: Request, res: Response) => {
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
};

module.exports = {
 postSignUp,
 postLogin,
 postLogout,
 postForgotPassword,
 postResetPassword,
 getRefreshToken,
 postVerifyAccount,
};
