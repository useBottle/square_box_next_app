import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SwitchesType {
  navMenu: boolean;
  signoutModal: boolean;
  pageState: "default" | "news" | "youtube" | "bookmark" | "detail";
  inputValue: string;
  onSearching: boolean;
}

const initialState: SwitchesType = {
  navMenu: false,
  signoutModal: false,
  pageState: "default",
  inputValue: "",
  onSearching: false,
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
    setPageState(state, action: PayloadAction<"default" | "news" | "youtube" | "bookmark" | "detail">) {
      state.pageState = action.payload;
    },
    setInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
    setOnSearching(state, action: PayloadAction<boolean>) {
      state.onSearching = action.payload;
    },
  },
});

export const { setNavMenu, setSignoutModal, setPageState, setInputValue, setOnSearching } = switches.actions;
export default switches.reducer;
