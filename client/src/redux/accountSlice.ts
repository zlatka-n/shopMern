import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./reducer";

const initialState = {
 isLoggedIn: false,
};

const accountSlice = createSlice({
 name: "account",
 initialState,
 reducers: {
  setLoginSuccess: (state, action) => {
   return { ...state, isLoggedIn: action.payload };
  },
 },
});

export const selectIsUserLoggedIn = (state: RootState) =>
 state.account.isLoggedIn;

export const { setLoginSuccess } = accountSlice.actions;
export default accountSlice.reducer;
