import { NextFunction, Request, Response } from "express";
import { User } from "../routes/types";

const db = require("../db/conn");

const getAccount = (req: Request, res: Response, next: NextFunction) => {
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

module.exports = { getAccount };
