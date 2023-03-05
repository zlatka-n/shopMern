import { axiosInstance } from "./axios";
import { Book, ProductDetails } from "./types";

export const getBooks = async () => {
 try {
  const { data } = await axiosInstance.get<Book[]>("/products");
  return data;
 } catch (err) {
  console.error("Error during getBooks()");
  throw err;
 }
};

export const getBooksDetails = async (id?: string) => {
 try {
  const { data } = await axiosInstance.get<ProductDetails>(`/products/${id}`);
  return data;
 } catch (err) {
  console.error("Error during getBooks()");
  throw err;
 }
};
