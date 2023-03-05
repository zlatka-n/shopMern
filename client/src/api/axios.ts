import axios from "axios";
import { getNewToken } from "./auth";

export const axiosInstance = axios.create({
 baseURL: "http://localhost:4000",
 withCredentials: true,
});

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
