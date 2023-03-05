import axios from "axios";
import { SignUp } from "../shared/types";
import { Book, Login } from "./types";

export const axiosInstance = axios.create({
 baseURL: "http://localhost:4000",
 withCredentials: true,
});

export const getBooks = async () => {
 try {
  const { data } = await axiosInstance.get<Book[]>("/books");
  return data;
 } catch (err) {
  console.error("Error during getBooks()");
  throw err;
 }
};

export const postLogin = async (reqBody: Login) => {
 try {
  const { data } = await axiosInstance.post("/account/login", reqBody);
  window.sessionStorage.setItem("userId", data.userId);
  return data;
 } catch (err) {
  console.error("Error during postLogin()");
  throw err;
 }
};

export const postSignUp = async (reqBody: SignUp) => {
 try {
  const { data } = await axiosInstance.post("/account/signup", reqBody);
  return data;
 } catch (err) {
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

export const getLogout = async () => {
 try {
  const { data } = await axiosInstance.get("/account/logout");
  return data;
 } catch (err) {
  console.error("Error during getLogout()");
  throw err;
 }
};

axiosInstance.interceptors.response.use(
 function (response) {
  return response;
 },
 function (error) {
  ///access token expired
  if (error.response.status === 403) {
   return getNewToken()
    .then(() => console.log("new access token was set"))
    .catch(() => console.log("error during getNewToken()"));
  }

  //access token + refresh token expired => logout user
  if (error.response.status === 401) {
   window.location.href = "/account/login";
  }

  return Promise.reject(error);
 }
);
