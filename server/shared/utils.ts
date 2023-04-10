import { CartItem } from "../routes/types";

const calculateTotalPrice = (items: CartItem[]) =>
 items.reduce((accumulator, { price, qty }) => accumulator + price * qty, 0);

const calculateTotalQty = (items: CartItem[]) =>
 items.reduce((accumulator, { qty }) => accumulator + qty, 0);

module.exports = { calculateTotalPrice, calculateTotalQty };
