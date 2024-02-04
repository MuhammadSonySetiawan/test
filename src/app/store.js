import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/counter/counterAuth";
import nameReducer from "../features/counter/counterName"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userName: nameReducer,
  },
});
