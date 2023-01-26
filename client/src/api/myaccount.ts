import { axiosInstance } from "./axios";

export const getMyAccount = async () => {
 try {
  const { data } = await axiosInstance.get("/myaccount");
  return data;
 } catch (err) {
  throw err;
 }
};

export const getAddresses = async () => {
 try {
  const { data } = await axiosInstance.get("myaccount/adresses");
  return data;
 } catch (err) {
  throw err;
 }
};

// export const getMyAccount = async () => {
//  try {
//   const response = await fetch("http://localhost:4000/myaccount", {
//    credentials: "include",
//   });

//   return response.json();
//  } catch (err) {
//   throw err;
//  }
// };