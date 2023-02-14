import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../api/types";
import { RootState } from "./reducer";

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


export const selectAddresses = (state: RootState) => state.user.addresses

export const { setAddresses } = userInfoSlice.actions;
export default userInfoSlice.reducer;
