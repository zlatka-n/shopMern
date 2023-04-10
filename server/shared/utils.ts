import { CartItem } from "../routes/types";

const calculateTotalPrice = (items: CartItem[]) =>
 items.reduce((accumulator, { price, qty }) => accumulator + price * qty, 0);

module.exports = { calculateTotalPrice };
