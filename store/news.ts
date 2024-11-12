import { newsData } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: newsData[] = [];

export const news = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<newsData[]>) {
      return action.payload;
    },
  },
});

export const { setNews } = news.actions;
export default news.reducer;
