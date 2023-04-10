const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const db = require("./db/conn");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const myAccountRoutes = require("./routes/account");
const shopRoutes = require("./routes/shop");
const cartRoutes = require("./routes/cart");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./config.env" });

const sessionKey = process.env.SESSION_SECRET;
const mongoDbUri = process.env.ATLAS_URI;

const store = new MongoDBStore({
 uri: mongoDbUri,
 databaseName: "shopMern",
 collection: "sessions",
});

store.on("error", function (error: Error) {
 console.log(error);
});

app.use(
 cors({
  origin: "http://localhost:5173",
  credentials: true,
 })
);

app.use(
 session({
  secret: sessionKey,
  resave: false,
  saveUninitialized: false,
  store: store,
 })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/account", authRoutes);
app.use("/products", shopRoutes);
app.use("/myaccount", myAccountRoutes);
app.use("/cart", cartRoutes);

app.listen(port, () => {
 db.connectToMongoDb((err: Error) => console.log(err));

 console.log(`Listening on port ${process.env.PORT}`);
});
