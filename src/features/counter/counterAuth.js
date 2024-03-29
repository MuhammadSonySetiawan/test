import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.value += action.payload;
    },
    clearData: (state) => initialState,
    name: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAuth, clearData, name } = counterSlice.actions;

export default counterSlice.reducer;
