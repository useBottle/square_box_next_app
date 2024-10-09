import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  navMenu: false,
  signoutModal: false,
};

export const switches = createSlice({
  name: "switches",
  initialState,
  reducers: {
    setNavMenu(state, action: PayloadAction<boolean>) {
      state.navMenu = action.payload;
    },
    setSignoutModal(state, action: PayloadAction<boolean>) {
      state.signoutModal = action.payload;
    },
  },
});

export const { setNavMenu, setSignoutModal } = switches.actions;
export default switches.reducer;
