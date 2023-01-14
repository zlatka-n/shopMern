import { createSlice } from "@reduxjs/toolkit";

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

export const { setLoginSuccess } = accountSlice.actions;
export default accountSlice.reducer;
