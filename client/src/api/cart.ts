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
  const { data } = await axiosInstance.post<Cart>("/cart", reqBody);
  return data;
 } catch (err) {
  throw err;
 }
};

export const deleteItemFromCart = async (id: string) => {
 try {
  const { data } = await axiosInstance.delete(`/cart/${id}`);
  return data;
 } catch (err) {
  throw err;
 }
};

export const putItemQuantity = async (reqBody: any) => {
 const { id, qty } = reqBody;
 try {
  const { data } = await axiosInstance.put<any>(`/cart/${id}`, { qty });
  return data;
 } catch (err) {
  throw err;
 }
};
