import { Cart } from "../../api/types";

export const setCartAfterItemRemoved = (previousCart: Cart, itemId: string) => {
 const deleteItem = previousCart?.cart?.items?.find((product) => {
  return product._id === itemId;
 });

 const updateItems = previousCart?.cart.items.filter(
  (product) => product._id !== itemId
 );

 const totalQty = deleteItem
  ? previousCart?.cart?.totalQty - deleteItem?.qty
  : undefined;

 const totalPrice = deleteItem
  ? previousCart?.cart?.totalPrice - deleteItem.qty * deleteItem.price
  : undefined;

 const newCart = {
  cart: {
   items: updateItems,
   totalQty,
   totalPrice,
  },
 };

 return newCart;
};
