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

export const getNewToken = async () => {
 try {
  await axiosInstance.get("/account/refresh");
 } catch (err) {
  throw err;
 }
};

axiosInstance.interceptors.response.use(
 function (response) {
  return response;
 },
 function (error) {
  if (error.response.status === 403) {
   return getNewToken()
    .then(() => console.log("new access token was set"))
    .catch(() => console.log("error during getNewToken()"));
  }
  return Promise.reject(error);
 }
);
