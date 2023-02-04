import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import userInfoReducer from "./userInfoSlice";

export const store = configureStore({
 reducer: {
  account: accountReducer,
  user: userInfoReducer,
 },
 devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
