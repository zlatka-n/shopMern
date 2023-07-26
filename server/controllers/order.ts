import { Response } from "express";

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

    const session = await stripe.checkout.sessions.create({
        line_items,
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/success-payment`,
        cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    res.status(200).json({ url: session.url });
};

module.exports = {
    postCheckoutSession
}