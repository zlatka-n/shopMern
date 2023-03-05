const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const db = require("./db/conn");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const myAccountRoutes = require("./routes/account");
const shopRoutes = require("./routes/shop");

const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./config.env" });

app.use(
 cors({
  origin: "http://localhost:5173",
  credentials: true,
 })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/account", authRoutes);
app.use("/books", shopRoutes);
app.use("/myaccount", myAccountRoutes);

app.listen(port, () => {
 db.connectToMongoDb((err: Error) => console.log(err));

 console.log(`Listening on port ${process.env.PORT}`);
});
