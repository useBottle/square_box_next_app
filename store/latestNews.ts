import { LatestNewsArticle, newsList } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface LatestNewsType {
  latestNewsList: newsList[];
  latestNewsUrls: string[];
  latestArticleSet: LatestNewsArticle[];
}

const initialState: LatestNewsType = {
  latestNewsList: [],
  latestNewsUrls: [],
  latestArticleSet: [],
};

export const latestNews = createSlice({
  name: "latestNews",
  initialState,
  reducers: {
    setLatestNewsList(state, action) {
      state.latestNewsList = action.payload;
    },
    setLatestNewsUrls(state, action) {
      state.latestNewsUrls = action.payload;
    },
    setLatestArticleSet(state, action) {
      state.latestArticleSet = action.payload;
    },
  },
});

export const { setLatestNewsList, setLatestNewsUrls, setLatestArticleSet } = latestNews.actions;
export default latestNews.reducer;
