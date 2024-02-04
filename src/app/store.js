import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/counter/counterAuth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
