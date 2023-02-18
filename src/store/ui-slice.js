import { createSlice } from "@reduxjs/toolkit";

const initState = { cartVisible: false };

const uiSlice = createSlice({
  name: "ui",
  initialState: initState,
  reducers: {
    toggle(state) {
      state.cartVisible = !state.cartVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
