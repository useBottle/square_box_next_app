import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  navMenu: false,
};

export const switches = createSlice({
  name: "switches",
  initialState,
  reducers: {
    setNavMenu(state, action: PayloadAction<boolean>) {
      state.navMenu = action.payload;
    },
  },
});

export const { setNavMenu } = switches.actions;
export default switches.reducer;
