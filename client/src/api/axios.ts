import axios from "axios";
import { Login } from "./types";

const axiosInstance = axios.create({
 baseURL: "http://localhost:4000",
 withCredentials: true,
});

export const getBooks = async () => {
 try {
  const { data } = await axiosInstance.get("/home");
  return data;
 } catch (err) {
  console.error("Error during getBooks()");
  throw err;
 }
};

export const postLogin = async (reqBody: Login) => {
 try {
  await axiosInstance.post("/account/login", reqBody);
  console.log("User logged in");
 } catch (err) {
  console.error("Error during postLogin()");
  throw err;
 }
};

axiosInstance.interceptors.response.use(
 function (response) {
  return response;
 },
 function (error) {
  //TODO: if response code is 403, get new tokens from BE
  return Promise.reject(error);
 }
);
