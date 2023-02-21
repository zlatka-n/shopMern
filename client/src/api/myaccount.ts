import { axiosInstance } from "./axios";
import { UserAddress } from "./types";

const userId = window.sessionStorage.getItem("userId");

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
  const { data } = await axiosInstance.get<UserAddress>("myaccount/adresses");
  return data;
 } catch (err) {
  throw err;
 }
};

export const putAddress = async (reqBody: any) => {
 try {
  const { data } = await axiosInstance.put(
   `myaccount/adresses/${userId}`,
   reqBody
  );
  return data;
 } catch (err) {
  throw err;
 }
};

export const postAddress = async (reqBody: any) => {
 try {
  const { data } = await axiosInstance.post(
   `myaccount/adresses/${userId}`,
   reqBody
  );
  return data;
 } catch (err) {
  throw err;
 }
};

export const deleteAddress = async (reqBody: any) => {
 try {
  const { data } = await axiosInstance.delete(`myaccount/adresses/${userId}`, {
   data: { _id: reqBody },
  });
  return data;
 } catch (err) {
  throw err;
 }
};
