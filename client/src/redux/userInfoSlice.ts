import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../api/types";

type SliceState = {
 addresses: Address[];
};

const initialState: SliceState = {
 addresses: [],
};

const userInfoSlice = createSlice({
 name: "userInfo",
 initialState,
 reducers: {
  setAddresses: (state, action: PayloadAction<Address[]>) => {
   return { ...state, addresses: action.payload };
  },
 },
});

export const { setAddresses } = userInfoSlice.actions;
export default userInfoSlice.reducer;
