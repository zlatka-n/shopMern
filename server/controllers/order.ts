import express, { Response } from "express";
import crypto from "crypto";

const db = require("../db/conn");
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);


const postPay = async (req: any, res: any) => {
    const id = crypto.randomBytes(32).toString("hex")

    const { email } = req.body;
    const { totalPrice } = req.session.cart

    const line_items = req.session.cart.items.map((item: any) => ({
        product_name: item.title,
        product_id: item._id,
        unit_amount: item.price,
        quantity: item.qty,
    }));

    if (line_items.length < 1) res.status(400).json({message: 'no items found in the cart'})


    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice * 100,
        metadata: {"orderId": id},
        receipt_email: email,
        currency: 'eur'
      });

      db.getShopOrder().insertOne({
        orderId: id,
        userId: "TODO: userId",
        orderDate: new Date().toISOString(),
        paymentMethod: "card",
        shippingAddress: "TODO: address",
        shippingMethod: "TODO: shipping method",
        orderTotal: totalPrice,
        items: line_items,
        paymentIntent: paymentIntent.id,
        currency: paymentIntent.currency,
        orderStatus: "pending"
    }, function (err: Error) {
        if (err) res.json(err);

        req.session.cart = null;
        req.session.destroy();

        res.json({'client_secret': paymentIntent['client_secret'], "message": "order created"})

    })
}

module.exports = {
    postPay,
}

