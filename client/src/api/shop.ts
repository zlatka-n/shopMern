import { axiosInstance } from "./axios";
import { Book } from "./types";

export const getBooks = async () => {
 try {
  const { data } = await axiosInstance.get<Book[]>("/products");
  return data;
 } catch (err) {
  console.error("Error during getBooks()");
  throw err;
 }
};
