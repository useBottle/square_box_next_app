import { LatestNewsArticle, newsList } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface LatestNewsType {
  latestNewsList: newsList[];
  latestArticleSet: LatestNewsArticle[];
}

const initialState: LatestNewsType = {
  latestNewsList: [],
  latestArticleSet: [],
};

export const latestNews = createSlice({
  name: "latestNews",
  initialState,
  reducers: {
    setLatestNewsList(state, action) {
      state.latestNewsList = action.payload;
    },
    setLatestArticleSet(state, action) {
      state.latestArticleSet = action.payload;
    },
  },
});

export const { setLatestNewsList, setLatestArticleSet } = latestNews.actions;
export default latestNews.reducer;
