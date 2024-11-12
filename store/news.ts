import { newsData } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  image: "",
  date: "",
  text: "",
};

export const news = createSlice({
  name: "newsData",
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<newsData>) {
      state = action.payload;
    },
  },
});

export const { setNews } = news.actions;
export default news.reducer;
