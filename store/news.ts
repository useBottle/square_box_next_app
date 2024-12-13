import { newsList } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: newsList[] = [];

export const news = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<newsList[]>) {
      return action.payload;
    },
  },
});

export const { setNews } = news.actions;
export default news.reducer;
