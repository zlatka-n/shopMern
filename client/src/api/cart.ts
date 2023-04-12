import { axiosInstance } from "./axios";
import { Cart, ItemId } from "./types";

export const getCart = async () => {
 try {
  const { data } = await axiosInstance.get<Cart>("/cart");
  return data;
 } catch (err) {
  throw err;
 }
};

export const postAddToCart = async (reqBody: ItemId) => {
 try {
  const { data } = await axiosInstance.post<any>("/cart", reqBody);
  return data;
 } catch (err) {
  throw err;
 }
};
