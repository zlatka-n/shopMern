import { Response } from "express";
import {ObjectId} from "bson";
import crypto from "crypto";

const db = require("../db/conn");
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

const postCheckoutSession = async (req: any, res: Response) => {
    const line_items = req.session.cart.items.map((item: any) => ({
        price_data: {
            currency: "eur",
            product_data: {
                name: item.title,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.qty,
    }));

    if (line_items.length < 1) res.status(400).json({message: 'no items found in the cart'})

    const session = await stripe.checkout.sessions.create({
        line_items,
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/success-payment`,
        cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    const id = crypto.randomBytes(32).toString("hex")
    db.getShopOrder().insertOne({
        id,
        userId: "TODO: userId",
        orderDate: new Date().toISOString(),
        paymentMethod: "card",
        shippingAddress: "TODO: address",
        shippingMethod: "TODO: shipping method",
        orderTotal: req.session.cart.totalPrice,
        orderStatus: "pending"
    }, function (err: Error, orderResponse: any) {
        if (err) res.json(err);

        req.session.cart = null;
        res.status(200).json({ url: session.url, orderId: id  });
    })
};

module.exports = {
    postCheckoutSession
}