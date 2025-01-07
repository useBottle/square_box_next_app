import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const bookmark = createSlice({
  name: "bookmark",
  initialState: "news",
  reducers: {
    setSelected(state, action: PayloadAction<string>) {
      state = action.payload;
    },
  },
});

export const { setSelected } = bookmark.actions;
export default bookmark.reducer;
