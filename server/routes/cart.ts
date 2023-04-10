import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const db = require("../db/conn");

router.post("/", (req: Request, res: Response) => {
 res.status(202).json({ message: "item added" });
});

module.exports = router;
