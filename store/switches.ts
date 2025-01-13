import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  navMenu: false,
  signoutModal: false,
  pageState: "default",
  inputValue: "",
  onSearching: false,
  inBookmarkDetail: false,
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
    setPageState(state, action: PayloadAction<string>) {
      state.pageState = action.payload;
    },
    setInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
    setOnSearching(state, action: PayloadAction<boolean>) {
      state.onSearching = action.payload;
    },
    setInBookmarkDetail(state, action: PayloadAction<boolean>) {
      state.inBookmarkDetail = action.payload;
    },
  },
});

export const { setNavMenu, setSignoutModal, setPageState, setInputValue, setOnSearching, setInBookmarkDetail } =
  switches.actions;
export default switches.reducer;
