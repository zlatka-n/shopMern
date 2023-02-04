import { axiosInstance } from "./axios";
import { UserAddress } from "./types";

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
  const { data } = await axiosInstance.put("myaccount/adresses", reqBody);
  return data;
 } catch (err) {
  throw err;
 }
};
