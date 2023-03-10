import { axiosInstance } from "./axios";
import { Login } from "./types";
import { SignUp } from "../shared/types";

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
