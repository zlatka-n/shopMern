import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 isLoggedIn: false,
};

export const accountSlice = createSlice({
 name: "account",
 initialState,
 reducers: {
  loginSuccess: (state, action) => {
   return { ...state, isLoggedIn: action.payload };
  },
 },
});
