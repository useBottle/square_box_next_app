import { articleData, newsList } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  newsList: [] as newsList[],
  article: [] as articleData[],
};

export const news = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<newsList[]>) {
      state.newsList = action.payload;
    },
    setArticle(state, action: PayloadAction<articleData[]>) {
      state.article = action.payload;
    },
  },
});

export const { setNews, setArticle } = news.actions;
export default news.reducer;
