import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const counterSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    user: (state, action) => {
      state.value += action.payload;
    },
    clearUser: (state) => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { user, clearUser } = counterSlice.actions;

export default counterSlice.reducer;
