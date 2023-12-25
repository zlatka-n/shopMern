import { Response } from 'express';

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./db/conn');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const myAccountRoutes = require('./routes/account');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const suggestionsRoutes = require('./routes/suggestions');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

require('dotenv').config({ path: './config.env' });

const sessionKey = process.env.SESSION_SECRET;
const mongoDbUri = process.env.ATLAS_URI;
const endpointSecret =
  'whsec_67227e60d78a92ba95db7b6044ae646dadcd36e6809c053f2c2015db1733a529';

const store = new MongoDBStore({
  uri: mongoDbUri,
  databaseName: 'shopMern',
  collection: 'sessions',
});

store.on('error', function (error: Error) {
  console.log(error);
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(
  session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      resave: false,
    },
  })
);

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request: any, response: any) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err: any) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;

        db.getShopOrder().updateOne(
          { paymentIntent: paymentIntentSucceeded.id },
          { $set: { orderStatus: paymentIntentSucceeded.status } },
          (err: Error, orderResponse: Response) => {
            if (err) return orderResponse.json(err);
          }
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true });
  }
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/account', authRoutes);
app.use('/products', shopRoutes);
app.use('/myaccount', myAccountRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/suggestions', suggestionsRoutes);

app.listen(port, () => {
  db.connectToMongoDb((err: Error) => console.log(err));

  console.log(`Listening on port ${process.env.PORT}`);
});
