import axios from "axios";
import { Login } from "./types";

const axiosInstance = axios.create({
 baseURL: "http://localhost:4000",
 withCredentials: true,
});

export const postLogin = async (reqBody: Login) => {
 try {
  await axiosInstance.post("/account/login", reqBody);
  console.log("User logged in");
 } catch (err) {
  console.error("Error during postLogin()");
  throw err;
 }
};
